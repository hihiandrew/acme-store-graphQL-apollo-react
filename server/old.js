//login route
app.post('/api/auth', (req, res, next) => {
  const { name, password } = req.body;
  User.findOne({
    where: { name, password },
  })
    .then(user => {
      if (!user) {
        return next({ status: 401 });
      }
      //login success: send token encoded with users' id
      const token = jwt.encode({ id: user.id }, secret);
      res.send({ token });
    })
    .catch(next);
});

app.get('/api/auth', (req, res, next) => {
  if (!req.user) {
    return next({ status: 401 });
  }
  res.send(req.user);
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/orders', async (req, res, next) => {
  const attr = {
    status: 'CART',
  };
  try {
    let cart = await Order.findOne({ where: attr });
    if (!cart) {
      cart = await Order.create(attr);
    }
    const orders = await Order.findAll({
      include: [LineItem],
      order: [['createdAt', 'DESC']],
    });

    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});

//update line item
app.put('/api/orders/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

//delete all
app.delete('/api/orders/reset', async (req, res, next) => {
  await Order.destroy({ where: {} });
  await LineItem.destroy({ where: {} });
  res.status(200).send();
});

//delete order
app.delete('/api/orders/:orderId/', async (req, res, next) => {
  await Order.destroy({ where: { id: req.param.orderId } });
  res.status(200).send();
});

//delete lineItem
app.delete('/api/orders/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

//create lineItem
app.post('/api/orders/:orderId/lineItems/', (req, res, next) => {
  LineItem.create({
    orderId: req.params.orderId,
    quantity: req.body.quantity,
    productId: req.body.productId,
  })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

//update order
app.put('/api/orders/:id', (req, res, next) => {
  console.log(req.body);
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next);
});

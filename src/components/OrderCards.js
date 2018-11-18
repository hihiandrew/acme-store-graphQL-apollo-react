import React from 'react';
import OrderRows from './OrderRows';

const OrderCards = ({ ord }) => {
  return (
    <div key={ord.id}>
      <div className="card">
        <div className="card-body">
          <div className="card-title">#{ord.id}</div>
          {/*<th><button className="btn btn-outline-danger" onClick={()=>deleteOrder(ord.id)}>Delete</button></th>*/}
          {ord.lineItems.map(item => {
            return (
              <div className="card-text" key={item.id}>
                <br />
                <OrderRows item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <br />
    </div>
  );
};

export default OrderCards;

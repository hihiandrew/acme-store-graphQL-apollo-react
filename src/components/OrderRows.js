import React from 'react';

const OrderRows = ({ item }) => {
  const { quantity, id } = item;
  const { name } = item.product;
  return (
    <div key={id} className="d-flex justify-content-between">
      <div>{name}</div>
      <div className="badge badge-primary">{quantity}</div>
    </div>
  );
};

export default OrderRows;

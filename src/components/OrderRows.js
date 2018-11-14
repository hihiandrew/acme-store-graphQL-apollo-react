import React, { Component } from 'react';
import { connect } from 'react-redux';

class OrderRows extends Component {
  render() {
    const { products, item } = this.props;
    return (
      <tr key={item.id}>
        <td>{products.find(p => p.id == item.productId).name}</td>
        <td>
          <span className="badge badge-primary">{item.quantity}</span>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    item: ownProps.item,
  };
};

export default connect(
  mapStateToProps,
  null
)(OrderRows);

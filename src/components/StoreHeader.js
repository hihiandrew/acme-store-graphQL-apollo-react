import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetAll } from '../store';


class StoreHeader extends Component {
    render() {
        const completeOrders = this.props.orders.filter(o => o.status == 'ORDER');
        const totalQuantity = completeOrders.reduce((init, ord) => {
            const orderQuantity = ord.lineitems.reduce((init2, item) => {
                return init2 + item.quantity;
            }, 0);
            return init + orderQuantity;
        }, 0);
        return (
            <div className="container">
            <p className="alert alert-success">{totalQuantity} items sold!</p>
            <button onClick={this.resetAll} className="btn btn-warning">
              Reset
            </button>
          </div>)
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetAll: () => dispatch(resetAll()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreHeader);

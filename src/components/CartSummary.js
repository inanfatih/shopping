import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
  Badge,
  NavItem,
} from 'reactstrap';

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(item => (
            <DropdownItem key={item.product.id}>
              <Badge color='success'>{item.quantity}</Badge>{' '}
              {item.product.productName}
              <Badge
                onClick={() => this.props.removeFromCart(item.product)}
                color='danger'>
                Remove
              </Badge>
            </DropdownItem>
          ))}
          <DropdownItem divider />
          <DropdownItem>
            <Link to='cart'> Go to cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        {' '}
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}{' '}
      </div>
    );
  }
}
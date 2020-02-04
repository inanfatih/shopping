/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import './App.css';
import Navi from './Navi';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import { Container, Row, Col } from 'reactstrap';
import alertify from 'alertifyjs';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import CartList from './CartList';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';
export default class App extends Component {
  //CLASSES CAN ONLY CONTAIN METHODS AND NOT VARIABLES SO YOU CAN NOT USE VAR LET CONST IN A CLASS

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     productInfo: { title: 'Product List' },
  //     categoryInfo: { title: 'Category List' },
  //   };
  // }

  state = {
    currentCategory: '',
    products: [],
    cart: [],
  };

  //json-server --watch db.json

  changeCategory = category => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
    // console.log('category', category);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = categoryId => {
    let url = 'http://localhost:3000/products';
    // console.log('categoryId', categoryId);
    if (categoryId) {
      url += '?categoryId=' + categoryId;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
    // console.log(url);
  };

  addToCart = product => {
    let newCart = this.state.cart;

    let addedProduct = newCart.find(item => item.product.id === product.id);

    if (addedProduct) {
      addedProduct.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({
      cart: newCart,
    });
    console.log(this.state.cart);

    alertify.success(product.productName + ' added to the cart', 1.5);
  };

  removeFromCart = product => {
    //filter, kurali saglayan elemanlari tutup gerisini remove ediyor
    // console.log(this.state.cart);
    // let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    // console.log(this.state.cart);
    // this.setState({
    //   cart: newCart,
    // });

    let foundItem = this.state.cart.find(c => c.product.id === product.id);
    console.log('foundItem', foundItem);
    let newCart = this.state.cart.filter(c => c.product.id !== product.id);
    console.log('secondCart', newCart);
    console.log('this.state.cart', this.state.cart);
    console.log('foundItem.quantity', foundItem.quantity);
    if (foundItem.quantity > 1) {
      --foundItem.quantity;
      newCart.push(foundItem);
    }

    this.setState({ cart: newCart });

    console.log('this.state.cart', this.state.cart);
    alertify.error(product.productName + ' removed from cart', 1.5);
  };

  render() {
    let productInfo = { title: 'Product List' };
    let categoryInfo = { title: 'Category List' };

    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} removeFromCart={this.removeFromCart} />
          <Row>
            <Col xs='3'>
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs='9'>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={props => (
                    <ProductList
                      {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                      info={productInfo}
                    />
                  )}
                />
                <Route
                  exact
                  path='/cart'
                  render={props => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route exact path='/form1' component={FormDemo1} />
                <Route exact path='/form2' component={FormDemo2} />
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

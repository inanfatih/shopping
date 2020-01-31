import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  state = {
    categories: [
      {
        categoryId: 1,
        categoryName: 'Beverages',
      },
      {
        categoryId: 2,
        categoryName: 'Condiments',
      },
    ],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => this.setState({ categories: data }))
      .then(data => console.log(this.state.categories));
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map(category => (
            <ListGroupItem
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              key={category.id}
              onClick={() => this.props.changeCategory(category)}>
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h4>{this.props.currentCategory}</h4>
      </div>
    );
  }
}

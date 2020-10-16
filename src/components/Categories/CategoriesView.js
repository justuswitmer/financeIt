import React, { Component } from 'react';
import { connect } from 'react-redux';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class CategoriesView extends Component {

  state = {
    heading: 'Categories',
    newCategory: {
      category: '',
      budgetedAmount: '',
      user: this.props.user.id
    }
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'GET'
    })
  }

  newCategoryChange = (property, event) => {
    console.log('in newCategoryChange', event.target.value);
    this.setState({
      newCategory: {
        ...this.state.newCategory,
        [property]: event.target.value
      }
    })
  }

  addCategory = () => {
    console.log('in addCategory');
    this.props.dispatch({
      type: 'ADD_CATEGORY',
      payload: this.state.newCategory
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>

        <h3>Add New Category</h3>
        <input
          type='text'
          placeholder='new category'
          onChange={(event) => this.newCategoryChange('category', event)}
        />
        <input
          type='text'
          placeholder='new monthly amount'
          onChange={(event) => this.newCategoryChange('budgetedAmount', event)}
        />
        <button
          onClick={this.addCategory}
        >Add Category
        </button>

        {this.props.category.map(category =>
          <li key={category.id}>
            {category.name} | {category.budgetedAmount}
          </li>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  category: reduxState.category,
  user: reduxState.user
})

export default connect(mapStateToProps)(CategoriesView);
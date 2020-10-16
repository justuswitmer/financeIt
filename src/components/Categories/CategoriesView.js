import React, { Component } from 'react';
import { connect } from 'react-redux';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class CategoriesView extends Component {

  state = {
    heading: 'Categories',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'GET'
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
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
  category: reduxState.category
})

export default connect(mapStateToProps)(CategoriesView);
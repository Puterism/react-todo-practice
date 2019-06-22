import React, { Component } from 'react'

export default class TodoInput extends Component {
  state = {
    title: '',
  }
  
  handleChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    const { title } = this.state
    return (
      <input type="text"
        id="todoInput"
        placeholder="어떤 일을 미룰까?"
        value={ title }
        onChange={ this.handleChange }
      />
    )
  }
}

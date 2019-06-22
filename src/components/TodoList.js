import React, { Component } from 'react'

export default class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        { this.props.children }
      </ul>
    )
  }
}

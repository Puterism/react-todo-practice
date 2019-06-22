import React, { Component } from 'react'

export default class TodoListItem extends Component {
  state = {
    input: this.props.title,
  }
  
  handleEdit = () => {
    const { id } = this.props
    this.props.editTodo(id)
  }

  handleRemove = () => {
    const { id } = this.props
    this.props.removeTodo(id)
  }

  handleChange = () => {
    const { id } = this.props
    this.props.toggleTodo(id)
  }

  handleChangeInput = e => {
    this.setState({
      input: e.target.value,
    })
  }

  handleKeyDown = e => {
    const { id } = this.props
    const { input } = this.state

    if (e.key === 'Escape') {
      this.setState({
        input: this.props.title
      })
      this.props.endEdit()
    }
    else if (e.key === 'Enter') {
      if (input.trim()) {
        this.props.editSaveTodo(id, input)
      } else {
        this.setState({
          input: this.props.title
        })
        this.props.endEdit()
      }
    }
  }

  render() {
    const { input } = this.state
    const { title, done, id, editing } = this.props
    return (
      <li className="todo-list-item">
        {
          editing === id ?
          <input type="text" autoFocus
            placeholder={title} value={input}
            className="edit-input"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChangeInput}
          />
          :
          <>
            <input type="checkbox" checked={done} onChange={this.handleChange} id={id} />
            <label htmlFor={id}>
              { title }
            </label>
            <ul className="menu">
              <li className="menu-item" onClick={this.handleEdit}>수정</li>
              <li className="menu-item" onClick={this.handleRemove}>삭제</li>
            </ul>
          </>
        }
      </li>
    )
  }
}

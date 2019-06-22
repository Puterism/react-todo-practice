import React, { Component } from 'react'
import { TodoList, TodoListItem } from 'components'
import { guid } from 'utils'

export default class Todo extends Component {
  state = {
    editing: null,
    input: '',
    data: [],
  }

  getData = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      this.setState({
        data: data,
      });
    }
  }

  handleChangeInput = e => {
    this.setState({
      input: e.target.value
    })
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleAdd()
    }
  }
  
  handleAdd = () => {
    const { input, data } = this.state
    const newData = {
      id: guid(),
      title: input,
      done: false,
    }

    localStorage.setItem('data', JSON.stringify([...data, newData]))
    this.setState(state => ({
      ...state,
      input: '',
      data: [
        ...state.data,
        newData,
      ]
    }))
  }

  handleToggle = id => {
    const { data } = this.state
    const index = data.findIndex(data => data.id === id)
    const nextData = [...data]

    nextData[index] = {
      ...nextData[index],
      done: !nextData[index].done,
    }

    localStorage.setItem('data', JSON.stringify(nextData))
    this.setState({
      data: nextData,
    })
  }

  handleEdit = id => {
    this.setState(state => ({
      ...state,
      editing: id,
    }))
  }

  handleEditSave = (id, title) => {
    if (title.trim()) {
      const { data } = this.state
      const index = data.findIndex(data => data.id === id)
      const nextData = [...data]

      nextData[index] = {
        ...nextData[index],
        title: title,
      }
      localStorage.setItem('data', JSON.stringify(nextData))
      this.setState({
        data: nextData,
      })
    }
    this.handleEndEdit();
  }

  handleEndEdit = () => {
    this.setState({
      editing: null,
    })
  }

  handleRemove = id => {
    const { data } = this.state
    const nextData = data.filter(data => data.id !== id)
    this.setState({
      data: nextData
    })
    localStorage.setItem('data', JSON.stringify(nextData))
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { data, input, editing } = this.state;
    return (
      <div className="todo">
        <h1>오늘 할 일을 내일로 미루자</h1>
        <input type="text" autoFocus
          id="todoInput"
          placeholder="어떤 일을 미룰까?"
          value={ input }
          onChange={ this.handleChangeInput }
          onKeyPress={ this.handleKeyPress }
        />
        <p>입력하고 Enter를 누르면 저장돼요 :)</p>
        <TodoList>
          {
            data.map(item => (
              <TodoListItem {...item} key={item.id}
                toggleTodo={this.handleToggle}
                editTodo={this.handleEdit}
                editSaveTodo={this.handleEditSave}
                removeTodo={this.handleRemove}
                endEdit={this.handleEndEdit}
                editing={editing}
              />
            ))
          }
        </TodoList>
      </div>
    )
  }
}

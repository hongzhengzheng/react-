import React, { Component } from 'react'
import * as RecordsAPI from '../utils/RecordsAPI'

export default class RecordForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }
  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState((
      obj = {},
      obj['' + name] = event.target.value,
      obj
    ))
  }
  valid() {
    return this.state.title && this.state.date && this.state.amount
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state)
    RecordsAPI.create(this.state).then(
      response => {
        this.props.handleNewRecord(response.data);
        this.setState({
          date: '',
          title: '',
          amount: ''
        })
      }
    ).catch(
      error => console.log(error.message)
    )
  }

 
  render () {
    return (
      <form action="" className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control mr-1" placeholder='date' name='date' onChange={this.handleChange.bind(this)} value={this.state.date}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control mr-1"  placeholder='title' name='title' onChange={this.handleChange.bind(this)} value={this.state.title}/></div>
        <div className="form-group">
          <input type="text" className="form-control mr-1"  placeholder='amount' name='amount'
          onChange={this.handleChange.bind(this)} value={this.state.amount}/>
        </div>
        <button type='submit' className='btn btn-primary' disabled={!this.valid()}> create record</button>
      </form>
    )
  }
}
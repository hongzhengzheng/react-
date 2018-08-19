import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'

class Record extends Component{
  constructor() {
    super();
    this.state = {
      edit: false
    }
  }


  handleToggle() {
    this.setState({
      edit: !this.state.edit
    })
  }

  handleUpdate(event) {
    event.preventDefault();
    const record = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: this.refs.amount.value,
    }
    RecordsAPI.update(this.props.record.id, record).then(
      response => {
        this.setState({edit: false})
        this.props.handleEditRecord(this.props.record,response.data)
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  handleDelete(event) {
    event.preventDefault();
    RecordsAPI.remove(this.props.record.id).then(
      response => this.props.handleDeleteRecord(this.props.record)
    ).catch(error => console.log(error.message))
  }
  recordRow() {
    return (
      <tr >
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>edit</button>
          <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>delete</button>
        </td>
      </tr>
    )
  }

  recordForm() {
    return (
      <tr>
        <td><input type="text" defaultValue={this.props.record.date} className="form-control" ref='date'/></td>
        <td><input type="text" defaultValue={this.props.record.title} className="form-control" ref='title'/></td>
        <td><input type="text" defaultValue={this.props.record.amount} className="form-control" ref='amount'/></td>
        <td>
          <button className="btn-btn-info mr-1" onClick={this.handleToggle.bind(this)} onClick={this.handleUpdate.bind(this)}>update</button>
          <button className="btn btn-danger">cancel</button>
        </td>
      </tr>
    )
  }
  render () {
    if (this.state.edit) {
      return this.recordForm()
    } else {
      return this.recordRow();

    }
  }
}

Record.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
}

export default Record;
import React, { Component } from 'react';
import Record from './Record'
import * as RecordAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      isLoaded: false,
      error: null
    }
  }
  componentDidMount() {
      RecordAPI.getAll().then(
        response => this.setState({
          records: response.data,
          isLoaded: true
        })
      ).catch(
        error => this.setState({
          isLoaded: true,
          error
        })
      )
  }

  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      //添加数据
      records: [
        ...this.state.records,
        record
      ]
    })
  }
  // 修改数据
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) =>{
      if(index !== recordIndex) {
        return item;
      }
      return {
        ...item, 
        ...data
      }
      // data覆盖原来的数据
    }
  );
  this.setState({
    records: newRecords
  })
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) =>{
      if (recordIndex !== index) {
        return item;
      }
    });
    this.setState({
      records: newRecords
    })

  }

  credits(){
    let credits = this.state.records.filter((record) => {
      return record.amount > 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  debits() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }

  balance() {
    return this.credits() + this.debits();
  }

  render() {
    const {error, isLoaded, records} = this.state;
    let recordsComponent;
    if(error) {
      recordsComponent = <div>error: {error.message}</div>
    } else if(!isLoaded) {
      recordsComponent =  <div>loading</div>
    } else {
      recordsComponent =  (
          <div>
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>date</th>
                <th>title</th>
                <th>amount</th>
                <th>actions</th>
              </tr>
              </thead>
              <tbody>
                { records.map((record, i) =>
                <Record record={record} key={record.id}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}/>)}
              </tbody>
            </table>
          </div>
        );
    }
    return (
      <div>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()}/>
          <AmountBox text="Debit" type="danger" amount={this.debits()}/>
          <AmountBox text="Balance" type="info" amount={this.balance()}/>
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
        <h2>Records</h2>
        {recordsComponent}
      </div>
    )
  }
  
}

export default Records;

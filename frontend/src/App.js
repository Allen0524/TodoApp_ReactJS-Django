import React, {Component} from 'react';
import './App.css';
import {Button, Badge} from 'reactstrap';
import CustomModal from './Modal';
import axios from "axios";


class App extends Component {

  state = {
    modal: false,
    newItem: {
      taskName:'',
      dueDate: '',
      completed:false,
    },
    todoList: [],
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("/api/todos")
    .then(res => this.setState({todoList: res.data}))
    .catch(err => console.log(err));
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  }

  handleSubmit = (item) => {
    this.toggle();
    console.log(item);
    if(item.id){
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios.post("/api/todos/", item)
    .then(res => this.refreshList());
  }

  handleDelete = (item) => {
    axios.delete(`/api/todos/${item.id}`)
    .then(res => this.refreshList())
  }

  handleEdit = (item) => {
    console.log(item);
    this.setState({newItem:item, modal:!this.state.modal});
  }

  createItem = () => {
    const item = {taskName:'', dueDate:'', completed: false};
    this.setState({newItem:item, modal:!this.state.modal})
  }

  renderItems = (i) => {
    //用來判斷是今天、過去或未來
    const today = new Date().toISOString().split('T', 1)[0].replace(/-/g, '/');
    //未來
    if(i==1){
      const renderItems = this.state.todoList.filter(
        item => Date.parse(item.dueDate.split(' ', 1)[0]) > Date.parse(today)
      );
      return renderItems.map(item => (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <button type="button" onClick={()=>this.handleDelete(item)} className="btn-circle checkMar"></button>
            {item.taskName}
          </span>
          {item.dueDate}
          <button type="button" onClick={()=>this.handleEdit(item)} className="btn-secondary">編輯</button>
        </li>
      ))
    }
    //過期
    else if(i==2){
      const renderItems = this.state.todoList.filter(
        item => Date.parse(item.dueDate.split(' ', 1)[0]) < Date.parse(today)
      );
      return renderItems.map(item => (
        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span>
            <button type="button" onClick={()=>this.handleDelete(item)} className="btn-circle checkMar"></button>
            {item.taskName}
          </span>
          {item.dueDate}
          <button type="button" onClick={()=>this.handleEdit(item)} className="btn-secondary">編輯</button>
        </li>
      ))
    }
    //今天
    const renderItems = this.state.todoList.filter(
      item => Date.parse(item.dueDate.split(' ', 1)[0]) === Date.parse(today)
    );

    return renderItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <button type="button" onClick={()=>this.handleDelete(item)} className="btn-circle checkMar"></button>
          {item.taskName}
        </span>
        {item.dueDate}
        <button type="button" onClick={()=>this.handleEdit(item)} className="btn-secondary">編輯</button>
      </li>
    ))
  }

  render(){
    const { modal, todoList, newItem } = this.state;
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <h3 className="text_center"><Badge color="secondary">Todo App</Badge></h3>
            <div className="card p-3">
              <h3>today</h3>
              <ul className="list-group list-group-flush">
                {this.renderItems(0)}
              </ul>
            </div>
            <br/>
            <div className="card p-3">
              <h3>future</h3>
              <ul className="list-group list-group-flush">
                {this.renderItems(1)}
              </ul>
            </div>
            <br/>
            <div className="card p-3">
              <h3>expired</h3>
              <ul className="list-group list-group-flush">
                {this.renderItems(2)}
              </ul>
            </div>
            <br/>
            <Button color="primary" onClick={this.createItem}>添加任務</Button>{' '}
          </div>
        </div>
        {modal ? <CustomModal isOpen={modal} toggle={this.toggle} onSave={this.handleSubmit} newItem={newItem} /> : null}
      </div>
    )
  }
}

export default App;

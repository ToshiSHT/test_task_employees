import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {name: "John Smith", salary: 800, increase : false, id:1},
        {name: "Kristina Shetinina", salary: 950, increase : true, id:2},
        {name: "Viktor Komarov", salary: 1250, increase : false, id:3}
    ]
    }
    this.maxId = 4; 
   
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }
  createItem = (name,salary) => {
    this.setState(({data}) => {
      const newArr = [...data,{name, salary, id:this.maxId++}]
      return {
        data: newArr
      }
    })
  }


render() {
  return (
    <div className="app">
        <AppInfo />

        <div className="search-panel">
            <SearchPanel/>
            <AppFilter/>
        </div>
        
        <EmployeesList 
        data={this.state.data}
        onDelete={this.deleteItem}
        />
        <EmployeesAddForm
        onCreate={this.createItem}/>
    </div>
  );
}
}

export default App;

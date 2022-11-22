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
        {name: "John Smith", salary: 800, increase : false, rise: true, id:1},
        {name: "Kristina Shetinina", salary: 950, increase : true, rise: false, id:2},
        {name: "Viktor Komarov", salary: 1250, increase : false, rise: false, id:3}
     ],
     warningName: '',
     warningSalary: '',
     term: '',
     filter: 'all'
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
    if((name === '' || name.length < 3 ) && (salary === '' || salary.length < 3)){
      this.setState(({warningName}) =>({
        warningName : 'Ошибка заполнения имени!',
        warningSalary : 'Ошибка заполнения зарплаты!'
    }))
    }
    else if((name.length < 3 || name === '') && salary.length >= 3  ){
      this.setState((state) =>({
        warningName : 'Ошибка заполнения имени!',
        warningSalary: ''
    }))
  }
  else if ((salary.length < 3 || salary === '') && name.length >=3 ){
    this.setState(({warningSalary}) =>({
      warningSalary : 'Ошибка заполнения зарплаты!',
      warningName: ''
  }))
}else{
    
    this.setState(({data}) => {
      const newArr = [...data,{name,
         salary,
          increase : false,
          rise: false,
           id:this.maxId++}]
      return {
        data: newArr,
        warningName: '',
        warningSalary: ''
      }
    })
  }}

  onToggleProps = (id,props) => {
   /*  this.setState(({data}) =>{
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, increase: !old.increase};
      const newArr = [...data.slice(0,index),newItem,...data.slice(index+1)];
      return {
        data:newArr
      }
        }) */
    this.setState(({data}) =>({
      data:data.map(item => {
        if (item.id === id) {
          return {...item, [props]: !item[props]}    
        }
        return item
      })
    }))
  }
  searchEmp = (items, term) =>{
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1 // -1 если часть строки не найдена
    })

  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch (filter) {
        case 'rise':
            return items.filter(item => item.rise);
        case 'moreThen1000':
            return items.filter(item => item.salary > 1000);
        default:
            return items
    }
}

onFilterSelect = (filter) => {
    this.setState({filter});
}
 

render() {
  const {data,term,warningName,warningSalary,filter} = this.state;
  const  visibleData = this.filterPost(this.searchEmp(data,term),filter) ;
  return (
    <div className="app">
        <AppInfo 
        employeesValue ={this.state.data.length}
        riseValue={this.state.data.filter(item => item.increase === true).length}/>

        <div className="search-panel">
            <SearchPanel 
            onUpdateSearch = {this.onUpdateSearch}/>
             <AppFilter filter={filter} 
             onFilterSelect={this.onFilterSelect}/>
        </div>
        
        <EmployeesList
        data={visibleData}
        onDelete={this.deleteItem}
        onToggleProps={this.onToggleProps}
        onToggleRise={this.onToggleRise}
        />
        <EmployeesAddForm
        onCreate={this.createItem}
        warningName = {warningName} 
        warningSalary = {warningSalary}/>
    </div>
  );
}
}

export default App;


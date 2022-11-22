import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component{
    constructor(props){
    super(props);
    this.state = {
        name: '',
        salary: ''
        }
     
    }
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
 onSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state.name, this.state.salary);
    this.setState({
        name: '',
        salary: ''
    })
 }       
 render() {
    const {name,salary} = this.state
    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
              <label htmlFor="nameInput"></label> 
            <form
                className="add-form"
                onSubmit={this.onSubmit}>
                    {this.props.warningName !== '' ? <label htmlFor="nameInput" className="label label-name">{this.props.warningName}</label> : ''} 
                    {this.props.warningSalary !== '' ? <label htmlFor="salaryInput" className="label label-salary">{this.props.warningSalary}</label> : ''} 
                    <div className="d-flex">
                    <input type="text"
                    id="nameInput"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?" 
                    onChange={this.onValueChange}
                    value={name}
                    name="name"/>
                <input type="number"
                    id="salaryInput"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    onChange={this.onValueChange}
                    value={salary}
                    name="salary" />

                <button type="submit"
                        className="btn btn-outline-light"
                        >Добавить</button>
                    </div>
             
            </form>
        </div>
    )
 }
}

export default EmployeesAddForm;
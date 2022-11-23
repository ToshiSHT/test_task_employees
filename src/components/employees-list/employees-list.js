import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProps,onChangeSalary}) => {
    const elements = data.map(item => {
        const {id, ...itemprops} = item;
        return (
            <EmployeesListItem key = {id}
             {...itemprops}
             onDelete={() => onDelete(id)}
             onToggleProps={(e)=> onToggleProps(id, e.currentTarget.getAttribute('data-toggle'))}
             onChangeSalary={(e) => onChangeSalary(id,e.target.value)}/> 
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;
import "./app-info.css";

const AppInfo = ({employeesValue, riseValue}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {employeesValue}</h2>
            <h2>Премию получат: {riseValue}</h2>
        </div>
    )
}

export default AppInfo;
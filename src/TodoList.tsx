import React, {useState} from 'react';
import {FilterType} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:number)=>void
    setFilterTasks:(filterTasks:FilterType)=>void
    filterTasks:FilterType

}

export function Todolist(props: PropsType) {

    // let [filterTasks, setFilterTasks]=useState<FilterType>("All")

    let durhlaq = props.tasks
    if (props.filterTasks === 'Active') {
        durhlaq =props.tasks.filter((el) => el.isDone === false)
    }
    if (props.filterTasks === 'Completed') {
        durhlaq =props.tasks.filter((el) => el.isDone)
    }
    const taskFilter = (filterValue: FilterType) => {
        props.setFilterTasks(filterValue)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {durhlaq.map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={()=>{props.removeTask(el.id)}}>X</button>

                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>

                    </li>)
            })}

        </ul>
        <div>
            <button onClick={()=>taskFilter('All')}>All</button>
            <button onClick={()=>taskFilter('Active')} >Active</button>
            <button onClick={()=>taskFilter('Completed')}>Completed</button>
        </div>
    </div>
}

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./Lesson_3_App";
import {Button} from "../../components/Button/Button";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    setFilterTasks: (filterTasks: FilterType) => void
    filterTasks: FilterType
    addTask: (inputValue: string) => void

}

export function Lesson_3_TodoList(props: PropsType) {

    // let [filterTasks, setFilterTasks]=useState<FilterType>("All")

    let durhlaq = props.tasks
    if (props.filterTasks === 'Active') {
        durhlaq = props.tasks.filter((el) => el.isDone === false)
    }
    if (props.filterTasks === 'Completed') {
        durhlaq = props.tasks.filter((el) => el.isDone)
    }
    const taskFilter = (filterValue: FilterType) => {
        props.setFilterTasks(filterValue)
    }

    let [inputValue, setInputValue] = useState("")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)

    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }

    }

    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const removeTaskHandler = (tId:string) => {
        props.removeTask(tId)
    }



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button name={"+"} callBack={addTaskHandler}></Button>
        </div>
        <ul>
            {durhlaq.map(el => {

                return (
                    <li key={el.id}>
                        {/*<button onClick={()=>removeTaskHandler(el.id)}>X</button>*/}
                        <Button name={"X"} callBack={()=>removeTaskHandler(el.id)}></Button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>

                    </li>)
            })}

        </ul>
        <div>
            {/*<button onClick={() => taskFilter('All')}>All</button>*/}
            {/*<button onClick={() => taskFilter('Active')}>Active</button>*/}
            {/*<button onClick={() => taskFilter('Completed')}>Completed</button>*/}
            <Button name={"All"} callBack={() => taskFilter('All')}></Button>
            <Button name={"Active"} callBack={() => taskFilter('Active')}></Button>
            <Button name={"Completed"} callBack={() => taskFilter('Completed')}></Button>
        </div>
    </div>
}

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    checkBoxChange: (newId: string, checkValue: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>("")

    // let[error, setError]=useState<boolean>(false)
    let [error, setError] = useState<string | null>(null)
    let [buttonName, setButtonName] = useState<FilterValuesType>("all")

    // const addTask = () => {
    //     // if (title.trim()!=="") { тоже самое
    //     if (title.trim()) {
    //         props.addTask(title);
    //         setTitle("");
    //     }else{
    //         setError(true)
    //     }
    //
    // }

    const addTask = () => {
        // if (title.trim()!=="") { тоже самое
        if (title.trim()) {
            props.addTask(title);
            setTitle("");
        } else {
            setError("Title is required!")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setError(false)
        console.log(typeof e)
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
        setButtonName("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
        setButtonName("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
        setButtonName("completed")
    }
    const onChangeHandlerCheckBox = (tID:string,event: ChangeEvent<HTMLInputElement>) => {

        props.checkBoxChange(tID, event.currentTarget.checked)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        {error && <div className={'error-message'}>{error}</div>}


        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.checkBoxChange(t.id, event.currentTarget.checked)
                    // }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={t.isDone} onChange={(event: ChangeEvent<HTMLInputElement>)=>onChangeHandlerCheckBox(t.id,event)}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={buttonName === 'all' ? 'active-filter' : ""} onClick={onAllClickHandler}>All</button>
            <button className={buttonName === 'active' ? 'active-filter' : ""} onClick={onActiveClickHandler}>Active
            </button>
            <button className={buttonName === 'completed' ? 'active-filter' : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

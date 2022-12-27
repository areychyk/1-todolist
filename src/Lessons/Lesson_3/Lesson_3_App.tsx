import React, {useState} from 'react';
import '../../App.css';

import {Lesson_3_TodoList, TaskType} from "./Lesson_3_TodoList";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'

export function Lesson_3_App () {

    // let tasks = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]

    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

const addTask=(inputValue:string)=>{
    const newTask ={id: v1(), title:inputValue, isDone: false};
    setTask([newTask,...tasks])
}

    let [filterTasks, setFilterTasks]=useState<FilterType>("All")

    const removeTask = (id: string) => {
        setTask(tasks.filter((el) => el.id !== id))
    }

    // let durhlaq = tasks
    //
    // if (filterTasks === 'Active') {
    //     durhlaq = tasks.filter((el) => el.isDone === false)
    // }
    // if (filterTasks === 'Completed') {
    //     durhlaq = tasks.filter((el) => el.isDone)
    // }
    // const taskFilter = (filterValue: FilterType) => {
    //     setFilterTasks(filterValue)
    // }


    return (
        <div className="App">
            <Lesson_3_TodoList
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                // taskFilter={taskFilter}
                setFilterTasks={setFilterTasks}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}



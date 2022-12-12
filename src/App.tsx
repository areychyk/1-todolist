import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    // let tasks = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]

    let [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    let [filterTasks, setFilterTasks]=useState<FilterType>("All")
    // let [filterTasks, setFilterTasks]=useState<FilterType>("All")
    // console.log(filterTasks)
    const removeTask = (id: number) => {
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
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                // taskFilter={taskFilter}
                setFilterTasks={setFilterTasks}
                filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;

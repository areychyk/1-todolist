import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";


function App() {
    const title1 = 'November';
    const title2 = 'December';
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yo", isDone: true}
        ]


    return (
        <div className="App">
            <TodoList title={title1} tasks={tasks1}/>
            <TodoList title={title2} tasks={tasks2}/>

        </div>

    )
}

export default App;

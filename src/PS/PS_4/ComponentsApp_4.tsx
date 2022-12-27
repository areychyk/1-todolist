import React, {useState} from 'react';
import './App.css';

import { v1 } from 'uuid';
import {ComponentsTodoList_4} from "./ComponentsTodoList_4";

// Hi guys!
// 1. Let's try an alternative way. Instead of useState we can try useRef in Todolist.tsx:
// Попробуем альтернативный способ. Вместо useState мы можем попробовать useRef в Todolist.tsx:
// <input
//     //value={title}
//     // onChange={ onChangeHandler }
//     ref={onChangeRef}
//     onKeyPress={onKeyPressHandler}
// />
// let onChangeRef = useRef<HTMLInputElement>(null)
// Inside of  const addTask = () => {} use onChangeRef.current.value
// 2. Let's try children and F.C:
// Давайте попробуем детей и FC:
// We will use double 'tag' <Todolist></Todolist>
// Мы будем использовать двойной тег <Todolist></Todolist>
// <Todolist title="What to learn"
//           tasks={tasksForTodolist}
//           removeTask={removeTask}
//           changeFilter={changeFilter}
//           addTask={addTask} >
//     <div>
//         <div>Many intresting information</div>
//      </div>
// </Todolist>
//Inside of Todolist.tsx
//Внутри Todolist.tsx

// Type out changes in PropsType: children?:React.ReactNode
// export const Todolist:React.FC<PropsType>=({children, ...props}) =>{
//     return(
//         <div>
//             <div>...</div>
//             {children}
//         </div>
//      )
// }

// 3. Let's append some animation in our project:
//Давайте добавим анимацию в наш проект:
//yarn add  @formkit/auto-animate -D
// we use -D, because the best practice is to add new extensions to the object inside the package.json
//мы используем -D, потому что лучше всего добавлять новые расширения к объекту внутри package.json
// "devDependencies": {
//     "@formkit/auto-animate": "^1.0.0-beta.3"
//   }
// const [listRef] = useAutoAnimate<HTMLUListElement>() in Todolist.tsx
// <ul ref={listRef}>
//Look how smoothly the tasks are added!
// Посмотрите, как плавно добавляются задания!
//P.S. Do you understand why a new task append in all Todolists?
// [because we only have one state for all our todolists, but we'll talk about that on Tuesday.]
//Смотрите, как плавно добавляются задачи!
//P.S. Вы понимаете, почему новая задача добавляется во все Todolists?
// [потому что у нас есть только одно состояние для всех наших тодолистов, но мы поговорим об этом во вторник.]


export type FilterValuesType = "all" | "active" | "completed";

function ComponentsApp_4() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }



    return (
        <div className="App">
            {/*<ComponentsTodoList_4 title="What to learn"*/}
            {/*          tasks={tasksForTodolist}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          addTask={addTask} />*/}
            <ComponentsTodoList_4 title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} >
                <div>
                    <div>Many intresting information</div>
                 </div>
            </ComponentsTodoList_4>
        </div>
    );
}

export default ComponentsApp_4;





























//-------------------------------------------------------------------------------------------------------
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]);
//
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     function addTask(title: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         let newTasks = [task, ...tasks];
//         setTasks(newTasks);
//     }
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = tasks;
//
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <input placeholder={'A lot of boring information'}/>
//                     <div>
//                         <button>Boring Button 1</button>
//                         <button>Boring Button 2</button>
//                         <button>Boring Button 3</button>
//                     </div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}/>
//         </div>
//     );
// }
//
// export default App;
import React, {useState} from 'react';
// import '../../App.css';
// import {ComponentsTodoList_2} from './ComponentsTodoList_2';
//
// export type FilterValuesType = "all" | "active" | "completed"|"three";
//
// //Hi guys!
// //1. Let's create a 'DELETE ALL TASKS' button, and place it above the filter buttons
// //Создайте кнопку 'DELETE ALL TASKS'  и поместите ее выше филтр кнопки
// //Clicking the button removes all tasks
// // нажатие на кнопку удаляет все такси
// //2. Let's create a fourth filter button-if you click it, the first three tasks will be displayed
// //Давайте создадим четверую кнопку, если кликнуть на нее первые три таски будут отбражаться
// //3. Relocate everything associated with  filters to the Todolist.tsx component. Make it work
// //Переместить все что связанно с фильтрацией в Todolist.tsx component. Сделай эту работиу.
// //
//
//
// export const ComponentsApp_2=()=> {
//
//     let [tasks, setTasks] = useState([
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "ReactJS", isDone: false},
//         {id: 4, title: "Rest API", isDone: false},
//         {id: 5, title: "GraphQL", isDone: false},
//     ]);
//
//     const deleteAllTask= ()=> {
//         setTasks([])
//     }
//
//
//     function removeTask(id: number) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     return (
//         <div className="App">
//             <ComponentsTodoList_2 title="What to learn"
//                                   tasks={tasks}
//                                   removeTask={removeTask}
//                                   deleteAllTask={deleteAllTask}
//
//             />
//
//         </div>
//     );
// }
//
//
//
//
// //-------------------------------------------------------------------------
//
// // import React, {useState} from 'react';
// // import './App.css';
// // import {Todolist} from './Todolist';
// //
// //
// // export type FilterValuesType = "all" | "active" | "completed" | "three";
// //
// // function App() {
// //
// //     let [tasks, setTasks] = useState([
// //         {id: 1, title: "HTML&CSS", isDone: true},
// //         {id: 2, title: "JS", isDone: true},
// //         {id: 3, title: "ReactJS", isDone: false},
// //         {id: 4, title: "Rest API", isDone: false},
// //         {id: 5, title: "GraphQL", isDone: false},
// //     ]);
// //
// //     const deleteAllTasks = () => {
// //         setTasks([])
// //     }
// //
// //     function removeTask(id: number) {
// //         let filteredTasks = tasks.filter(t => t.id != id);
// //         setTasks(filteredTasks);
// //     }
// //
// //     // let [filter, setFilter] = useState<FilterValuesType>("all");
// //     //
// //     // let tasksForTodolist = tasks;
// //     //
// //     // if (filter === "active") {
// //     //     tasksForTodolist = tasks.filter(t => t.isDone === false);
// //     // }
// //     // if (filter === "completed") {
// //     //     tasksForTodolist = tasks.filter(t => t.isDone === true);
// //     // }
// //     //
// //     // function changeFilter(value: FilterValuesType) {
// //     //     setFilter(value);
// //     // }
// //
// //     return (
// //         <div className="App">
// //             <Todolist
// //                 title="What to learn"
// //                 tasks={tasks}
// //                 removeTask={removeTask}
// //                 //changeFilter={changeFilter}
// //                 deleteAllTasks={deleteAllTasks}
// //
// //             />
// //         </div>
// //     );
// // }
// //
// // export default App;
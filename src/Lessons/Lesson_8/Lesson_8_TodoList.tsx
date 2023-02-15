import React, {useCallback} from 'react';
import {FilterValuesType} from "./Lesson_8_App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@mui/material";
import {Task} from "./Task";
import {IconButtonDeleteMemo} from "./IconButtonDeleteMemo";
import {TaskWithRedux} from "./TaskWithRedux";


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTodoList: (todoListId: string) => void

    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Lesson_8_TodoList = React.memo((props: TodoListPropsType) => {
    console.log("todolist")

    const getFilteredTasksForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(props.tasks, props.filter)


    const tasksItems = props.tasks.length
        ? filteredTasksForRender.map((task: TaskType) => {
            return (
                // <Task
                //     key={task.id}
                //     tasks={task}
                //     todoListId={props.todoListId}
                //     removeTask={props.removeTask}
                //     changeTaskStatus={props.changeTaskStatus}
                //     changeTaskTitle={props.changeTaskTitle}
                // />
                <TaskWithRedux
                    key={task.id}
                    todoListId={props.todoListId}
                    task={task}/>
            )


        })
        : <span>Tasks list is empty</span>


// /*    const tasksItems = props.tasks.length
//         ? filteredTasksForRender.map((task: TaskType) => {
//             const onClickRemoveTaskHandler = () => props.removeTask(task.id, props.todoListId)
//
//             const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
//
//             const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
//
//             const onChangeSetTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)
//
//             return (
//                 <li key={task.id}>
//                     <Checkbox
//                         // type="checkbox"
//                         checked={task.isDone}
//                         color="secondary"
//                         onChange={onChangeSetTaskStatus}
//                     />
//                     {/!*<span className={isDoneClasses}>{task.title}</span>*!/}
//                     <EditableSpan
//                         title={task.title}
//                         classes={isDoneClasses}
//                         changeTitle={onChangeSetTaskTitle}
//                     />
//
//                     <IconButton onClick={onClickRemoveTaskHandler}
//                                 size={'small'}
//                                 color={'primary'}
//                     ><DoDisturbAltIcon/></IconButton>
//                 </li>
//             )
//         })
//         : <span>Tasks list is empty</span>*/

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListId), [props.addTask, props.todoListId])

    const getOnClickSetFilterHandler = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId), [props.changeTodoListFilter, props.todoListId])

    const onClickRemoveTodolist = useCallback(() => props.removeTodoList(props.todoListId), [props.removeTodoList, props.todoListId])

    const onChangeSetTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])


    return (
        <div>
            <h3>
                {/*{props.title}*/}
                <EditableSpan
                    title={props.title}
                    classes={""}
                    changeTitle={onChangeSetTodoListTitle}
                />

                {/*<IconButton*/}
                {/*    onClick={onClickRemoveTodolist}*/}
                {/*    size={'small'}*/}
                {/*    color={'secondary'}*/}
                {/*><HighlightOffIcon/></IconButton>*/}

                <IconButtonDeleteMemo onClickRemoveTodolist={onClickRemoveTodolist}/>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}

            </ul>

            <div>
                <ButtonGroup
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                >
                    <Button
                        sx={{m: '2px'}}

                        color={props.filter === "all" ? "secondary" : 'primary'}
                        onClick={getOnClickSetFilterHandler("all")}>All
                    </Button>
                    <Button
                        sx={{m: '2px'}}
                        color={props.filter === "active" ? "secondary" : 'primary'}
                        onClick={getOnClickSetFilterHandler("active")}>Active
                    </Button>
                    <Button
                        sx={{m: '2px'}}
                        color={props.filter === "completed" ? "secondary" : 'primary'}
                        onClick={getOnClickSetFilterHandler("completed")}>Completed
                    </Button>
                </ButtonGroup>
            </div>

        </div>
    );
});


export default Lesson_8_TodoList;




import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import {TaskType} from "./Lesson_8_TodoList";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "./Lesson_8_App_Redux";

type TaskWithReduxPropsType = {
    todoListId: string
    task: TaskType


}
export const TaskWithRedux = React.memo(({task, todoListId}: TaskWithReduxPropsType) => {

    console.log('TaskWithRedux')

const dispatch = useDispatch()

    // const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListId].find(t=>t.id===task.id) as TaskType)
    //либо через useSelector или props

    const onClickRemoveTaskHandler = useCallback(() =>   dispatch(removeTaskAC(task.id, todoListId)), [dispatch])

    const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDownValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDownValue, todoListId))
    }

    const isDoneClasses = task.isDone ? "isDone" : "notIsDone"

    const onChangeSetTaskTitle = (title: string) =>  dispatch(changeTaskTitleAC(task.id, title, todoListId))

    return (
        <li key={task.id}>
            <Checkbox
                // type="checkbox"
                checked={task.isDone}
                color="secondary"
                onChange={onChangeSetTaskStatus}
            />
            {/*<span className={isDoneClasses}>{task.title}</span>*/}
            <EditableSpan
                title={task.title}
                classes={isDoneClasses}
                changeTitle={onChangeSetTaskTitle}
            />

            <IconButton onClick={onClickRemoveTaskHandler}
                        size={'small'}
                        color={'primary'}
            ><DoDisturbAltIcon/></IconButton>
        </li>
    )


})
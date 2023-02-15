import {FilterValuesType} from "./Lesson_8_App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import {TaskType} from "./Lesson_8_TodoList";

type TaskPropsType = {
    todoListId: string
    tasks: TaskType
    removeTask: (taskId: string, todoListId: string) => void

    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {

    console.log('Task')

    const onClickRemoveTaskHandler = useCallback(() => props.removeTask(props.tasks.id, props.todoListId), [props.removeTask, props.todoListId])

    const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.tasks.id, e.currentTarget.checked, props.todoListId)

    const isDoneClasses = props.tasks.isDone ? "isDone" : "notIsDone"

    const onChangeSetTaskTitle = (title: string) => props.changeTaskTitle(props.tasks.id, title, props.todoListId)

    return (
        <li key={props.tasks.id}>
            <Checkbox
                // type="checkbox"
                checked={props.tasks.isDone}
                color="secondary"
                onChange={onChangeSetTaskStatus}
            />
            {/*<span className={isDoneClasses}>{task.title}</span>*/}
            <EditableSpan
                title={props.tasks.title}
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
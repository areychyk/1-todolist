import React from "react";
import {IconButton} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

type IconButtonDeletePropsType = {
    onClickRemoveTodolist: () => void
}
export const IconButtonDeleteMemo = React.memo((props: IconButtonDeletePropsType) => {
    console.log('IconButtonDeleteMemo')
    return (

        <IconButton

            onClick={props.onClickRemoveTodolist}
            size={'small'}
            color={'secondary'}
        ><HighlightOffIcon/></IconButton>
    )
})
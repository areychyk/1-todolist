import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import Lesson_8_App_Redux from "../Lessons/Lesson_8/Lesson_8_App_Redux";

import {ReduxStoreProviderDecorator} from "../Lessons/Lesson_8/store/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLIST/App',
    component: Lesson_8_App_Redux,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof Lesson_8_App_Redux>;


const Template: ComponentStory<typeof Lesson_8_App_Redux> = (args) => <Lesson_8_App_Redux/> ;

export const AppStory = Template.bind({});




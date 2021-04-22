import React from 'react';
import { TestAppWrapper } from "../../../test";
import { mount, ReactWrapper } from 'enzyme';
import Todos from "../component/Todos";
import wait from 'waait'
import { act } from "react-dom/test-utils";
import TodoItem from "../component/TodoItem";
import todosQuery from '../../../api/todos.graphql'

describe('routes/Todos', () => {

    const renderComponent = (props = {}, mocks: any = []) => mount(
        <TestAppWrapper apolloMocks={mocks}>
            <Todos />
        </TestAppWrapper>
    )

    test('Should match snapshot', () => {
        expect(renderComponent()).toMatchSnapshot()
    })

    test('Should render without crashing', () => {
        expect(renderComponent()).toExist()
    })

    test('Should render todo items', async() => {
        let component: ReactWrapper;

        const mockTodos = [
            {
                title: 'Todo-1',
                description: 'todo description',
                imageSrc: ''
            },
            {
                title: 'Todo-2',
                description: 'todo description',
                imageSrc: ''
            }
        ]

        const mocks = [
            {
                request: {
                    query: todosQuery
                },
                result: {
                    data: {
                        Todos: mockTodos
                    }
                }
            }
        ]

        await act(async() => {
            component = renderComponent({}, mocks)
            await wait(0)
        })

        component!.update()

        const todoItems = component!.find(TodoItem).map(n => n)

        expect(todoItems.length).toEqual(2)
        todoItems.forEach((item, i) => {
            expect(item.props().title).toEqual(`Todo-${i + 1}`)
        })
    })

})
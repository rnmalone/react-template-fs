import React from 'react';
import {useQuery} from "@apollo/client";
import shortid from 'shortid';
import todosQuery from '../../../api/todos.graphql'
import { str } from "../../../lib";
import { ITodo } from "../../../../types";
import TodoItem from "./TodoItem";

import '../styles/Todos.scss';

export default function Todos() {
    const { data } = useQuery<{ Todos: ITodo[] }>(todosQuery)

    return (
        <>
            <h2>{str('pages.todos.title')}</h2>
            <div className="Todos-container">
                {
                    (data?.Todos || []).map((todo: ITodo) => (
                        <TodoItem
                            key={shortid()}
                            title={todo.title}
                            description={todo.description}
                            imageSrc={todo.imageSrc}
                        />
                    ))
                }
            </div>
        </>
    )
}
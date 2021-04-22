import React from 'react';
import { str } from "../../../lib";
import { ITodo } from "../../../../types";

import '../styles/TodoItem.scss';

export default function TodoItem({ title, description, imageSrc }: ITodo) {
    const todoTitle = str(title)

    return (
        <div className="TodoItem">
            <div>
                <span className="TodoItem__title">{todoTitle}</span>
                <span>{str(description)}</span>
            </div>
            <img src={imageSrc} alt={todoTitle} width={50} />
        </div>
    )
}
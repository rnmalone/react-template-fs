import React, { ChangeEvent } from 'react';
import { str } from "../../../lib";

interface ICounterComponentProps {
    counterValue: number;
    setCounterValue(newValue: number): void;
}

export default function Counter({ counterValue, setCounterValue }: ICounterComponentProps) {

    const handleValueChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
        setCounterValue(Number(value))
    }

    return (
        <>
            <h2>{str('pages.counter.title')}</h2>
            <div>
                <input
                    id="counter-input"
                    type="number"
                    value={counterValue}
                    onChange={handleValueChange}
                />
            </div>
        </>
    )
}
import React from 'react';
import { TestAppWrapper } from "../../../test";
import Counter from "../components/Counter";
import { mount } from 'enzyme';

describe('routes/Counter', () => {

    const renderComponent = (props = {}) => mount(
        <TestAppWrapper>
            <Counter
                counterValue={0}
                setCounterValue={jest.fn()}
                {...props}
            />
        </TestAppWrapper>
    )

    test('Should match snapshot', () => {
        expect(renderComponent()).toMatchSnapshot()
    })

    test('Should render without crashing', () => {
        expect(renderComponent()).toExist()
    })

    test('Should display counter value in input', () => {
        expect(renderComponent({ counterValue: 10 }).find('#counter-input')?.props().value).toEqual(10)
    })

})
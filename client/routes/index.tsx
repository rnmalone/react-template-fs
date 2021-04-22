import React from 'react';
import { Redirect, Route, Switch } from "react-router";

import Todos from './Todos'
import Counter from "./Counter";

export default () => {
    return (
        <Switch>
            <Route exact path="/todos" component={Todos}/>
            <Route exact path="/counter" component={Counter} />
            <Redirect from="/" to="/todos" />
        </Switch>
    )
}

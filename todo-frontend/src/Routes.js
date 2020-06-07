import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signin from './users/Signin'
import Signup from './users/Signup'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Task from './core/Task'
import Label from './core/Label'
import ModifyTask from './core/ModifyTask'
const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' exact component={Signin} />
                <Route path ='/signup' exact component={Signup} />
                <PrivateRoute path="/addTask" exact component={Task} />
                <PrivateRoute path="/addLabel" exact component={Label} />
                <PrivateRoute path="/updateTask/:taskId" exact component={ModifyTask} />

            </Switch>    
        </BrowserRouter>
    )
}

export default Routes;
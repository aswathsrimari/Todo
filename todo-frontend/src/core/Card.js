import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth';
import {deleteTask} from '../auth/apiCore'
const Card = ({task}) =>{

    const [success,setSuccess] = useState(false);

    const [error,setError] = useState('');


    const {user,token} = isAuthenticated()
    const removeTask = () =>{
        console.log(task._id,user._id,token)
        deleteTask(task._id,user._id,token)
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setSuccess(true);
            }
        })
    }

    const CardForm = () => (
        <div className="card text-center">
            <div className="card-header name">
                {task.name}
            </div>
            <div className="card-body">

            <h5 className="card-title" title="label" >{task.label}</h5>
                <h5 className="card-title" title="status">{task.status}</h5>
                <p className="card-text" title="description">{task.description}</p>

                <Link to={`updateTask/${task._id}`} class="btn btn-primary" style={{margin:'5px'}}>Update</Link>
                <button className="btn btn-primary" onClick={removeTask} > Delete</button>

            </div>
            <div className="card-footer text-muted">
            <h5 className="card-title" title="due date">{task.duedate}</h5>
            <h5 className="card-title" title="due time">{task.duetime}</h5>
            </div>
        </div>

    )
    const ReloadPage = () =>{
            if(success){
                window.location.reload(true);  
            }
    }

    useEffect(()=>{
        ReloadPage();
    },[success]);

    return (
        <div>

        {CardForm()}        
        </div>
        
    )
}


export default Card;
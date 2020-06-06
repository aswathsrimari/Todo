import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { Redirect,Link } from 'react-router-dom';
import {getTasks} from '../auth/apiCore';
import {isAuthenticated} from '../auth'
import Card from './Card'
const Home = () =>{


    const [values,setValues] = useState({
        tasks : [],
        error:false,
        success:false
    });
    const {user,token} = isAuthenticated();
    const {tasks,error,success} = values;

    const loadTask = () =>{
        if(isAuthenticated()){
            getTasks(user._id,token)
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error,success:false})
                }
                else{
                    setValues({...values,tasks:data.task,error:false,success:true})
                    console.log(data);
                }
            })

        }
        
    }

    const showTask = () =>{
        if(success){
            return <div className="row">
            {tasks.map((task, i )=>(<div key={i} className="container col-md-8 offset-md-2"><Card task={task}/> </div>)  
             )}
        </div>
        }
        else{
            return <div className="alert alert-info">No tasks available</div>
        }
    }


    useEffect(()=>{
        loadTask();
    },[])

    const stProps = {
        margin: '40px',
        border:'15px solid green'
    }


    return (
        <Layout title="TODO" description="TASK MANAGEMENT APPLICATION" className="container col-md-8 offset-md-2">
            <div className="btn btn-group-lg col-4"><Link to="/addTask"><button className="btn btn-primary">ADD TASK</button></Link></div>

            <h2 className="mb-4">Your Todo </h2>
             <div className="col">
            {tasks.map((task, i )=>(<div key={i} className="col" style={stProps}><Card task={task}/> </div>)  
             )}
        </div>
    
        </Layout>

    )
    
}




export default Home;
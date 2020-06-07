import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import { isAuthenticated } from '../auth';
import {getLabels,createTask} from '../auth/apiCore'
import {Link} from 'react-router-dom'

const Task = () =>{
    const [values,setValues] = useState({
        name:'',
        label:'',
        labels:[],
        description:'',
        duedate:'2020-06-25',
        duetime:'10:33',
        status:'',
        email:'',
        error:'',
        success:false,
        loading:false,
        createdTask:'',
        due:'2020-06-25T10:33'
    })

    const {loading,email,labels,name,description,duedate,duetime,label,status,error,success,createdTask,due} = values
    const {user,token} = isAuthenticated();

    const loadLabels = () =>{
        getLabels(user._id,token).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                console.log(data.label)
                setValues({labels:data.label,["email"]:user.email})
            }
        });
    }
    
    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values, error:"", loading: true});

        createTask(user._id, token, values)
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values, name: '', description: '', photo: '', price: '', quantity: '',
                    loading: false, createdtask: data.name,success:true
                });
                console.log(createdTask)

            }
        })
    }
    const showLoading = () =>(
        loading && (
            <div className="alert alert-danger">
            <h2>loading..</h2>
            </div>
        )
    )


    const showError = () =>{
        if(error){
            return <h3 className="text-danger"> Category should be unique </h3>
        }
    }

    const handleChange = name => (event) =>{
        setValues({...values,[name]:event.target.value})
        console.log(values)
    }
    
    const handleTime = event =>{
        var ts = event.target.value;
        var sp = ts.split("T");
        setValues({...values,duedate:sp[0],duetime:sp[1]});
    }

    const taskForm = () =>(
        <form onSubmit={clickSubmit} style={{margin:"0px 0px 40px 0px"}}>
            <div className="form-group">
                <label className="text-muted">Task name </label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Label</label>
                <select onChange={handleChange('label')}  className="form-control" >
                <option value=""> Please select </option>
                {labels && labels.map((c, i)=>(<option key={i} value={c.name}>{c.name}</option>))}

                 </select>
            
            </div>
            <div className="text-muted">OR</div>
            <div className="form-group">
                <label className="text-muted">Create new label    </label>
                <Link to="/addLabel"><button type="button" className="btn btn-secondary" >New label</button></Link>
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />     
            
            </div>

            <div className="form-group">
                <label for="text-muted">Due date and time</label>
            <input type="datetime-local" id="d.mailuetime" className="form-control" value={due} onChange={handleTime} />
            </div>

            <div className="form-group">
                <label className="text-muted">Status</label>
                    <select onChange={handleChange('status')}  className="form-control" value={status} >
                        <option value=""> Please select </option>
                        <option value="New"> New </option>     
                        <option value="Progress"> Progress </option>  
                        <option value="Completed"> Completed </option>
                    </select>
            </div>

            <button className="btn btn-primary">Create Task</button>

           




        
        </form>
    )
    const showSuccess = () =>(
        success && (
            <div className="alert alert-info">
                <h2>Task is created! </h2>
            </div>
        )   
    )

    useEffect(()=>{
        loadLabels()
    },[])


    return (
        <Layout title="myTODO" description="CREATE TASK" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showLoading()}
            {taskForm()}    
            {showError()}     
            
        </Layout>
    )
}

export default Task;
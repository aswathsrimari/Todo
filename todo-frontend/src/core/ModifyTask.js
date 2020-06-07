import React,{useState,useEffect} from 'react'
import Layout from './Layout';
import { Redirect,Link } from 'react-router-dom';
import {getTasks,readTask} from '../auth/apiCore';
import {isAuthenticated} from '../auth'
import {createTask,getLabels,updateTask} from '../auth/apiCore'
import Card from './Card'

const ModifyTask = ({match}) =>{
        const [values,setValues] = useState({
            name:'',
            label:'',
            labels:[],
            description:'',
            duedate:'',
            duetime:'',
            status:'',
            email:'',
            error:'',
            success:false,
            loading:false,
            createdTask:'',
            due:''
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
        const loadTask = (taskId) =>{
            readTask(taskId,user._id)
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    console.log(data);
                    setValues({...values,name:data.name,label:data.label,description:data.description,duedate:data.duedate,duetime:data.duetime,
                    status:data.status})
                    console.log(values)
                }
            })
        }
        
        const clickSubmit = event =>{
            event.preventDefault()
            setValues({...values, error:"", loading: true});
    
            updateTask(user._id,match.params.taskId, token, values)
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
            <form onSubmit={clickSubmit}  style={{margin:"0px 0px 40px 0px"}}>
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
                <input type="datetime-local" id="duetime" className="form-control" value={due} onChange={handleTime} />
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
    
                <button className="btn btn-primary">Update Task</button>
    
               
    
    
    
    
            
            </form>
        )
        const showSuccess = () =>(
            success && (
                <div className="alert alert-info" style={{display: createdTask?'':'none'}}>
                    <h2>{`${createdTask}`} is updated! </h2>
                </div>
            )   
        )
    
        useEffect(()=>{
            loadLabels();
            loadTask(match.params.taskId);
        },[])



        const redirectUser = () => {
            if (success) {
                if (!error) {
                    return <Redirect to="/" />;
                }
            }
        };

    
        return (
            <Layout title="myTODO" description="CREATE TASK" className="container col-md-8 offset-md-2">
                {showSuccess()}
                {showLoading()}
                {taskForm()}    
                {showError()}   
                {redirectUser()}  
                
            </Layout>
        )

}

export default ModifyTask;
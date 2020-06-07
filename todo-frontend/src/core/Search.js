

import React, {useState, useEffect} from 'react';

import Card from './Card';
import { getLabels,list} from '../auth/apiCore';
import { isAuthenticated } from '../auth';


const Search = () =>{

    const [data, setData] = useState({
        labels: [],
        label: '',
        search:'',
        results: [],
        searched: false
    });

    const {labels, label, search, results, searched} = data;
    const {user,token} = isAuthenticated();

    const loadLabels = () =>{
        if(isAuthenticated()){
            getLabels(user._id,token).then(data=>{
                if(data.error){
                    setData({...data,error:data.error})
                }
                else{
                    console.log(data.label)
                    setData({labels:data.label,["email"]:user.email})
                }
            });

        }
        
    }
    useEffect(()=>{
        loadLabels();
    },[])


    const searchData = () =>{
        if(search && isAuthenticated()){
            list({search: search || undefined, label: label},user._id,token)
            .then(response=>{
                if(response.error){
                    console.log(response.error);
                }else{
                    console.log(response)
                    setData({...data, results:response,searched:true});
                    console.log(results)
                }
            })
        }
    }
    const searchSubmit = (e) =>{
       e.preventDefault();
       searchData();
    } 

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched:false})

    }

    const searchMessage = (searched, results) =>{
        if(searched && results.length>0){
            return `Found ${results.length} Tasks`

        }
        if(searched && results.length<1){
            return <div className="alert alert-danger">
            <h3>No Task Found</h3>
             </div>

        }

    }
    const stProps = {
        margin: '40px',
        border:'15px solid green'
    }

    const searchedProducts = (results = []) =>(

        <div>
          <h2 className="mt-4 mb-4">
            {searchMessage(searched, results)}
          </h2>
          <div className="col">
          {results.map((task, i)=>(<Card key={i} className="col" style={stProps} task={task}/>))}
        
        </div>
        </div>
       
    )
    const searchForm = () =>( 
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
            <div className="input-group input-group-lg">
             <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("label")}>
                <option value="All">All labels</option>
                {labels.map((c,i) =>(<option key={i} value={c.name}>{c.name}</option>))}
              </select>
             </div>
             <input type="search" className="form-control" onChange={handleChange("search")}
              placeholder="search by name" />
            
            </div>
            <div className="btn input-group-append" style={{border: 'none'}}>
              <button className="input-group-text">Search</button>
            </div>
            
            </span>
        
        </form>
    )
    return (
        <div>
        <div className="container mb-3">{searchForm()}</div>
        

        <div className="container-fluid mb-3">
          {searchedProducts(results)}
        </div>
        
        </div>
    )
}
export default Search;
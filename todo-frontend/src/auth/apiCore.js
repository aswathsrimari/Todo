import React from 'react'
import {API} from '../config'
import queryString from 'query-string'

export const getLabels = (userId,token) =>{
    return fetch(`/labels/${userId}`,{
        method:"GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
    .then(response=>{
        return response.json();
    })
    .catch(err =>{
        return err;
    });
}

export const getTasks = (userId,token) =>{
    return fetch(`/tasks/${userId}`,{
        method:"GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    })
    .then(response=>{
        return response.json();
    })
    .catch(err =>{
        return err;
    });
}

export const addLabel = (label,userId,token) =>{
    return fetch(`/label/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(label)
    })
    .then(response=>{
        return response.JSON();
    })
    .catch(err=>{
        return err;
    })
}

export const createTask = (userId,token,task) =>{
    return fetch(`/task/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(task)
    })
    .then(response=>{
        return response.JSON();
    })
    .catch(err=>{
        return err;
    })
}

export const readTask = (taskId,token) =>{
    return fetch(`/task/${taskId}`,{
        method:"GET",

    })
    .then(response=>{
        return response.json();
    })
    .catch(err =>{
        return err;
    });
}

export const updateTask = (userId,taskId,token,task) =>{
    return fetch(`/task/${taskId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(task)
    })
    .then(response=>{
        return response.JSON();
    })
    .catch(err=>{
        return err;
    })
}


export const deleteTask = (taskId,userId,token) =>{
    return fetch(`/task/${taskId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

        }
        
    })
    .then(response=>{
        return response.JSON();
    })
    .catch(err=>{
        return err;
    })
}


export const list =(params,userId,token) =>{
    const query = queryString.stringify(params);
    console.log(query);
    return fetch(`/tasks/search/${userId}?${query}`,{
        method:"GET",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>{
            return err;
        })
}
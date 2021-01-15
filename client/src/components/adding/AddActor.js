import React, { useState } from 'react'
import axios from "axios"

export default function AddActor() {


    const [actor,setActor] = useState({})

    const changeHandler = (e) =>{
        const {name,value} = e.target
        setActor(({
            ...actor,
            [name]:value
        }))
    }

    const addActor = (actor) =>{
        const token = localStorage.getItem("token")

        let config = {
        headers: {
            authorization:token
        }
    }
        axios.post("http://localhost:5000/mong/profile/actors/add_actor",actor,config)
        .then(res=>{
            window.location.assign("/home")
            
        })
        .catch(err => console.log(err))
    }

    const submitHandler = (e) =>{
        addActor(actor)
        e.preventDefault()
    }

    const token = localStorage.getItem("token")
    if(!token){
        
        return (
            <div style={{marginBottom:"29em"}}>
                <div className="alert alert-danger">You are not allowed to access this page please get yourself authorized</div>
                <h3 style={{color:"white"}}>Page Not Found 404</h3>
            </div>
            
            
        )}

    return (
        <div style={{marginTop:"4em"}}>
        <h3 style={{color:"white"}}>Add Favorite Actor</h3>
        <form onSubmit={submitHandler} style={{marginTop:"2em"}}>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Actor Image URL</strong> </label>
            <input onChange={changeHandler} name="img" type="text" class="form-control" placeholder="Enter Image URL"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Actor Name</strong> </label>
            <input onChange={changeHandler} name="name" type="text" class="form-control" placeholder="Enter Actor Name"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Actor Age</strong> </label>
            <input onChange={changeHandler} name="age" type="text" class="form-control" placeholder="Enter Actor Age"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Actor Home Town</strong> </label>
            <input onChange={changeHandler} name="location" type="text" class="form-control" placeholder="Enter Actor Hometown"/>
            
        </div>
        
        
        <button type="submit" class="btn btn-danger">Save</button>
        </form>
    </div>
    )
}

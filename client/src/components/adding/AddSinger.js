import React, { useState } from 'react'
import axios from "axios"

export default function AddSinger() {


    const [singer,setSinger] = useState({})

    const changeHandler = (e) =>{ 
        const {name,value} = e.target
        setSinger(({
            ...singer,
            [name]:value
        }))
    }

    const addSinger = (singer) =>{
        const token = localStorage.getItem("token")

        let config = {
        headers: {
            authorization:token
        }
    }
        axios.post("http://localhost:5000/mong/profile/singers/add_singer",singer,config)
        .then(res=>{
            window.location.assign("/home")
            
        })
        .catch(err => console.log(err))
    }

    const submitHandler = (e) =>{
        addSinger(singer)
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
        <h3 style={{color:"white"}}>Add Favorite Singer/Group</h3>
        <form onSubmit={submitHandler} style={{marginTop:"2em"}}>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Singer/Group Image URL</strong> </label>
            <input onChange={changeHandler} name="img" type="text" class="form-control" placeholder="Enter Singer/Group Image URL"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Singer/Group Name</strong> </label>
            <input onChange={changeHandler} name="name" type="text" class="form-control" placeholder="Enter Singer/Group Name"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Singer/Group - Age/Union Date</strong> </label>
            <input onChange={changeHandler} name="age" type="text" class="form-control" placeholder="Enter Singer/Group - Age/Union Date"/>
            
        </div>
        <div class="form-group">
            <label style={{fontSize:"1.5em",color:"white"}} ><strong>Singer/Group Home Town</strong> </label>
            <input onChange={changeHandler} name="location" type="text" class="form-control" placeholder="Enter Singer Hometown"/>
            
        </div>
        
        
        <button type="submit" class="btn btn-danger">Save</button>
        </form>
    </div>
    )
}
// const mapDispatchToProps = {
//     addFavoriteSinger
// }

// export default connect(null,mapDispatchToProps)(AddSinger)
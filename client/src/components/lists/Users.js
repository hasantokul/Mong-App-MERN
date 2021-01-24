import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"



function Users() {

    const[users,setUsers] = useState()

    useEffect(()=>{
        const name = localStorage.getItem("searched")
        let token = localStorage.getItem("token")
        let config = {
            headers: {
                authorization:token
            }
        }
        axios.get(`http://localhost:5000/mong/users/search/${name}`,config)
        .then(res=>{
            setUsers(res.data.users)
        })
        
    },[])
    
    
    
    return (
        <div style={{marginTop:"8em",marginBottom:"30em"}}>

            
            <table class="table table-light table-hover">
            <thead>
                <tr>
                    <th scope="col">User</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Location</th>
                    <th scope="col">Business</th>
                    <th scope="col">Joined Date</th>
                </tr>
            </thead>
                {
                users
                ?
                users.map(user =>(
                    
                        
                        <tbody>
                            
                            <tr>
                            
                                <th scope="row"><img style={{width:"5em",height:"5em",borderStyle:"solid",borderColor:"skyblue",borderRadius:"0.2em"}} src={user.img}></img></th>
                                <a href="#" style={{textDecoration:"none"}}><td>{user.name}</td></a>
                                <td>{user.age}</td>
                                <td>{user.location}</td>
                                <td>{user.business}</td>
                                <td>{user.createdDate}</td>
                                
                            </tr>
                            
                        </tbody>
                        
                    )):null
                }
            </table>
            
            </div>
        
    )
}

export default Users

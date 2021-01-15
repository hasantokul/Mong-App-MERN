import axios from 'axios'
import React, { useEffect, useState } from 'react'



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

            <div  class="list-group">
            {
                users
                ?
                users.map(user =>(
                    <li style={{backgroundColor:"lavender"}} href="#" class="list-group-item list-group-item-action">
                        <div style={{display:"flex",justifyContent:"space-evenly"}}>
                            <a href="#" className="action d-flex flex-column align-items-center">
                                <img style={{borderStyle:"solid",borderColor:"white",borderRadius:"3px",marginBottom:"1em",marginTop:"1em", width:"7em",height:"auto"}} src = {user.img}></img>
                                <h6 class="mb-1">{user.name}</h6>
                            </a>
                            <div style={{marginLeft:"6em",marginTop:"3em", display:"flex",flexWrap:"wrap"}}>
                                <div style={{display:"flex"}}>
                                    <h5><span style={{marginRight:"0.5em"}} class="badge badge-primary">Age :</span></h5>
                                    <h5 style={{marginRight:"1.5em"}}>{user.age}</h5>
                                </div>
                                <div style={{display:"flex"}}>
                                    <h5><span style={{marginRight:"0.5em"}} class="badge badge-primary">Country/City :</span></h5>
                                    <h5 style={{marginRight:"1.5em"}}>{user.location}</h5>
                                </div>
                                <div style={{display:"flex"}}>
                                    <h5><span style={{marginRight:"0.5em"}} class="badge badge-primary">Business :</span></h5>
                                    <h5 style={{marginRight:"1.5em"}}>{user.business}</h5>
                                </div>
                                <div style={{display:"flex"}}>
                                    <h5><span style={{marginRight:"0.5em"}} class="badge badge-primary">Summary :</span></h5>
                                    <h5 style={{marginRight:"1.5em"}}>{user.summary}</h5>
                                </div>
                            </div>
                            <small style={{marginLeft:"5em"}}><strong>Joined {user.createdDate}</strong></small>
                        </div>
                    </li>
                ))
                :null
                
            }
            
            
            </div>
        </div>
    )
}

export default Users

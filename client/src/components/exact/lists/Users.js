import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../../../style.css"



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

    const onClick = (user) => {
        const id = user._id
        localStorage.setItem("userId",id)
        window.location.assign("/user/profile")
        
    }
    
    
    
    return (
        <div style={{marginTop:"8em",marginBottom:"30em"}}>

            
                {
                users
                ?
                users.map(user =>(
                    
                    <div class="container d-flex justify-content-center">
                    <div class="card user-item bg-dark">
                      <a onClick={() => onClick(user)} class="card-link" href="#">
                        <div class="d-flex">
                          <img class="list-img" src={user.img} />
                          <div class="card-body">
                            <div class="d-flex justify-content-between">
                              <div>
                                <h5 class="card-title title-white">{user.name}</h5>
                                <h6 class="mb-2 text-muted">{user.age} Years Old</h6>
                                <h6 class="mb-2 text-muted">{user.business}</h6>
                                <p class="biography">{user.summary}</p>
                              </div>
              
                              <div class="d-flex flex-column align-items-center">
                                <p class="text-muted">
                                  <i class="fas fa-user-clock mr-7"></i>Joined at 25/01/2021
                                </p>
                                <p class="text-muted ml-10">Songs: {user.songsList.length}</p>
                                <p class="text-muted">Movies : {user.moviesList.length}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                        
                        
                    )):null
                }
            
            
            </div>
        
    )
}

export default Users

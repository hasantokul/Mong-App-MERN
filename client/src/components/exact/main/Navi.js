import React, { useState } from 'react';
import axios from "axios"

const Navi = () => {

  
  const [searched,setSearched] = useState(null)
  
  

  const changeHandler=(e)=>{
    
    setSearched(e.target.value)
  }

  const submitHandler=(e)=>{
    localStorage.setItem("searched",searched)
    

    window.location.assign("/search/users")

    
    e.preventDefault()
  }
  

  const logout = () =>  { 
    
    let token = localStorage.getItem("token")
    let config = {
        headers: {
            authorization:token
        }
      }
    axios.get('http://localhost:5000/mong/authentication/logout',config)
    .then(() => {
        localStorage.removeItem("token")
        window.location.assign("/")
    })
    .catch(err => {
        console.log(err)
        window.location.assign("/")
      })
  }

  
  const token = localStorage.getItem("token")


  if(token){
    return (

      <div>
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark navbar-fixed-top">
          <a className="navbar-brand" href="/home">Mong App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <form onSubmit={submitHandler} className="form-inline my-2 my-lg-0 mr-5">
                    <input onChange={changeHandler} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
                  </form>
                </li>
                <li className="nav-item">
                  <div className="nav-item dropdown ">
                      <a style={{color:"white"}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Settings
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      
                      <a class="dropdown-item" style={{cursor:"pointer"}} onClick={logout}>Logout</a>
                      
                      <a className="dropdown-item" href="#">Edit Profile</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                </li>
              </ul>
            </div>
        </nav>
      </div>
    )
    
    
  }
  
  else{
    return (
      <div>
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark navbar-fixed-top">
          <a className="navbar-brand" href="/">Mong App</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
  
}

// const mapDispatchToProps = {
//   searchUser
// }
     
export default Navi;
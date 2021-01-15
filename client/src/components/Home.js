import React, { Component } from 'react'
import axios from "axios"

export default class Home extends Component {

    state = {
        errorMessage:""
    }

    logout = () =>  { 
        
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
            
            this.setState({errorMessage:err.message})
            
        })
    }
    render() {
        
        const token = localStorage.getItem("token")
        if(!token){
            
            return (
                <div>
                    <div className="alert alert-danger">You are not allowed to access this page please get yourself authorized</div>
                    <h3>Page Not Found 404</h3>
                </div>
                
                
            )
        }else{
            return (
                <div className="container">
                    {
                    this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                    }
                    <h3>Welcome</h3>
                    <button onClick={this.logout} className="btn btn-primary">Logout</button>
                    
                </div>
               
            )
        }

        
    }
}

import React, { Component } from 'react'
import axios from "axios"


export default class LoginForm extends Component {


    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errorMessage:"",
            
        };
    }
    
    login = (userData) =>  { 
        
        axios.post('http://localhost:5000/mong/authentication/login', userData)
        .then(res => {

           
            const { token } = res.data
            if(token){
                localStorage.setItem("token",token)
            }
            
            window.location.assign("/home")

        })
        .catch(err => {
            
            
            this.setState({errorMessage:err.response.data.message})
            
        })
    }

    onSubmit = e => {
        e.preventDefault();
      
        const userData = {
          email: this.state.email,
          password: this.state.password
        }
        this.setState({email:"",password:""})
        this.login(userData)
      }
    
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      }

      

    render() {

    

        localStorage.removeItem("token")
        // window.location.reload()
        
        
        return (
            
                    <div>
                    <h3 style={{color:"white"}}>Login</h3>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label style={{color:"white"}} htmlFor="exampleInputEmail1">Email address</label>
                                <input onChange={this.onChange} value={this.state.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label style={{color:"white"}} htmlFor="exampleInputPassword1">Password</label>
                                <input onChange={this.onChange} value={this.state.password} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <button style={{marginBottom:"1em"}} type="submit" className="btn btn-danger">Login</button>
                            {
                            this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                            }
                            
                        </form>
                    </div>
                
        )
    }
}


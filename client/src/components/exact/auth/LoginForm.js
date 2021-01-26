import React, { Component } from 'react'
import axios from "axios"


export default class LoginForm extends Component {


    constructor(){
        super()
        this.state = {
            email: '',
            forgotEmail:"",
            password: '',
            errorMessage:"",
            forgotMessage:""
            
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
        
        this.login(userData)
      }
    
      onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
      }
      
      onForgotChange = e =>{
          this.setState({[e.target.name] : e.target.value})
      }

      onForgotSubmit = e => {

        const email = {
            email: this.state.forgotEmail
        }
        
        console.log(email)
        axios.post('http://localhost:5000/mong/authentication/forgot_password',email)
        .then(()=>{
            
            window.location.assign("/verify_email")

        })
        .catch(err =>{
            
            this.setState({forgotMessage:err.response.data.message})
            
            
        })
        
        
        e.preventDefault()
      }

      

    render() {

        localStorage.removeItem("token")
        
        return (
            
            <div>
                <h3 style={{color:"white"}}>Login</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{color:"white"}} htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={this.onChange}  name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label style={{color:"white"}} htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={this.onChange} value={this.state.password} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div style={{display:"flex"}}>
                        <button style={{marginRight:"3em"}} type="submit" className="btn btn-danger">Login</button>
                        <a class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Forgot Password</a>
                        
                        
                    </div>
                    
                    <br></br>
                    {
                    this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                    }
                    
                </form>
                    
                <div style={{marginTop:"4em"}} class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Forgot Password</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.onForgotSubmit}>
                                <div class="modal-body">
                                    <label for="exampleInputEmail1">Please enter your email adress</label>
                                    <input onChange={this.onForgotChange} name="forgotEmail" type="email" class="form-control" placeholder="Enter email"/>
                                    <br></br>
                                    <p>We will send you a verification code to your email. Please check your email after that.</p>
                                    {
                                        this.state.forgotMessage?<div className="alert alert-danger">{this.state.forgotMessage}</div>:null
                                    }
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
                
        )
    }
}


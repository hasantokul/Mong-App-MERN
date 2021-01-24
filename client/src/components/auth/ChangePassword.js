import React, { Component } from 'react'
import axios from "axios"


export default class ChangePassword extends Component {


    state = {
        email : "",
        password : "",
        confirmPassword : "",
        errorMessage: ""
    }

    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = e =>{
        const data = {
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }
        axios.put("http://localhost:5000/mong/authentication/change_password",data)
        .then(() => {
            window.location.assign("/")
        })
        .catch(err => {
            
            this.setState({errorMessage:err.response.data.message})
            console.log(this.state.errorMessage)
            
        })

        e.preventDefault()
    
    }


    render() {

        return (
            <div style={{marginBottom:"10em",marginTop:"10em"}} className="row">
                
                <div className="col-lg-8">
                <h3 style={{marginBottom:"1em"}}>Change Password</h3>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input onChange={this.onChange} name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input onChange={this.onChange} name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input onChange={this.onChange} name="confirmPassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Please write your password again"/>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <br></br>
                    {   
                        this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                    }
                </div>
            </div>
        )
    }
}

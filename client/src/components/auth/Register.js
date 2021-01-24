import React, { Component } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom";

export default class Register extends Component {

    constructor(){
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            age:null,
            location:"",
            business:"",
            errorMessage:"",
            message:""
        }
    }
    

    register = (userData) => {
        
        axios.post('http://localhost:5000/mong/authentication/register', userData)
        .then(res => {
            
            this.setState({message:res.data.message})
            
        })
        .catch(err => {
            console.log(err)
            
            this.setState({errorMessage:"Register failed. Please check your inputs and try again"})
        })
    }

    onSubmit = e => {
        const userData = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            age:this.state.age,
            location:this.state.location,
            business:this.state.business
        }
        
        this.register(userData)
        
        e.preventDefault()
    }

    onChange = e =>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]: name === "age"?parseInt(value,10):value
        })
    }

    render() {
        return (
            
                    <div>
                    <h3 style={{color:"white"}}>Register</h3>
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={{color:"white"}} >Name&Surname</label>
                            <input onChange={this.onChange} name="name" type="text" className="form-control"  placeholder="Enter your name"/>
                        </div>
                        <div className="form-group">
                            <label style={{color:"white"}} htmlFor="exampleFormControlInput1">Email address</label>
                            <input onChange={this.onChange}  name="email" type="email" className="form-control"  placeholder="name@example.com"/>
                        </div>
                        <div className="form-group">
                            <label style={{color:"white"}} htmlFor="exampleFormControlInput1">Password</label>
                            <input onChange={this.onChange}  name="password" type="password" className="form-control"  placeholder="Enter your password"/>
                        </div>
                        <div className="form-group">
                            <label style={{color:"white"}} htmlFor="exampleFormControlInput1">Age</label>
                            <input onChange={this.onChange}  name="age" type="text" className="form-control"  placeholder="Enter your age"/>
                        </div>
                        <div className="form-group">
                            <label style={{color:"white"}} htmlFor="exampleFormControlInput1">Location</label>
                            <input onChange={this.onChange} name="location" type="text" className="form-control"  placeholder="enter your location"/>
                        </div>
                        <div className="form-group">
                            <label style={{color:"white"}} htmlFor="exampleFormControlInput1">Business</label>
                            <input onChange={this.onChange} name="business" type="text" className="form-control" id="exampleFormControlInput1" placeholder="enter your business"/>
                        </div>
                        <button style={{marginBottom:"1em"}} type="submit" className="btn btn-danger">Register</button><br></br>
                        {
                            this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                        }
                        {
                            this.state.message?<div className="alert alert-primary">{this.state.message}</div> :null
                        }
                
                        </form>
                    </div>
                
        )
    }
}

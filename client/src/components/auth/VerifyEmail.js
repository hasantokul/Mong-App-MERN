import React, { Component } from 'react'
import axios from "axios"

export default class VerifyEmail extends Component {

    state = {
        emailToken : "",
        errorMessage:""
    }

    changeHandler = (e) =>{
        this.setState({emailToken:e.target.value})
    }

    onSubmit = (e) =>{

        const emailToken = {
            token:this.state.emailToken
        }

        axios.post("http://localhost:5000/mong/authentication/verify_email",emailToken)
        .then(() => {
            window.location.assign("/change_password")
        })
        .catch(err => {
            this.setState({errorMessage:err.response.data.message})
        })

        e.preventDefault()
    }



    render() {
        return (
            
            <div style={{marginBottom:"18em",marginTop:"10em"}}>
                <h3 style={{marginBottom:"1em"}}>Verify your account</h3>
                <form onSubmit={this.onSubmit}>
                    <label style={{color:"white"}} for="exampleInputEmail1">Verification Token</label>
                    <br></br>
                    <input onChange={this.changeHandler} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter token"/>
                    <br></br>
                    <p>Please enter your verification token we have just sent to you</p>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
                <br></br>
                {
                    this.state.errorMessage?<div className="alert alert-danger">{this.state.errorMessage}</div> :null
                }
                
            </div>
        )
    }
}

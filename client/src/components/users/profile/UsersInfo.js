import axios from "axios"
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button,CardImg, Badge, Input
  } from 'reactstrap';
import {Link} from "react-router-dom"
import React, { Component } from 'react'


export default class Info extends Component {

  constructor(){
    super()
    this.state = {
        name: "",
        age: null,
        location:"",
        business:"",
        summary:"",
        img:""
    };
}


  getProfile = () => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")

    let config = {
      headers: {
          authorization:token
      }
    }
    axios.get(`http://localhost:5000/mong/users/user/${userId}/info`,config)
    .then(res => {
      
      this.setState({
        name:res.data.user.name,
        age:res.data.user.age,
        business:res.data.user.business,
        location:res.data.user.location,
        summary:res.data.user.summary,
        img:res.data.user.img
      })
      console.log(this.state.name)
    }).catch(err => {
      console.log(err)
    })
  }
  

  componentDidMount(){
    this.getProfile()
    
  }
  

  render() {
    const token = localStorage.getItem("token")
    if(!token){
        
        return (
            <div>
               
            </div>
            
            
        )}else{
          return (
            <div>
              <Link style = {{color:"white"}} to ="/user/profile/songs"><Button style = {{fontSize : "1em"}} color = "dark">Songs</Button></Link>
            <Link style = {{color:"white"}} to ="/user/profile/movies"><Button style = {{fontSize : "1em"}} color = "danger">Movies</Button></Link>
            <Card style = {{overflowX:"auto", marginTop:"0.5em",marginBottom:"10em"}}>
            
            <CardImg style = {{width : "100%", height : "auto"}} src={this.state.img}></CardImg>
      
              <CardBody>
                <CardTitle tag="h5">{this.state.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Biography</CardSubtitle><br></br>
                <CardText><Badge style = {{fontSize : "1em"}} color = "dark">Age:</Badge> <strong>{this.state.age}</strong> </CardText>
                <CardText><Badge style = {{fontSize : "1em"}} color = "dark">Country/City: </Badge><strong> {this.state.location}</strong></CardText>
                <CardText><Badge style = {{fontSize : "1em"}} color = "dark">Business: </Badge><strong>{this.state.business}</strong></CardText>
                <CardText>{this.state.summary}</CardText>
                
                
              </CardBody>
            </Card>
            </div>
          )
        }
    
    
  }
}


// function mapStateToProps(state){

//   return {
//     profile : state.getProfileReducer
//   }
// }

// function mapDispatchToProps(dispatch){
//   return {
//     getProfile: bindActionCreators(getProfile,dispatch)
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Info)

import React, { Component } from 'react'
import {Badge} from 'reactstrap';
import axios from "axios"
import {Link} from "react-router-dom"

export default class Favorites extends Component {

  state = {
    singers:[],
    actors:[]
  }

  componentDidMount(){
    this.getSingers()
    this.getActors()
  }


  getSingers(){
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }
    axios.get("http://localhost:5000/mong/profile/singers",config)
    .then(res =>{
      
      this.setState({singers:res.data.singers})
    })
  }

  getActors(){
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }
    axios.get("http://localhost:5000/mong/profile/actors",config)
    .then(res =>{
      
      this.setState({actors:res.data.actors})
    })
  }
  
  deleteSinger(singer){
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }
    axios.delete(`http://localhost:5000/mong/profile/singers/delete_singer/${singer._id}`,config)
    .then(res =>{
      
    })
    window.location.reload()
  }

  deleteActor(actor){
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }
    axios.delete(`http://localhost:5000/mong/profile/actors/delete_actor/${actor._id}`,config)
    .then(res =>{
      
    })
    window.location.reload()
  }

  render() {

    const token = localStorage.getItem("token")
    if(!token){
        
        return (
            <div style={{marginBottom:"29em"}}>
                <div className="alert alert-danger">You are not allowed to access this page please get yourself authorized</div>
                <h3 style={{color:"white"}}>Page Not Found 404</h3>
            </div>
            
            
        )}else{
          return (
            <div style={{marginBottom:"3em"}}>
                
              <h3 style = {{ marginTop:"2em",color:"white"}}>Favorites</h3>
              <br></br>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <h5 style = {{color:"white"}}>Favorite Singers & Groups</h5>
               <Link to="add_singer"><a class = "btn btn-danger">+ Add New</a></Link> 
              </div>
              <br></br>
              <div class="album py-5 bg-light">
                <div class="container">
        
                  <div class="row">
                  {
                    this.state.singers.map(singer => (
                      
                      <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                          <img  class="card-img-top" src={singer.img} alt="Card image cap"/>
                          <div class="card-body">
                            <h3>{singer.name}</h3>
                            <h5><Badge style={{marginRight:"0.5em"}} color = "dark"> Age/Date :</Badge>{singer.age}</h5>
                            <h5><Badge style={{marginRight:"0.5em"}} color = "dark"> Home Town :</Badge>{singer.location}</h5>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="btn-group">
                              
                              <button onClick={()=>this.deleteSinger(singer)} type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    ))
                  }
                  </div>
                </div>
              </div>
              <div style={{marginTop:"5em",display:"flex",justifyContent:"space-between"}}>
                <h5 style = {{color:"white"}}>Favorite Actors & Actresses</h5>
                <Link to="add_actor"><a class = "btn btn-danger">+ Add New</a></Link>
              </div>
              <br></br>
              <div class="album py-5 bg-light">
                <div class="container">
        
                  <div class="row">
              {
                this.state.actors.map(actor => (
                  
                  <div class="col-md-4">
                  <div class="card mb-4 box-shadow">
                    <img class="card-img-top" src={actor.img} alt="Card image cap"/>
                    <div class="card-body">
                      <h3>{actor.name}</h3>
                      <h5><Badge style={{marginRight:"0.5em"}} color = "dark"> Age :</Badge>{actor.age}</h5>
                      <h5><Badge style={{marginRight:"0.5em"}} color = "dark"> Home Town :</Badge>{actor.location}</h5>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                         
                          <button onClick={()=>this.deleteActor(actor)} type="button" class="btn btn-sm btn-outline-danger">Delete</button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              
                ))
              }
                  </div>
                </div>
              </div>
            </div>
            )
        }
      }
}

// function mapStateToProps(state){
//   return{
//     singers: state.favoriteSingerReducer,
//     actors: state.favoriteActorReducer
//   }
// }

// function mapDispatchToProps(dispatch){
//   return {
//     getFavoriteActors: bindActionCreators(getFavoriteActors,dispatch),
//     getFavoriteSingers: bindActionCreators(getFavoriteSingers,dispatch),
//     deleteFavoriteSinger:bindActionCreators(deleteFavoriteSinger,dispatch),
//     deleteFavoriteActor:bindActionCreators(deleteFavoriteActor,dispatch)
//   }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
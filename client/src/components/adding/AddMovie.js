import axios from "axios"
import React, { useState } from 'react'
import {  Badge } from 'reactstrap';
import InputItem from '../tools/InputItem';




export default function AddMovie() {
  const [movie,setMovie] = useState({})
  
  function changeHandler(event){
    const {name,value} = event.target
    setMovie(({
      ...movie,
      [name]:value
    }))
  }

 

  const addMovie = (movie) => {
    const token = localStorage.getItem("token")

    let config = {
      headers: {
          authorization:token
      }
    }

    axios.post("http://localhost:5000/mong/profile/movies/add_movie",movie,config)
    .then(()=> {
      
      window.location.assign("/movies")
    })
    .catch(err=>{
      console.log(err)
    })


  }

  function saveHandler(event){

    addMovie(movie)
    event.preventDefault()
  }

  const token = localStorage.getItem("token")
    if(!token){
        
        return (
            <div style={{marginBottom:"29em"}}>
                <div className="alert alert-danger">You are not allowed to access this page please get yourself authorized</div>
                <h3 style={{color:"white"}}>Page Not Found 404</h3>
            </div>
            
            
        )}
  
  return (
    <div style={{marginTop:"6em"}}>
      <Badge style={{padding:"0.5em"}} color = "danger"><h4 style={{color:"white"}}>Add Movie</h4></Badge>
      <br/>
      <br/>
       <form onSubmit = {saveHandler}>
        <InputItem onChange={changeHandler} value = {movie.img} label = "IMG" name ="img" placeholder="Enter Image URL"/>
        <br/>
        <InputItem onChange={changeHandler} value = {movie.name} label="NAME" name="name"  placeholder="Enter Movie Name"/>
        <br/>
        <InputItem onChange={changeHandler} value = {movie.cast} label ="CAST" name ="cast"  placeholder="Enter Cast"/>
        <br/>
        <InputItem onChange={changeHandler} value = {movie.director} label ="DIRECTOR" name ="director"  placeholder="Enter Director"/>
        <br/>
        <InputItem onChange={changeHandler} value = {movie.date} label ="DATE" name ="date"  placeholder="Enter Date"/>
        <br/>
        <InputItem onChange={changeHandler} value = {movie.imdb} label ="IMDB" name ="imdb"  placeholder="Enter IMDB Point"/>
        <br/>
        <button type="submit" className="btn btn-danger">
        Save
        </button>
        </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   addMovie
// }

// export default connect(null,mapDispatchToProps)(AddMovie)


import axios from "axios"
import React, { useState } from 'react'
import {  Badge } from 'reactstrap';

import InputItem from '../tools/InputItem';




export default function AddSong() {
  const [song,setSong] = useState({})
  
  function changeHandler(event){
    const {name,value} = event.target
    setSong(({
      ...song,
      [name]:value
    }))
  }

  const addSong = (song) =>{

    const token = localStorage.getItem("token")

    let config = {
      headers: {
          authorization:token
      }
    }
    axios.post("http://localhost:5000/mong/profile/songs/add_song",song,config)
    .then(() => {
      
      window.location.assign("/songs")
    })
    .catch(err =>{
      console.log(err)
    })

  }

  function saveHandler(event){
    addSong(song)
    
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
      <Badge style={{padding:"0.5em"}} color = "dark"><h4 style={{color:"white"}}>Add Song</h4></Badge>
      <br/>
      <br/>
       <form onSubmit = {saveHandler}>
        <InputItem onChange={changeHandler} value = {song.img} label = "IMG" name ="img" placeholder="Enter Image URL" />
        <br/>
        <InputItem onChange={changeHandler} value = {song.name} label="NAME" name="name"  placeholder="Enter Song Name"/>
        <br/>
        <InputItem onChange={changeHandler} value = {song.singer} label ="SINGER/GROUP" name ="singer"  placeholder="Enter Singer/Group"/>
        <br/>
        <InputItem onChange={changeHandler} value = {song.album} label ="ALBUM" name ="album"  placeholder="Enter Album"/>
        <br/>
        <InputItem onChange={changeHandler} value = {song.date} label ="DATE" name ="date"  placeholder="Enter Date"/>
        <br/>
        <InputItem onChange={changeHandler} value = {song.viewsOnYoutube} label ="VIEWS" name ="viewsOnYoutube"  placeholder="Enter Views on Youtube"/>
        <br/>
        <button type="submit" className="btn btn-danger">
        Save
        </button>
        </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   addSong
// }

// export default connect(null,mapDispatchToProps)(AddSong)


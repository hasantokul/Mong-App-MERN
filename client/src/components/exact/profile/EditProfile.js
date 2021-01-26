import React, { useState,useEffect } from "react";
import { Button, Form, FormGroup, Label, Input,  } from 'reactstrap';
import axios from "axios"

export default function EditProfile(){
  
  
  const [profile,setProfile] = useState({})
  const [file,setFile] = useState()



  
  
  useEffect(() => {

    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }

    axios.get("http://localhost:5000/mong/profile/info",config)
    .then(res => {
      const user = res.data.user
      setProfile({...user})
    }).catch(err => console.log(err))
  },[])
  
  const onImageChange = event => {
    
      const img = event.target.files[0];
      
        setFile(img)
    };

  const onInfoChange = event => {
    const {name,value} = event.target;
    setProfile(prev =>({
      ...prev,
      [name]:value
    }))

  }

  const editProfile = (profile) =>{
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token
      }
    }
    axios.put(`http://localhost:5000/mong/profile/edit_profile`,profile,config)
    
  }

  const changeImg = (file) =>{

    const data = new FormData();
    
    data.append('file',file);
    
       
    const token = localStorage.getItem("token")

      let config = {
      headers: {
          authorization:token,
          
          
      }
    }
    
    axios.put("http://localhost:5000/mong/profile/image_upload",data,config).then(res => {
      console.log(res)
    })
  }

  const submitHandler = event => {
    
    editProfile(profile)
    
    changeImg(file)
    
    

    
    window.location.assign("/home")
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
      <div>
        <form enctype="multipart/form-data" onSubmit={submitHandler} style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
        <img style={{border:"6px solid #ddd",borderRadius:"4px"}} width = "35%" height = "auto" src = {profile.img}></img>
          <FormGroup row>
            
            <Label style={{color:"white", fontSize:"1.5em"}} ><strong>Name</strong></Label>
            <Input onChange={onInfoChange} name="name" value={profile.name} type="text" />

            <Label style={{marginTop:"1em", color:"white", fontSize:"1.5em"}} for="examplePassword" ><strong>Age</strong></Label>
            <Input onChange={onInfoChange} name="age" value={profile.age} type="text"  />
            
            <Label style={{marginTop:"1em", color:"white", fontSize:"1.5em"}} for="examplePassword" ><strong>Business</strong></Label>
            <Input onChange={onInfoChange} name="business" value={profile.business} type="text"  />
            
            <Label style={{marginTop:"1em", color:"white", fontSize:"1.5em"}} for="exampleText" ><strong>Country/City</strong></Label>
            <Input onChange={onInfoChange} name="location" value={profile.location} type="text" name="location" />

            <Label style={{marginTop:"1em", color:"white", fontSize:"1.5em"}}  for="exampleText" ><strong>Summary</strong></Label>
            <Input onChange={onInfoChange} value={profile.summary} name="summary" type="textarea"  />
            
            <Label style={{marginTop:"1em", color:"white", fontSize:"1.2em"}} for="exampleFile" ><strong>Profile Image</strong></Label>
            <Input accept=".jpg, .png, .jpeg" onChange={onImageChange} style={{color:"white", fontSize:"1.2em"}} type="file" name="file" id="exampleFile" />
            <br></br>
            
            
            <Button color="danger" type="submit" style={{marginTop:"1em"}}>Save</Button>

          </FormGroup>
        </form>
      </div>
    );
  }


import React, { Component } from 'react'
import {Table,Badge,Button} from "reactstrap"
import {Link} from "react-router-dom"
import axios from "axios"


export default class Songs extends Component {

    state = {
        searchedSong:null,
        songs:[]

    }

    getSongs(){
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        let config = {
        headers: {
            authorization:token
        }
    }
        axios.get(`http://localhost:5000/mong/users/user/${userId}/songs`,config)
        .then(res =>{
            
            this.setState({songs:res.data.songs})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    

    componentDidMount(){
        this.getSongs()
        
      }
    
   

    render() {

        const token = localStorage.getItem("token")
        if(!token){
        
        return (
            <div style={{marginBottom:"29em"}}>
                <div className="alert alert-danger">You are not allowed to access this page please get yourself authorized</div>
                <h3 style={{color:"white"}}>Page Not Found 404</h3>
            </div>
            
            
        )}
        
        return (
            <div style={{marginBottom:"29em", overflowX:"auto"}}>
            <br></br>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h4 style = {{color:"white"}}>Songs List </h4><br></br>
            
            </div>
            <form className="form-inline my-2 my-lg-0">
            <Badge style ={{width:"7em", height:"3em"}} color = "dark"><h4>Search</h4></Badge>
            <input onChange={e => this.setState({searchedSong:e.target.value})} value = {this.searchedSong} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
            
            </form>

            <Table dark>
            <thead>
                <tr>
                    <th>Song</th>
                    <th>Name</th>
                    <th>Singer</th>
                    <th>Album</th>
                    <th>Date</th>
                    <th>Youtube Views</th>
                    
                    
                </tr>
            </thead>
            <tbody >

                {   
                    this.state.songs
                   ?this.state.songs.filter(song =>{
                        if(this.state.searchedSong === null){
                            return song
                        }
                        else if(song.name.toLowerCase().includes(this.state.searchedSong.toLowerCase())){
                            return song
                        }
                    })
                    .map(song => (
                    <tr>
                    
                    <td><img width="100em" height = "auto" src = {song.img}></img></td>
                    <td>{song.name}</td>
                    <td>{song.singer}</td>
                    <td>{song.album}</td>
                    <td>{song.date}</td>
                    <td>{song.viewsOnYoutube}</td>
                    
                    
                    </tr>
                    )):null
                }
            </tbody>
            </Table>
            </div>
        )
    }
}


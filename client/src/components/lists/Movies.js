import {Badge, Table,Button} from "reactstrap"
import axios from "axios"
import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Movies extends Component {

    state = {
        searchedMovie : null,
        movies:[]
    }

    getMovies(){
        const token = localStorage.getItem("token")

        let config = {
        headers: {
            authorization:token
        }
    }
        axios.get("http://localhost:5000/mong/profile/movies",config)
        .then(res =>{
            
            this.setState({movies:res.data.movies})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    deleteMovie=(movie)=>{
        const token = localStorage.getItem("token")

        let config = {
        headers: {
            authorization:token
            }
        }
        axios.delete(`http://localhost:5000/mong/profile/movies/delete_movie/${movie._id}`,config)
        .then(res => {
            window.location.reload()
            
        })
    }

    componentDidMount(){
        
        this.getMovies()
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
            <div style={{marginBottom:"29em",overflowX:"auto"}}>
                <br></br>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h4 style = {{color:"white"}}>Movies List </h4><br></br>
            <Link to="add_movie"><a class = "btn btn-danger">+ Add New</a></Link> 
            </div>
            
            
            <form className="form-inline my-2 my-lg-0">
            <Badge style ={{height:"3em"}} color = "dark"><h4>Search</h4></Badge>
            <input onChange={e => this.setState({searchedMovie:e.target.value})} value = {this.searchedMovie} className="form-control" type="search" placeholder="Search" aria-label="Search"/>
            
            </form>

            <Table dark>
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Name</th>
                    <th>Actors&Actresses</th>
                    <th>Director</th>
                    <th>Date</th>
                    <th>IMDB</th>
                    <th></th>
                    
                </tr>
            </thead>
            <tbody >

                {   
                    this.state.movies
                    ?this.state.movies.filter(movie =>{
                        if(this.state.searchedMovie === null){
                            return movie
                        }
                        else if(movie.name.toLowerCase().includes(this.state.searchedMovie.toLowerCase())){
                            return movie
                        }
                    }).map(movie => (
                         
                        
                    <tr>
                    
                    <td><img width = "75%" height = "auto" src = {movie.img}></img></td>
                    <td>{movie.name}</td>
                    <td>{movie.cast}</td>
                    <td>{movie.director}</td>
                    <td>{movie.date}</td>
                    <td>{movie.imdb}</td>
                    <td><Button onClick={()=> this.deleteMovie(movie)} color="danger">Delete</Button></td>
                
                    </tr>
                    ))
                    :null
                }
            </tbody>
            </Table>
            </div>
        )
    }
}

// export function mapDispatchToProps(dispatch){
//     return {
//         actions : {
//             getMovies : bindActionCreators(getMovies,dispatch),
//             deleteMovie : bindActionCreators(deleteMovie,dispatch)
//         }
//         }
//     }
  

// function mapStateToProps(state){
//     return {
//         movies : state.moviesListReducer
//     }
// }



// export default connect(mapStateToProps,mapDispatchToProps)(Movies)

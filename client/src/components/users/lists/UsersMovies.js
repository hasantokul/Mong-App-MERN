import { Badge, Table, Button } from "reactstrap";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = {
    searchedMovie: null,
    movies: [],
  };

  getMovies() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    let config = {
      headers: {
        authorization: token,
      },
    };
    axios
      .get(`http://localhost:5000/mong/users/user/${userId}/movies`, config)
      .then((res) => {
        this.setState({ movies: res.data.movies });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const token = localStorage.getItem("token");
    if (!token) {
      return (
        <div style={{ marginBottom: "29em" }}>
          <div className="alert alert-danger">
            You are not allowed to access this page please get yourself
            authorized
          </div>
          <h3 style={{ color: "white" }}>Page Not Found 404</h3>
        </div>
      );
    }

    return (
      <div style={{ marginBottom: "29em", overflowX: "auto" }}>
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ color: "white" }}>Movies List </h4>
          <br></br>
        </div>

        <form className="form-inline my-2 my-lg-0">
          <Badge style={{ height: "3em" }} color="dark">
            <h4>Search</h4>
          </Badge>
          <input
            onChange={(e) => this.setState({ searchedMovie: e.target.value })}
            value={this.searchedMovie}
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Name</th>
              <th scope="col">Actors&Actresses</th>
              <th scope="col">Director</th>
              <th scope="col">Date</th>
              <th scope="col">IMDB</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies
              ? this.state.movies
                  .filter((movie) => {
                    if (this.state.searchedMovie === null) {
                      return movie;
                    } else if (
                      movie.name
                        .toLowerCase()
                        .includes(this.state.searchedMovie.toLowerCase())
                    ) {
                      return movie;
                    }
                  })
                  .map((movie) => (
                    <tr>
                      <td>
                        <img width="100em" height="auto" src={movie.img}></img>
                      </td>
                      <td>{movie.name}</td>
                      <td>{movie.cast}</td>
                      <td>{movie.director}</td>
                      <td>{movie.date}</td>
                      <td>{movie.imdb}</td>
                    </tr>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

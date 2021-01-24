import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import Info from "../profile/Info"
import Favorites from '../profile/Favorites'
import {Switch,Route, Router} from "react-router-dom"
import Songs from "../lists/Songs"
import Movies from '../lists/Movies'
import EditProfile from "../profile/EditProfile"
import AddMovie from '../adding/AddMovie'
import AddSong from '../adding/AddSong'
import AddSinger from '../adding/AddSinger'
import AddActor from '../adding/AddActor'
import LoginForm from "../auth/LoginForm"
import Register from "../auth/Register"
import Users from '../lists/Users'
import VerifyEmail from '../auth/VerifyEmail'
import ChangePassword from '../auth/ChangePassword'
import VerifyRegister from "../auth/VerifyRegister"

export default class Body extends Component
{
    render()
    {
        return (
        <div style = {{marginTop:"1em"}}>

            
            
            <Container>
                    <Route path = "/verify_registration" exact component = {VerifyRegister}></Route>
                    <Route path = "/change_password" exact component = {ChangePassword}></Route>
                    <Route path = "/verify_email" exact component = {VerifyEmail}></Route>
                    <Route path = "/search/users" exact component = {Users}></Route>
                    <Row>
                    <div style={{marginTop:"3em"}} className="col-lg-5">
                    <Route path = "/" exact component = {LoginForm}></Route>
                    </div >
                    <div className="col-lg-2">
                        
                    </div>
                    <div style={{ marginTop:"3em",marginBottom:"1.5em"}} className="col-lg-5">
                    <Route path = "/" exact component = {Register}></Route>
                    </div>



                    <div class="col-lg-3"> 
                        <Route path = "/home" exact component = {Info}></Route>
                        <Route path = "/songs" exact component = {Info}></Route>
                        <Route path = "/movies" exact component = {Info}></Route>
                        <Route path = "/add_movie" exact component = {Info}></Route>
                        <Route path = "/add_song" exact component = {Info}></Route>
                        <Route path = "/edit_profile" exact component = {Info}></Route>
                        <Route path = "/add_singer" exact component = {Info}></Route>
                        <Route path = "/add_actor" exact component = {Info}></Route>
                    </div>
                    <div class="col-lg-1">
                    </div>
                    <div class="col-lg-8">
                    <Switch>
                        <Route path = "/home" exact component = {Favorites}></Route>
                        <Route path = "/songs" exact component = {Songs}></Route>
                        <Route path = "/movies" exact component = {Movies}></Route>
                        <Route path = "/add_movie" exact component = {AddMovie}></Route>
                        <Route path = "/add_song" exact component = {AddSong}></Route>
                        <Route path = "/edit_profile" exact component = {EditProfile}></Route>
                        <Route path = "/add_singer" exact component = {AddSinger}></Route>
                        <Route path = "/add_actor" exact component = {AddActor}></Route>

                    </Switch>
                    </div>
                </Row>
            </Container>
            
        </div>
		)
	}
}

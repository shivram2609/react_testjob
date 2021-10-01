//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Logout from './Logout';

class App extends Component {
	
	render() {
		return (
				<Router>
					<div className="App">
					<Switch>
						<Route exact path="/register" component={Registration} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/edit-profile" component={EditProfile} />
						<Redirect from="/" to="login" />
						<Redirect from="/logout" component={Logout}/>
					</Switch>
					</div>
				</Router>
		);
	}
}
export default App;
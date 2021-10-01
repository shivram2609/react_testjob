//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  

import Axios from 'axios';

class Logout extends Component {
	
    componentWillMount() {
		if (localStorage.getItem("token")!=null)
		{
			localStorage.removeItem("token")
			//this.props.history.push('/login')
		}
		else
		{
			//this.props.history.push('/login')			
		}
		
	}
	

  
}
export default Logout;

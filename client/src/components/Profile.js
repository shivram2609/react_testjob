//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  
import Axios from 'axios';

class Profile extends Component {
	
	constructor (props) {
    super (props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
	  password: '',
      gender: '',
      phone: '',
      result: '',	  
	  successDiv: '',
	  errorDiv: '',
      register: false,
      error: false,
	  data: [],
	  formErrors: {}
    };
	this.initialState = this.state;
	
  }
  
	componentDidMount() {
	
	  Axios.get(window.api+'profile/',{
		  headers:{
			  "x-access-token": localStorage.getItem("token")
	  }}).then((res) => {
			
			if(res.data.code==300)
			{
				localStorage.removeItem("id")
				localStorage.removeItem("token")
			    localStorage.setItem("errormsg","Session out.Login again")
				 this.props.history.push('/login')
			}
			else
			{		
				console.log(res.data)
				let setProds=res.data.success[0]
				this.setState({ data: setProds })

			}
		})
	}
	
	//Logout
	logOut = (e) => {
				localStorage.removeItem("id")
				localStorage.removeItem("token")
			    localStorage.setItem("successmsg","Session out.Login again")				
				this.props.history.push('/login')      
    }
	
     
render() {    
    let items = [this.state.data];

  return (

<div id="wrapper"> 
	<ul class="sidebar navbar-nav">
		<li><a class="navbar-brand mr-1 logo-one" href="javascript:void(0)">{items[0].first_name}</a></li>

		<li class="nav-item icon-changes "> <a class="nav-link " href="javascript:void(0)"> <i class="fa fa-tachometer" aria-hidden="true"></i>   <span>Dashboard </span> </a>
		</li>
		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)"> <i class="fa fa-home" aria-hidden="true"></i> <span>Home</span> </a>

		</li>
		<li class="nav-item active "> <a class="nav-link" href="/profile"><i class="fa fa-user" aria-hidden="true"></i> <span>Profile </span> </a> </li>



		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)" > <i class="fa fa-wrench" aria-hidden="true"></i>
		<span>Setting</span> </a>

		</li>
		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)" onClick={this.logOut}> <i class="fa fa-sign-out" aria-hidden="true"></i>
		 <span>Logout</span> </a>
		 </li>
	</ul>
  
  <div id="content-wrapper">
    <div class="container-fluid"> 
      <nav class="navbar navbar-expand navbar-dark bg-dark static-top"> 
		<button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#"> <i class="fas fa-bars"></i> </button>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"> profile </li>
		</ol>
       
  
	  </nav>
     
     <div class="profile">
     
     <div class="row">
     <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="img/images.jpg" alt=""/>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {items[0].first_name} {items[0].last_name}
                                    </h5>
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Address</a>
                                </li>
                            </ul>
                            <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Name:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p> {items[0].first_name}  {items[0].last_name}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p> {items[0].phone}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{items[0].username}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Gender:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{items[0].gender}</p>
                                            </div>
                                        </div>
                                       
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>City:</label>
                                            </div>
											 <div class="col-md-6">
                                                <p>{items[0].city}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>State:</label>
                                            </div>
											 <div class="col-md-6">
                                                <p>{items[0].state}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Country</label>
                                            </div>
											 <div class="col-md-6">
                                                <p>{items[0].country}</p>
                                            </div>
                                           
                                        </div>
                                        
                                        </div>
                                        
                                        </div>
                               
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                        <a class="profile-edit-btn" href="/edit-profile" >Edit Profile</a>
                    </div>
                    </div>
                     
                    
              
            </form>           
        </div>
     
     </div>
     
   
      
      </div>>
  
  </div>
  <footer class="sticky-footer col-md-12 small-footer">
    <div class="my-auto">
      <div class="copyright text-left my-auto"> <span>Copyright © 2021 Abc  All rights reserved. </span> </div>
    </div>
  </footer>
</div>

</div>


  );
}
}
export default Profile;

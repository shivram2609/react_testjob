//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  
import Axios from 'axios';
import ReactSession from '../ReactSession';



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
	this.onValueChange = this.onValueChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);


  }

	 onValueChange(event) {
		this.setState({
		  selectedOption: event.target.value
		});
	  }
	onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });

  }
	
    
	handleSubmit = (e) => {    
        e.preventDefault();    
		
       if (this.handleFormValidation()) {
		   const { first_name, last_name,phone,username,password, gender } = this.state; 

            	Axios.post('http://localhost:3001/register', {first_name, last_name,phone,username,password, gender 
			}).then((response)=>{
				if(response.data.code===400){
					
					this.setState({errorDiv: response.data.failed});
				}
				else
				{
						this.setState({errorDiv: response.data.success});
				}
			});   
			   
	   }
           
          
    }    
	handleFormValidation() {   
	
        const { last_name, first_name, phone, username, password } = this.state;    
        let formErrors = {};    
        let formIsValid = true;   
    
           
        if (!first_name) {    
            formIsValid = false;
			this.setState({firstNameErr: "Name is required."});
            formErrors["firstNameErr"] = "Name is required.";    
        }    
		if (!last_name) {    
            formIsValid = false;    
            formErrors["lastNameErr"] = "Name is required.";    
        }  
        //Email    
        if (!username) {    
            formIsValid = false;    
            formErrors["emailIdErr"] = "Email id is required.";    
        }    
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username))) {    
    
            formIsValid = false;    
            formErrors["emailIdErr"] = "Invalid email id.";    
        }    
		//Password    
        if (password === '' ) {    
            formIsValid = false;    
            formErrors["passwordErr"] = "Password is required.";    
        }
		else
		{
			if(password.lenght<8)
			{
				formIsValid = false;    
				formErrors["passwordErr"] = "Please enter atleast 8 characters"; 
			}
		}		
        
    
        //Phone number    
        if (!phone) {    
            formIsValid = false;    
            formErrors["phoneNumberErr"] = "Phone number is required.";    
        }    
       /* else {    
            var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
            if (!mobPattern.test(phone)) {    
                formIsValid = false;    
                formErrors["phoneNumberErr"] = "Invalid phone number.";    
            }    
        }    */
    
        this.setState({ formErrors: formErrors });  
			
        return formIsValid;    
    }  
render() {    
    
	const { phoneNumberErr, emailIdErr, passwordErr, firstNameErr, lastNameErr } = this.state.formErrors;   
	
	const {successDiv,errorDiv} = this.state; 
  return (

<div id="wrapper"> 
	<ul class="sidebar navbar-nav">
		<li><a class="navbar-brand mr-1 logo-one" href="#">ABC</a></li>

		<li class="nav-item icon-changes "> <a class="nav-link " href=""> <i class="fa fa-tachometer" aria-hidden="true"></i>   <span>Dashboard </span> </a>
		</li>
		<li class="nav-item "> <a class="nav-link " href="#"> <i class="fa fa-home" aria-hidden="true"></i> <span>Home</span> </a>

		</li>
		<li class="nav-item active "> <a class="nav-link" href=""><i class="fa fa-user" aria-hidden="true"></i> <span>Profile </span> </a> </li>



		<li class="nav-item "> <a class="nav-link " href="#" > <i class="fa fa-wrench" aria-hidden="true"></i>
		<span>Setting</span> </a>

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
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        Kshiti Ghelani
                                    </h5>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
                                    
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
                                                <p>Kshiti123</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>kshitighelani@gmail.com</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Gender:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Female</p>
                                            </div>
                                        </div>
                                       
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>City:</label>
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>State:</label>
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Country</label>
                                            </div>
                                           
                                        </div>
                                        
                                        </div>
                                        
                                        </div>
                               
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
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

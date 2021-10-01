//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  
import Axios from 'axios';

class EditProfile extends Component {
	
	constructor (props) {
    super (props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
	  password: '',
      gender: '',
      phone: '',
	  city: '',
	  state: '',
	  country: '',
      result: '',	  
	  successDiv: '',
	  errorDiv: '',
	  errorshowing :false,
	  successhowing:false,
      register: false,
      error: false,
	  data: [],
	  formErrors: {}
    };
	this.initialState = this.state;
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleSubmitAddress = this.handleSubmitAddress.bind(this);

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
				const user = res.data.success;
			
				this.setState({
					first_name: user[0].first_name,
					last_name: user[0].last_name,
					phone: user[0].phone,
					username: user[0].username,
					city: user[0].city,
					state: user[0].state,
					country: user[0].country,
				});
				

			}
		})
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
		let state="";
       if (this.handleFormValidation()) {
		   const { first_name, last_name,phone,username } = this.state; 

            	Axios.post(window.api+'editprofile', {first_name, last_name,phone,username 
			},{
		  headers:{
			  "x-access-token": localStorage.getItem("token")
			}}).then((response)=>{
				if(response.data.code===400){					 
					this.setState({errorDiv: response.data.failed,errorshowing : true,successshowing: false});
				}
				else
				{					 
					this.setState({successDiv: response.data.success,successshowing: true,errorshowing : false});
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
	 
	 
	 handleSubmitAddress = (e) => {    
        e.preventDefault();    
		
       if (this.handleFormValidationAddress()) {
		   const { city, state,country} = this.state; 

            	Axios.post(window.api+'editaddress', {city, state,country
			},{
		  headers:{
			  "x-access-token": localStorage.getItem("token")
			}}).then((response)=>{
				if(response.data.code===300){
					
					this.setState({successDiv: response.data.success,successshowing: false,errorshowing : true});
				}
				else
				{
					this.setState({successDiv: response.data.success,successshowing: true,errorshowing : false});
				}
			});   
			   
	   }
    }    
	handleFormValidationAddress() {   
	
        const { city, state, country} = this.state;    
        let formErrors = {};    
        let formIsValid = true;   
    
           
        if (!city) { 		
            formIsValid = false;
            formErrors["cityErr"] = "City is required.";    
        }    
		if (!state) {    
            formIsValid = false;    
            formErrors["stateErr"] = "State is required.";    
        }  
        //Email    
        if (!country) {    
            formIsValid = false;    
            formErrors["countryErr"] = "Country is required.";    
        } 
    
        this.setState({ formErrors: formErrors });  
			
        return formIsValid;    
    }  
	
	 
	 
	 //File upload
	  state = {
 
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ image: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
     formData.append("profile_image", this.state.image);
	 
     Axios.post(window.api+'uploadprofileimage', formData,{
		   headers:{
			  "x-access-token": localStorage.getItem("token")
			}
		  
	  }).then((response)=>{
				if(response.data.code===300){
					
					this.setState({successDiv: response.data.success,successhowing: false,errorshowing : true});
				}
				else
				{
					this.setState({successDiv: response.data.success,successhowing: true,errorshowing : false});
				}
			});   
    };
	 
	
	 
	 
	 //Logout
	 
	logOut = (e) => {
	localStorage.removeItem("id")
				localStorage.removeItem("token")
			    localStorage.setItem("successmsg","Successfully logout")
				 this.props.history.push('/login')
      
    } 
	 
	 
	 
render() {    
    let items = [this.state.data];
	const { phoneNumberErr, emailIdErr,firstNameErr, lastNameErr, cityErr, stateErr, countryErr } = this.state.formErrors;   	
	const {successDiv,errorDiv} = this.state;
	const { successhowing,errorshowing  } = this.state;
  return (

<div id="wrapper"> 
	<ul class="sidebar navbar-nav">
		<li><a class="navbar-brand mr-1 logo-one" href="javascript:void(0)">{this.state.first_name}</a></li>

		<li class="nav-item icon-changes "> <a class="nav-link " href="javascript:void(0)"> <i class="fa fa-tachometer" aria-hidden="true"></i>   <span>Dashboard </span> </a>
		</li>
		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)"> <i class="fa fa-home" aria-hidden="true"></i> <span>Home</span> </a>

		</li>
		<li class="nav-item active "> <a class="nav-link" href="/profile"><i class="fa fa-user" aria-hidden="true"></i> <span>Profile </span> </a> </li>



		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)" > <i class="fa fa-wrench" aria-hidden="true"></i>
		<span>Setting</span> </a>

		</li>
		<li class="nav-item "> <a class="nav-link " href="javascript:void(0)" onClick={this.logOut} > <i class="fa fa-sign-out" aria-hidden="true"></i>
		 <span>Logout</span> </a>
		 </li>
	</ul>
  
  <div id="content-wrapper">
    <div class="container-fluid"> 
      <nav class="navbar navbar-expand navbar-dark bg-dark static-top"> 
		<button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="/profile"> <i class="fas fa-bars"></i> </button>
		<ol class="breadcrumb">
			<li class="breadcrumb-item"> profile </li>
		</ol>
       
  
	  </nav>
     
     <div class="profile">
     
     <div class="row">
     <div class="container emp-profile">
            
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
							
								<img src="img/images.jpg" alt=""/>
								<div class="file btn btn-lg btn-primary">
									Edit Photo
									<input type="file" name="profile_image" id="profile_image" onChange={this.onFileChange} />
								</div>
								<div class="file btn btn-lg btn-primary mt-1">								
									<button type="submit" name="file" onClick={this.onFileUpload} >Upload Photo</button>
								</div>
								
							
                        </div>
                    </div>
					
                    <div class="col-md-6">
					
                        <div class="profile-head">
                                    <h5>
                                       {this.state.first_name} 
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
							<div class="form-group error" style={{ display: (errorshowing ? 'block' : 'none') }}>{errorDiv}</div>
							<div class="form-group success" style={{ display: (successhowing ? 'block' : 'none') }}>{successDiv}</div>
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
										<form onSubmit={this.handleSubmit}>
											<div class="row">
												<div class="col-md-6">
													<label>First Name:</label>
												</div>
												<div class="col-md-6">
												   <input type="text" value={this.state.first_name}  onChange={this.onChange}  name="first_name" id="first_name" class="form-control" placeholder="First Name" className={firstNameErr ? ' showError' : ''} />  {firstNameErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{firstNameErr}</div> }
												</div>
											</div>
											 <div class="row">
												<div class="col-md-6">
													<label>Last Name:</label>
												</div>
												<div class="col-md-6">
												   <input type="text" onChange={this.onChange} value={this.state.last_name} name="last_name" id="last_name" class="form-control" placeholder="Last Name" className={lastNameErr ? ' showError' : ''} />  {lastNameErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{lastNameErr}</div> }
												</div>
											</div>
											<div class="row">
												<div class="col-md-6">
													<label>Phone:</label>
												</div>
												<div class="col-md-6">
													<input type="text" onChange={this.onChange} value={this.state.phone} name="phone" id="phone" class="form-control" placeholder="Phone Number" className={phoneNumberErr ? ' showError' : ''} />  {phoneNumberErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{phoneNumberErr}</div> }

												</div>
											</div>
											<div class="row">
												<div class="col-md-6">
													<label>Email</label>
												</div>
												<div class="col-md-6">
												 <input type="text" onChange={this.onChange} value={this.state.username}name="username" id="username" class="form-control" placeholder="Email Id" className={emailIdErr ? ' showError' : ''} />  {emailIdErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{emailIdErr}</div> }

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
											<div class=" update-brn">
												<div class="col-md-6">
													<input type="submit" name="submit" class="btn btn-info " value="Update &amp; Save" />
												</div>											
											</div>
										</form>	
                                       
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
									<form onSubmit={this.handleSubmitAddress}>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>City:</label>
                                            </div>
											 <div class="col-md-6">
												<input type="text" onChange={this.onChange} value={this.state.city} name="city" id="city" class="form-control" placeholder="city"className={cityErr ? ' showError' : ''} />  {cityErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div> }
                                               
                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>State:</label>
                                            </div>
											 <div class="col-md-6">
                                             <input type="text" onChange={this.onChange} value={this.state.state} name="state" id="state" class="form-control" placeholder="State" className={stateErr ? ' showError' : ''} />  {stateErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{stateErr}</div> }

                                            </div>
                                            
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Country</label>
                                            </div>
											 <div class="col-md-6">
                                             <input type="text" onChange={this.onChange} value={this.state.country} name="country" id="country" class="form-control" placeholder="Country" className={countryErr ? ' showError' : ''} />  {countryErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{countryErr}</div> }

                                            </div>
                                           
                                        </div>
                                        <div class=" update-brn">
											<div class="col-md-6">
												<input type="submit" name="submit" class="btn btn-info " value="Update &amp; Save" />
											</div>
											
										</div>
									</form>	
                                        </div>
                                        
                                        </div>
                               
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                      
                    </div>
                    </div>
                     
                    
              
           
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
export default EditProfile;

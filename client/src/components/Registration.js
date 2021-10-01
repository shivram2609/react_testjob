//import logo from './logo.svg';
import '../App.css';
import React, { Component } from "react";  
import Axios from 'axios';

class Registration extends Component {
	
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
	  errorshowing :false,
	  successshowing:false,
      register: false,
      error: false,
	  data: [],
	  formErrors: {}
    };
	this.initialState = this.state;
	this.onValueChange = this.onValueChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);


  }

	 onValueChange(e) {
		  this.setState({
      gender: e.target.value
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

            	Axios.post(window.api+'register', {first_name, last_name,phone,username,password, gender 
			}).then((response)=>{
				if(response.data.code===400){
					
					this.setState({successDiv: response.data.success,successshowing: false,errorshowing : true});
				}
				else
				{
					this.setState({successDiv: response.data.success,successshowing: true,errorshowing : false});
				}
			});   
			   
	   }
           
          
    }    
	handleFormValidation() {   
	
        const { last_name, first_name, phone, username, password,gender } = this.state;    
        let formErrors = {};    
        let formIsValid = true;   
    
           
        if (!first_name) {    
            formIsValid = false;			
            formErrors["firstNameErr"] = "First Name is required.";    
        }    
		if (!last_name) {    
            formIsValid = false;    
            formErrors["lastNameErr"] = "Last Name is required.";    
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
			if(password.length<8)
			{
				formIsValid = false;    
				formErrors["passwordErr"] = "Please enter atleast 8 characters"; 
			}
		}		
         //Phone number    
        if (!gender) {    
            formIsValid = false;    
            formErrors["genderErr"] = "Select gender.";    
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
    
	const { phoneNumberErr, emailIdErr, passwordErr, firstNameErr, lastNameErr,genderErr } = this.state.formErrors;   
	const { successshowing,errorshowing  } = this.state;
	const {successDiv,errorDiv} = this.state; 
  return (
<div class="gradline-cot">
	<div class="login-cot">
		<div class="container">
	 
			<div id="login-row" class="row justify-content-center align-items-center ">
	   
				<div class="row bg-login">     
 
					<div id="login-column" class="col-md-6 ">
						<div id="login-box" >
								<form onSubmit={this.handleSubmit}> 
										<div class="form-group error" style={{ display: (errorshowing ? 'block' : 'none') }}>{errorDiv}</div>
										<div class="form-group success" style={{ display: (successshowing ? 'block' : 'none') }}>{successDiv}</div>
										<div class="form-group">
											<input type="text" value={this.state.first_name}  onChange={this.onChange}  name="first_name" id="first_name" class="form-control" placeholder="First Name" className={firstNameErr ? ' showError' : ''} />  {firstNameErr &&  <div style={{ color: "red", fontSize: 12 }}>{firstNameErr}</div> }{this.state.formErrors["email"]}
										</div>
										<div class="form-group">
											<input type="text" value={this.state.last_name}   onChange={this.onChange}  name="last_name" id="last_name" class="form-control" placeholder="Last Name" className={lastNameErr ? ' showError' : ''} />  {lastNameErr &&  <div style={{ color: "red", fontSize: 12}}>{lastNameErr}</div> }
										</div>
									   
										<div class="form-group">
											<input type="text" value={this.state.phone}    onChange={this.onChange}  name="phone" id="phone" class="form-control" placeholder="Phone No" className={phoneNumberErr ? ' showError' : ''} />  {phoneNumberErr &&  <div style={{ color: "red", fontSize: 12 }}>{phoneNumberErr}</div> }
										</div>
										<div class="form-group">
											<input type="text" value={this.state.username}   onChange={this.onChange}  name="username" id="username" class="form-control" placeholder="Email id" className={emailIdErr ? ' showError' : ''} />  {emailIdErr &&  <div style={{ color: "red", fontSize: 12 }}>{emailIdErr}</div> }
											
										</div>
										<div class="form-group">
											<input type="password"  value={this.state.password} onChange={this.onChange} name="password" id="password" class="form-control" placeholder="Password" className={passwordErr ? ' showError' : ''} />  {passwordErr &&  <div style={{ color: "red", fontSize: 12 }}>{passwordErr}</div> }
											
										</div>
										<div class="gender">
												<label>Gender</label>
												<label class="radio-inline">
												<input type="radio" value="Male"  onChange={this.onValueChange}  name="optradio"  />M    </label>
												<label class="radio-inline">
												<input type="radio" value="Female"  onChange={this.onValueChange}  name="optradio" />F
												</label>
												{genderErr &&  <div style={{ color: "red", fontSize: 12 }}>{genderErr}</div> }
										</div>
										<div class="form-group login-btn-cot">
											<div class="row">
												<div class="col-md-12">
													<input type="submit"  name="submit" class="btn btn-info " value="Sign Up" />
												</div>
											
											</div>   
										</div>
								 
								</form>
						</div>
					</div>
					<div class="col-md-6"><img  src="img/img22.png" alt="" class="img-fluid user-imaes" /> </div>

				</div>
			</div>	
		</div>
	</div>
</div>		
		

  );
}
}
export default Registration;

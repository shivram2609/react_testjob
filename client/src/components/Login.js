import '../App.css';
import React, { Component } from "react";  
import Axios from 'axios';

class Login extends Component {
	
	constructor (props) {
    super (props);
    this.state = {      
      username: '',
	  password: '',     
	  successDiv: '',
	  errorDiv: '',
      register: false,
      error: false,
	  errorshowing :false,
	  successhowing:false,
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
	
    componentDidMount() {
		
		if (localStorage.getItem("errormsg") == null && localStorage.getItem("successmsg") == null)
		{
			if (localStorage.getItem("token") != null) 
			{
				Axios.get(window.api+'isUserAuth/',{
					headers:{
				  "x-access-token": localStorage.getItem("token")
				}}).then((res) => {
					if(res.data.auth){
						 this.props.history.push('/profile')
					}	
				})
			}
		}
		else
		{
			if (localStorage.getItem("errormsg") != null)
			{
				const errormsg=localStorage.getItem("errormsg")			
				this.setState({errorDiv: errormsg,errorshowing : true})
				localStorage.removeItem("errormsg")
			}
			else
			{
				const successmsg=localStorage.getItem("successmsg")			
				this.setState({successDiv: successmsg,successhowing : true})
				localStorage.removeItem("successmsg")
			}
		}
		
		
	}
	
	
	
	
	handleSubmit = (e) => {    
        e.preventDefault();    
		
       if (this.handleFormValidation()) {
		   const { username,password } = this.state; 

            	Axios.post(window.api+'login', {username,password
			}).then((response)=>{
				if(!response.data.auth){					
					this.setState({errorDiv: response.data.message});
				}
				else
				{
					localStorage.setItem("token",response.data.token)
					this.props.history.push('/profile')				
				}
			});   
			   
	   }
           
          
    }    
	handleFormValidation() {   
	
        const {username, password } = this.state;    
        let formErrors = {};    
        let formIsValid = true;   
    
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
		
    
        this.setState({ formErrors: formErrors });  
			
        return formIsValid;    
    }  
render() {    
    
	const {  emailIdErr, passwordErr } = this.state.formErrors;   
	const { successhowing,errorshowing  } = this.state;
	const {successDiv,errorDiv} = this.state; 
  return (
<div class="gradline-cot">
	<div class="login-cot">
		<div class="container">
	 
			<div id="login-row" class="row justify-content-center align-items-center ">
	   
				<div class="row bg-login">     
					<div class="col-md-6"><img  src="img/img-11.png" alt="" class="img-fluid user-imaes" /> </div>
					<div id="login-column" class="col-md-6 ">
						<div id="login-box" >
							 <form onSubmit={this.handleSubmit}> 
								<div class="form-group error" style={{ display: (errorshowing ? 'block' : 'none') }}>{errorDiv}</div>
								<div class="form-group success" style={{ display: (successhowing ? 'block' : 'none') }}>{successDiv}</div>		
                            
								<div class="form-group">
											<input type="text" value={this.state.username}   onChange={this.onChange}  name="username" id="username" class="form-control" placeholder="Email id" className={emailIdErr ? ' showError' : ''} />  {emailIdErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{emailIdErr}</div> }
											
								</div>
								<div class="form-group">
									<input type="password"  value={this.state.password} onChange={this.onChange} name="password" id="password" class="form-control" placeholder="Password" className={passwordErr ? ' showError' : ''} />  {passwordErr &&  <div style={{ color: "red", paddingBottom: 10 }}>{passwordErr}</div> }
									
								</div>
								<div class="form-group login-btn-cot">
								<div class="row">
								<div class="col-md-6">
									<input type="submit" name="submit" class="btn btn-info " value="Login"/>
									</div>
									<div class="col-md-6">
									<a href="/register" class="btn btn-info" >Sign Up</a>
									</div>
									</div>
									<div class="social-icon">
									
										<ul>
											<li> <a href=""><i class="fa fa-google" aria-hidden="true"></i></a>
											</li>
											<li> <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
											</li>

											<li> <a href=""><i class="fa fa-linkedin"></i></a>
											</li>
										</ul>

									</div>
									
								</div>
                             
							</form>
						</div>
					</div>

				</div>
			</div>	
		</div>
	</div>
</div>		
		

  );
}
}
export default Login;

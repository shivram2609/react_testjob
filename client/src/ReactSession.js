//import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React, {useState} from 'react';
function App() {
	
	const [usernameReg,setUsernameReg]=useState("");
	const [passwordReg,setPasswordReg]=useState("");
	const [phoneReg,setPhoneReg]=useState("");
	const [lnameReg,setLastnameReg]=useState("");
	const [fnameReg,setFristnameReg]=useState("");
	const [genderReg,setGenderReg]=useState("");
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	
	
    const errorDiv = error 
        ? <div className="error">
            <i class="material-icons error-icon"></i>
            {error}
          </div> 
        : '';
	const successDiv = result 
        ? <div className="success">
            <i class="material-icons error-icon"></i>
            {result}
          </div> 
        : '';	
	const register=()=>{
		  
			Axios.post('http://localhost:3001/register', {
				username:usernameReg,
				password:passwordReg,
				phone:phoneReg,
				last_name:lnameReg,
				first_name:fnameReg,
				gender:genderReg,
			}).then((response)=>{
				if(response.data.code==400){
					setResult(null);
					setError(response.data.failed)
				}
				else
				{
					setError(null);
					setResult(response.data.success)
				}
			});
		 
	};
	
  return (
<div class="gradline-cot">
	<div class="login-cot">
		<div class="container">
	 
			<div id="login-row" class="row justify-content-center align-items-center ">
	   
				<div class="row bg-login">     
 
					<div id="login-column" class="col-md-6 ">
						<div id="login-box" >
										<div class="form-group">
										{errorDiv}{successDiv}
										</div>
										<div class="form-group">
											<input type="text" required onChange={(e)=>{setFristnameReg(e.target.value);}} name="first_name" id="first_name" class="form-control" placeholder="First Name" />
										</div>
										<div class="form-group">
											<input type="text"required  onChange={(e)=>{setLastnameReg(e.target.value);}} name="last_name" id="last_name" class="form-control" placeholder="Last Name" />
										</div>
									   
										<div class="form-group">
											<input type="text"  required onChange={(e)=>{setPhoneReg(e.target.value);}} name="phone" id="phone" class="form-control" placeholder="Phone No"/>
										</div>
										<div class="form-group">
											<input type="email" required onChange={(e)=>{setUsernameReg(e.target.value);}} name="username" id="username" class="form-control" placeholder="Email id"/>
											
										</div>
										<div class="form-group">
											<input type="password" required onChange={(e)=>{setPasswordReg(e.target.value);}} name="password" id="password" class="form-control" placeholder="Password"/>
											
										</div>
										<div class="gender">
												<label>Gender</label>
												<label class="radio-inline">
												<input type="radio"value="M" onChange={(e)=>{setGenderReg(e.target.value);}} name="optradio" checked />M    </label>
												<label class="radio-inline">
												<input type="radio" value="F" onChange={(e)=>{setGenderReg(e.target.value);}} name="optradio" />F
												</label>
										</div>
										<div class="form-group login-btn-cot">
											<div class="row">
												<div class="col-md-12">
													<input type="submit" onClick={register} name="submit" class="btn btn-info " value="Sign Up" />
												</div>
											
											</div>   
										</div>
								 
								
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

export default App;

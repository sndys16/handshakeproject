import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';



class Companysignup extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            mail : "",
            password : "",
            location : "",
            signuptype:false,
            authFlag:false

        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.nameChangeHandler=this.nameChangeHandler.bind(this);
        this.mailChangeHandler=this.mailChangeHandler.bind(this);
        this.passwordChangeHandler=this.passwordChangeHandler.bind(this);
        this.locationChangeHandler=this.locationChangeHandler.bind(this);
        this.headingmethod=this.headingmethod.bind(this);
        this.signmethodtype=this.signmethodtype.bind(this);
        this.changeMethod=this.changeMethod.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    nameChangeHandler(e) {
        this.setState({ name: e.target.value });
      }
      
      mailChangeHandler(e) {
        this.setState({ mail: e.target.value });
      }
      passwordChangeHandler(e){
        this.setState({ password: e.target.value });
      }
      locationChangeHandler(e){
        this.setState({ location : e.target.value });
      }
      
    onSignUp(e){
        e.preventDefault();
        if(this.state.signuptype)
        {
            const data = {
                "name" : this.state.name,
                "mail" : this.state.mail,
                "password" : this.state.password,
                "location" : this.state.location
            }
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3000/company/companysignup', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    console.log(response.status);
                    
                         sessionStorage.setItem('loggedintype', 'company')
                         sessionStorage.setItem('companyid' , response.data.companyid)

                    this.setState({
            
                
                         authFlag : true
                    })
                    alert('success');
                } else if(response.data === 'mail already exists'){
                    this.setState({
                        authFlag : true
                    })
                    alert('mail already exists');
                }
                else{
                    this.setState({
                        authFlag : false
                    })
                    alert("Signup Failed. Please try again!");

                }
            })
            .catch(err => {
                console.log(err);
                alert("Signup Failed. Please try again!");
                this.setState({
                    authFlag : false
                })
                
            })
        }
    
    else
    {
        const data = {
            mail : this.state.mail,
            password : this.state.password  
        }
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3000/company/companysignin', data)
        .then(response => {
            console.log("Response Status: " + response.status);
            if(response.status === 200){
                console.log(response.status);
                sessionStorage.setItem('loggedInType', 'company')
                         sessionStorage.setItem('companyid' , response.data.companyid)
                this.setState({
                    authFlag : true
                    
                })
                alert("successful signin");
            } else if(response.data === 'incorrect password'){
                this.setState({
                    authFlag : false
                })
                alert("incorrect password");
            }
            else{
                this.setState({
                    authFlag : false
                })
                alert("Signin Failed. Please try again!");

            }
        })
        .catch(err => {
            console.log(err);
            alert("Signin Failed. Please try again!");
            this.setState({
                signupcheck : false
            })
            
        })
    }
    }
    headingmethod()
    {
        if(this.state.signuptype)
        {
            return ( <h2>Company sign Up</h2>)
        }
        else
        {
            return ( <h2>Company sign In</h2>)
        }

    }
    signmethodtype()
    {
        if(this.state.signuptype)
        {
            return ( 
                <div>
      
      <div class="form-label-group">
                    <input type="text" name="name" id="name" onChange={this.namechangeHandler} class="form-control" placeholder="Student name" required/> 
                    </div><br/><br/>
                    <div class="form-label-group">
                    <input type="text" name="location" id="location" onChange={this.locationchangeHandler} class="form-control" placeholder="Location" required/> 
                    </div><br/><br/>
                    <div class="form-label-group">
                    <input type="password" name="confirmpassword" id="confirmpassword" onChange={this.changeHandler} class="form-control" placeholder=" confirm Password" required/>
    
                    </div><br/><br/>
    <button onClick={this.onSignUp} class="btn btn-success" type="submit">Sign up</button><br/>
      <a onClick = {this.changeMethod}>  Already a Member? Sign In </a><br/>
    
    </div>


            )
        }
        else
        {
            return(
                <div>
                    <button onClick={this.onSignUp} class="btn btn-success" type="submit">Sign In</button><br/>
                    <a onClick = {this.changeMethod}>  No a Member? Sign Up </a>
                    </div>
            )

            
        }

    }
    changeMethod()
    {
        this.setState({
            signuptype : !this.state.signuptype
        });
    }

    
    render() {
        let redirectVar = null;
        if(this.authFlag)
        {
            redirectVar = <Redirect to="/Compaanylandingpage" />;

        }


        return (
            <div>
            {redirectVar}
             <div class="container">
        <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
        
        <div class="card-body">
        <h5 class="card-title text-center"> {this.headingmethod()}</h5>
        <form class="form-signin" onSubmit={this.onSubmit}>
            <div class="form-label-group">
            <input type="email" name="mail" id="mail" onChange={this.mailChangeHandler} class="form-control" placeholder="Mail Id" required/>
            
            </div><br/><br/>
            <div class="form-label-group">
            <input type="text" name="password" id="password" onChange={this.changeHandler} class="form-control" placeholder="Password" required/>
            
            </div><br/><br/>
            {this.signmethodtype()}
            <br/><br/>
          

        </form>
        
        </div>
        </div> 
        </div>
        </div> 
        </div> 
        </div> 
        )
    }


}

export default Companysignup;

import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        sessionStorage.clear();
    }

    render()
    {
        let navLogin=null;
    
        if(sessionStorage.getItem("loggedintype")==="company")
        {
            navLogin=
            (
                <div>
                <nav class="navbar navbar-expand-sm bg-danger navbar-dark fixed-top">
	            <div class="container">
                <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item"><Link to="/UserLogin"><button type="button" class="btn btn-danger" id = "userLogin">Login</button></Link></li>
                <li class="nav-item"><Link to="/UserSignUp"><button type="button" class="btn btn-danger" id = "userSignUp">Signup</button></Link></li>
                </ul>
                </div>
	            </div>
	            </nav>
            </div>
    
            );
        }
        else if(sessionStorage.getItem("loggedintype")==="student")
        {
            navLogin=
            (
                
                <ul class="nav navbar-nav navbar-right">
                <li>student</li>
                <li>student profile</li>
                </ul>
    
            );
        
        }
        else
            {
                 navLogin=null;
            }
       
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
      if(sessionStorage.getItem("loggedintype")!="company" || sessionStorage.getItem("loggedintype")!="student")
      {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        
        
        
        
            let redirectVar = null;
            return(
            <div>
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Hand Shake</a>
                    </div>
                    
                    {navLogin}
                </div>
            </nav>
        </div>
        )

    
    }
}


export default Navbar;
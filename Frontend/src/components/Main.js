import React, {Component} from 'react';
import {Route} from 'react-router-dom';
//import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Companylandingpage from './Companylandingpage/Companylandingpage';
import Companysignup from './Companysignup/Companysignup';
import Studentsignup from './Studentsignup/Studentsignup';
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/Studentsignup" component={Studentsignup}/>
                <Route path="/Companysignup" component={Companysignup}/>
                <Route path="/Companylandingpage" component={Companylandingpage}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;
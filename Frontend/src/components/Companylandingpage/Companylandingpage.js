import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Home extends Component {
    constructor(){
        super();
        this.state = {  
            jobdetails : []
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        const data = {
            companyid : sessionStorage.getItem("companyid")
          
        }
        axios.post('http://localhost:3000/company/getalljobs',data)
                .then((response) => {
                    console.log(response)
                //update the state with the response data
                this.setState({
                    jobdetails : this.state.jobdetails.concat(response.data) 
                });
            });
    }

    render(){
        
        //iterate over books to create a table row
        let details = this.state.jobdetails.map(jobdetails => {
            return(
                <tr>
                    <td>{jobdetails.companyid}</td>
                    <td>{jobdetails.title}</td>
                    <td>{jobdetails.postingdate}</td>
                    <td>{jobdetails.applicationdeadline}</td>
                    <td>{jobdetails.location}</td>
                    <td>{jobdetails.salary}</td>
                    <td>{jobdetails.jobdescription}</td>
                    <td>{jobdetails.jobcategory}</td>
                </tr>
            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        if(sessionStorage.getItem("loggedintype")==="company"){
            redirectVar = <Redirect to= "/Companysignup"/>
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All jobs</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>companyid</th>
                                    <th>title</th>
                                    <th>postingdate</th>
                                    <th>applicationdeadline</th>
                                    <th>location</th>
                                    <th>salary</th>
                                    <th>jobdescription</th>
                                    <th>jobcategory</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {details}
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}
//export Home Component
export default Home;
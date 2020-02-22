import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
class Delete extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            BookID : "",
            authFlag : 0,
        }
        //Bind the handlers to this class
        this.BookIDChangeHandler = this.BookIDChangeHandler.bind(this);
       
    }
    BookIDChangeHandler = (e) => {
        this.setState({
            BookID : e.target.value
        })
    }
    submitDelete = (e) => {
        // eslint-disable-next-line 
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.BookID,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.data === "success"){
                    this.setState({
                        authFlag :1,
            
                    })
                }else{
                    this.setState({
                        authFlag :2,
                    
                    })
                }
            });
    }
    render(){
        let redirectval=null;
        let random=null;
        if(!cookie.load('cookie'))
        {
            redirectval = <Redirect to ='login' />
        }
        if(this.state.authFlag===1)
        {
          redirectval = <Redirect to ='/home' />
        }
        if(this.state.authFlag===2)
        {
          random= <p> ID doesn't exists </p>
        }
        return(
            <div>
                {redirectval}
            <div class="container">
            <form action="http://127.0.0.1:3000/delete" method="post">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                    <button onClick = {this.submitDelete} class="btn btn-primary">Delete</button>  
                        </div> 
                    {random}
                </form>
            </div>
            </div>
        )
    }
}

export default Delete;
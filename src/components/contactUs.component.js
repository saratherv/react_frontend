import React, { Component } from 'react';
import axios from 'axios';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          message: '',
          isLoading : false
        }
      }

      handleSubmit(e){
        this.setState({ isLoading : true })
        e.preventDefault();
        axios({
          method: "POST",
          url:"https://fathomless-spire-11158.herokuapp.com/leads/add",
          data:  this.state
        }).then((response)=>{
          if (response.data.success === true) {
            this.setState({ isLoading : false })
            alert("Message Sent.");
            this.resetForm()
          } else if (response.data.success === false) {
            if(response.data.message.includes("duplicate key error")){
            alert("Message failed to send duplicate email id")
            }
            else{
              alert("Message failed to send." + response.data.message)
            }
            this.setState({ isLoading : false })
          }
        })
      }
    
      resetForm(){
        this.setState({name: "", email: "", message: ""})
      }

  render() {
    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>{this.props.title}</h3></div>
        <div className="card-body">
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" rows="5" maxlength="500" minlength="10" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          {this.state.isLoading === true ?
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div> 
                                      :
          <button type="submit" className="btn btn-primary">Submit</button>
  }
        </form>
      </div>
      </div>
    )
  }

  onNameChange(event) {
    this.setState({name: event.target.value})
}

onEmailChange(event) {
    this.setState({email: event.target.value})
}

onMessageChange(event) {
    this.setState({message: event.target.value})
}
}
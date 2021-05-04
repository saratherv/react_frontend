import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


export default class Admin extends Component {
    constructor(props) {
        super(props);  
        this.state = {
          leads: [],
          isLoading : false
        }
      }
    
    componentDidMount() {
      this.setState( { isLoading : true })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://fathomless-spire-11158.herokuapp.com/leads", requestOptions)
          .then(response => response.json())
          .then(result => {
            this.setState( { isLoading : false })
            if(result["success"] === true){
              this.setState({
                leads : result["data"]
              })
            }
          })
          .catch(error => console.log('error', error));
    }

  render() {
    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
          {this.state.isLoading === true ?
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div> 
                                      :
          <BootstrapTable data={ this.state.leads } pagination search={true}>
              <TableHeaderColumn dataField='name' isKey={ true }></TableHeaderColumn>
              <TableHeaderColumn dataField='email'></TableHeaderColumn>
              <TableHeaderColumn dataField='message'></TableHeaderColumn>
          </BootstrapTable>
          }
      </div>
    )
  }

}
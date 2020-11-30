import React, { Component } from 'react'
import {AuthContext} from '../../context/AuthContext';
import DataService from '../../services/DataService';

class Protect1 extends Component {
    static contextType = AuthContext;  //<--- This is how u use context in Class Component

    state = {
        data: ""
    }

    //......API call to the server
    componentDidMount() {
        DataService.fetchData().then(jsonData =>{
            console.log("..fetch data..")
            if(jsonData.data)
                this.setState({data: jsonData.data})
            else
                window.location.reload()  //<--- Refresh the page if found no data (coz user is not authenticated or not verified)
        })
    }

    render() {
        return (
            <div className = "text-center">
                <h1>Hello, {this.context.user.role}</h1>
                <p>Here is your data: {this.state.data}</p>
            </div>
        )
    }
}
export default Protect1
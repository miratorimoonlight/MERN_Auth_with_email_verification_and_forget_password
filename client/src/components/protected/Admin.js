import React, { Component } from 'react'
import DataService from '../../services/DataService';


export default class Admin extends Component {
    state = {
        data: ""
    }

    componentDidMount() {
        DataService.fetchAdminData().then(jsonData => {
            if(jsonData.data)
                this.setState({data: jsonData.data})
            else
                window.location.reload() //<--- refresh page coz no data comes which means user not authenticated
        })
    }

    render() {
        return (
            <div className="text-center">
                <h3>This is admin page...</h3>
                <p>Admin data is {this.state.data}</p>
            </div>
        )
    }
}


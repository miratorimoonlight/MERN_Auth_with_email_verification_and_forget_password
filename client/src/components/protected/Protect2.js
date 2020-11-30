import React, { Component } from 'react'
import DataService from '../../services/DataService';

class Protect2 extends Component {
    state = {
        data: ""
    }

    //API call to server
    componentDidMount() {
        console.log("mount component")
        DataService.fetchData().then(jsonData =>{
            if(jsonData.data)
                this.setState({data: jsonData.data})
            else
                window.location.reload()  //<--- Refresh the page coz no data comes
        })
    }

    render() {
        return (
            <div className = "text-center">
                <h3>Another protected Page</h3>
                <p>Here is your data: {this.state.data}</p>
            </div>
        )
    }
}
export default Protect2
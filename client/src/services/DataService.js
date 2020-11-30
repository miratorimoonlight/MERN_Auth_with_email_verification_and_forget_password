const DataService = {
    fetchData: function() {
        return fetch("http://localhost:5000/protectedData", {credentials: 'include'})
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(jsonData => jsonData)
                    else
                        return {data: ""}
                })
    },
    fetchAdminData: function() {
        return fetch("http://localhost:5000/admin/protectedData", {credentials: 'include'})
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(jsonData => jsonData)
                    else
                        return {data: ""}
                })
    }
}

export default DataService
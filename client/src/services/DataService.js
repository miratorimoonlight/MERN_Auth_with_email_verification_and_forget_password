const DataService = {
    fetchData: function() {
        return fetch("/api/protectedData", {credentials: 'include'})
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(jsonData => jsonData)
                    else
                        return {data: ""}
                })
    },
    fetchAdminData: function() {
        return fetch("/api/admin/protectedData", {credentials: 'include'})
                .then(res => {
                    if(res.status !== 401)
                        return res.json().then(jsonData => jsonData)
                    else
                        return {data: ""}
                })
    }
}

export default DataService
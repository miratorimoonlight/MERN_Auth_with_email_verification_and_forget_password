//A bunch of API call to the server (all are async functions)
const AuthService = {
    login: function(userInfo) {
        return fetch("/api/login", 
            {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }).then(res => {
                if(res.status !== 401)
                    return res.json().then(jsonData => jsonData)
                else
                    return {isAuthenticated: false, user:{email:"", role:""}}
            })
        
    },

    register: function (userInfo) {
        return fetch("/api/register", 
            {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    },

    logout: function() {
        return fetch("/api/logout", 
            {
                credentials: 'include'
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    },

    isAuthenticated: function() {
        return fetch("/api/authenticated", 
            {
                credentials: 'include'
            })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(jsonData => jsonData)
                else
                    return {isAuthenticated: false, user: {email:"", role:""}}
            })
    },

    //............Email Verification Related.............//
    activateAcc: function(activationToken) {
        return fetch("/api/activateAcc", 
            {
                method: 'POST',
                body: JSON.stringify({activationToken}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    },

    sendNewVerificationLink: function() {
        return fetch("/api/sendNewVerificationLink",
            {
                method: 'POST',
                credentials: 'include',
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    },

    //............Forgot Password Related.............//
    forgotPassword: function(email) {
        return fetch("/api/forgotPassword",
            {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    },
    
    resetPassword: function(userInput) {
        const {password, resetToken} = userInput;
        return fetch("/api/resetPassword",
            {
                method: 'POST',
                body: JSON.stringify({password, resetToken}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(jsonData => jsonData)
    }

}

export default AuthService
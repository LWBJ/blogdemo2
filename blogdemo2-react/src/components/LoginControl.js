import React from 'react'
import MainDisplay from './Display/MainDisplay.js'
import Header from './Header.js'

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            responseOK: null,
        }
    }
    
    handleLogin(values) {
        if(this.state.username) {
            return null
        }
        
        let url = 'http://127.0.0.1:8000/apidata/token'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })
        .then(res => res.json() )
        .then(data => {
            if (data.refresh) {
                localStorage.setItem('refreshToken', data.refresh)
                this.setState({
                    username: data.username,
                    responseOK: <p>Login success!</p>,
                })
            } else {
                this.setState({responseOK: <p className='text-danger'>Username or password incorrect</p>})
            }
        })
        .then(res => {
            setTimeout(() => this.setState({responseOK: null}) , 3000)
        })
        .catch(err => {
            alert('Oops, something went wrong')
        })
    }
    
    handleLogout() {
        this.setState({username: null})
        localStorage.removeItem('refreshToken')
    }
    
    async checkAuth() {
        let url = 'http://127.0.0.1:8000/apidata/token-refresh'
        let result = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refresh: localStorage.getItem('refreshToken')}),
        })
        .then(res => res.json())
        .then(data => (data.access ? data.access : null))
        .catch(err => {
            alert('Oops, something went wrong')
        })
        
        return result
    }
    
    async componentDidMount() {
        let access = await this.checkAuth()
        if (access) {
            let url = 'http://127.0.0.1:8000/apidata/current-user'
            fetch(url, {
                headers: {'Authorization': `Bearer ${access}`}
            })
            .then(res => res.json())
            .then(data => {
                this.setState({username: data.username})
            })
            .catch(err => {
                alert('Oops, something went wrong')
            })
        } else {
            this.handleLogout()
        }
    }
    
    render() {        
        return(
          <div>
            <Header 
              handleLogin = {values => this.handleLogin(values)}
              handleLogout = {() => this.handleLogout()}
              username = {this.state.username}
              responseOK = {this.state.responseOK}
            />
            
            <MainDisplay username={this.state.username} checkAuth={()=> this.checkAuth()} handleLogout={()=>this.handleLogout()}/>
          </div>
        )
    }
}

export default LoginControl
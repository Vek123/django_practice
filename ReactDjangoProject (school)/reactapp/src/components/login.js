import React from "react"
import Header from "./header"
import '../css/auth.css'
import apiClient from "../api/apiConfig"


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errorAuth: null,
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.authenticate(this.state.username, this.state.password, () => {window.location.href = "/"})
    }
    authenticate(u, p, goToHome) {
      const data = {
        username: u,
        password: p
      }
      apiClient.post("/auth/token/login/", data)
      .then(async response => {
        localStorage.setItem("User", JSON.stringify(response.data))
        goToHome()
      })
      .catch(error => {
        console.error(error)
      })
    }
    render() {
        return (
            <div id="login">
                <Header title={this.props.title} user={this.props.user}/>
                <form method="post" name="login_form" onSubmit={this.handleSubmit}>
                    <p>
                    <input type="text" name="username" maxLength="50" required placeholder="Логин" onChange={this.handleChange}/>
                    </p>
                    <hr/>
                    <p>
                    <input type="password" name="password" maxLength="50" required placeholder="Пароль" onChange={this.handleChange}/>
                    </p>
                    <hr/>
                    <p>
                    <button type="submit">Войти</button>
                    </p>
                    {this.state.errorAuth && (<p>{this.state.errorAuth}</p>)}
                </form>
            </div>
        )
    }
}

export default Login
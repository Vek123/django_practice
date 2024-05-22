import React from "react"
import Header from "./header"
import '../css/auth.css'
import axios from "axios"


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errorAuth: undefined
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
    authenticate(u, p, callback) {
        const data = {
          username: u,
          password: p
        }
        axios.post("http://127.0.0.1:8000/auth/token/login/", data)
        .then(response => {
          const Token = response.data.auth_token
          localStorage.setItem("Token", Token)
        //   console.log(response)
          axios.get("http://127.0.0.1:8000/auth/users/", {
            headers: {
              'Authorization': `Token ${Token}`
            }
          })
          .then(response => {
            localStorage.setItem("User", JSON.stringify(response.data))
            // console.log(response)
            callback()
          })
          .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
            } else if (error.request) {
            console.log("network error");
            } else {
            console.log(error);
            }
        })
        })
        .catch((error) => {
          if (error.response) {
              console.log(error.response);
              this.setState({errorAuth: error.response.data.non_field_errors[0]})
              console.log("server responded");
          } else if (error.request) {
          console.log("network error");
          } else {
          console.log(error);
          }
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
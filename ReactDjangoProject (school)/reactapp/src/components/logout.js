import React from "react"
import axios from "axios"
import Header from "./header"


class Logout extends React.Component {

    logout() {
        const token = localStorage.getItem("Token")
        axios.post("http://127.0.0.1:8000/auth/token/logout/", {}, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            localStorage.clear()
            window.location.href = "/"
        })
        .catch((error) => {
            localStorage.clear()
            if (error.response) {
                console.log(error.response);
                window.location.href = "/"
                console.log("server responded");
            } else if (error.request) {
            console.log("network error");
            } else {
            console.log(error);
            }
        })
    }

    componentDidMount() {
        this.logout()
    }

    render() {
        return (
            <div>
                <Header title={this.props.title}/>
                <h2>Вы выполнили выход из системы</h2>
            </div>
        )
    }
}

export default Logout
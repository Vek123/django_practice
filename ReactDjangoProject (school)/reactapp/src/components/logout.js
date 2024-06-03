import React from "react"
import Header from "./header"
import apiClient from "../api/apiConfig"


class Logout extends React.Component {

    logout() {
        apiClient.post("/auth/token/logout/")
        .then(response => {
            localStorage.clear()
            window.location.href = "/"
        })
        .catch((error) => {
            localStorage.clear()
            console.error(error)
            window.location.href = "/"
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
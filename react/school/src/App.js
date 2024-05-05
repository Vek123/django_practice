import React from "react"
import News from "./components/news"
import Home from "./components/home"
import Reports from "./components/reports"
import Forms from "./components/forms"
import Login from "./components/login"
import Logout from "./components/logout"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


class App extends React.Component {
  
  render() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home title="Школа"/>}/>
                <Route path="/news" element={<News title="Новости"/>}/>
                <Route path="/reports" element={<Reports title="Отчёты"/>}/>
                <Route path="/forms" element={<Forms title="Формы"/>}/>
                <Route path="/user/login" element={<Login title="Авторизация"/>}/>
                <Route path="/user/logout" element={<Logout title="Выход из системы"/>}/>
            </Routes>
        </Router>
    )
  }

  // authenticate(u, p, callback) {
  //   const data = {
  //     username: u,
  //     password: p
  //   }
  //   axios.post("http://127.0.0.1:8000/auth/token/login/", data)
  //   .then(response => {
  //     const Token = response.data.auth_token
  //     localStorage.setItem("Token", Token)
  //     axios.get("http://127.0.0.1:8000/auth/users/", {
  //       headers: {
  //         'Authorization': `Token ${Token}`
  //       }
  //     })
  //     .then(response => {
  //       localStorage.setItem("User", JSON.stringify(response.data[0]))
  //       callback()
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //           console.log(error.response);
  //           console.log("server responded");
  //       } else if (error.request) {
  //       console.log("network error");
  //       } else {
  //       console.log(error);
  //       }
  //   })
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //         console.log(error.response);
  //         console.log("server responded");
  //     } else if (error.request) {
  //     console.log("network error");
  //     } else {
  //     console.log(error);
  //     }
  // })
  // }
  
}

export default App
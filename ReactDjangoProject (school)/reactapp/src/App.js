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
}

export default App
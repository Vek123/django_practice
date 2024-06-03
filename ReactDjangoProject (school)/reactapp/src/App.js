import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"

const News = lazy(() => import("./components/news"))
const Home = lazy(() => import("./components/home"))
const Reports = lazy(() => import("./components/reports"))
const Forms = lazy(() => import("./components/forms"))
const Login = lazy(() => import("./components/login"))
const Logout = lazy(() => import("./components/logout"))


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
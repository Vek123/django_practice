import React from 'react'
import { Helmet } from 'react-helmet'

class Header extends React.Component {
    user = JSON.parse(localStorage.getItem("User"))

    nav_menu = [
        {title: "Новости", link: "/news"},
        {title: "Отчёты", link: "/reports"},
        {title: "Формы", link: "/forms"}
    ]

    showLogin() {
        
        if (this.user) {
            return (
                <li>{ this.user.first_name || this.user.username } | <a href="/user/logout">Выйти</a></li>
            )
        }
        else {
            return (
            <li><a href="/user/login">Войти</a></li>
        )
        }
    }

    render() {
      return (
        <div>
            <Helmet>
                <title>{this.props.title}</title>
            </Helmet>
            <div className="background"></div>
            <div className="header">
                <h1><a href="/">МБОУ СОШ №6</a></h1>
                <nav>
                    <ul>
                        {this.nav_menu.map((item, index) => (
                            <li key={index}><a href={item.link}>{item.title}</a></li>
                        ))}
                        {this.showLogin()}
                    </ul>
                </nav>
            </div>
        </div>
      )
    }
}

export default Header

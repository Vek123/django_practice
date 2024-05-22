import React from 'react'
import Header from './header'
import logo from './../img/desktop1.jpeg'

class Home extends React.Component {

  render() {
    return (
      <div className='news'>
          <Header title={this.props.title} user={this.props.user}/>
          <h1>{this.props.title}</h1>
          <img className='school-img' src={logo} alt='Логотип школы'/>
      </div>
    )
  }
}

export default Home
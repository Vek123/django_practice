import React from 'react'
import Header from './header'

class News extends React.Component {

    render() {
      return (
        <div>
            <Header title={this.props.title}/>
            <h1>{this.props.title}</h1>
        </div>
      )
    }
}

export default News
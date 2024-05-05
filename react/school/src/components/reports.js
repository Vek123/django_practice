import React from "react"
import Header from "./header"
import axios from 'axios'
import '../css/reports.css'

const apiUrl = "http://127.0.0.1:8000/api/v1/reports"

class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
    axios.get(apiUrl).then((res) => {
      this.setState({data: [res.data]})
    })
  }
    render() {
      return (
        <div>
            <Header title={this.props.title}/>
            <h1>{this.props.title}</h1>
              {this.state.data.length > 0 && (
              <div>
                <ul id="main-ul">
                <li><div className="li-title">Отчёт 1:</div><div className="answer">Самый младший первоклассник: {this.state.data[0].earliest_birthday_first_class_guy.second_name} {this.state.data[0].earliest_birthday_first_class_guy.name} {this.state.data[0].earliest_birthday_first_class_guy.last_name}, его дата рождения: {this.state.data[0].earliest_birthday_first_class_guy.birthday}</div></li>
                <li><div className="li-title">Отчёт 2:</div><div className="answer">Количество учеников во всех вторых классах: {this.state.data[0].count_guys_in_second_classes}</div></li>
                <li><div className="li-title">Отчёт 3:</div><div className="answer"><ul>{this.state.data[0].teachers_students.map((item, index) => (<li key={index}>{item.teacher__second_name} {item.teacher__name} {item.teacher__last_name} имеет {item.total} учеников в распоряжении.</li>))}</ul></div></li>
                </ul>
              </div>
              )}
        </div>
      )
    }
}


export default Reports
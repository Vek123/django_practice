import React from "react"
import Header from "./header"
import '../css/reports.css'
import apiClient from "../api/apiConfig"


class Reports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      error: false
    }
  }
  componentDidMount() {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/v1/reports")
        this.setState({data: [response.data]})
      } catch (error) {
        this.setState({error: true})
        console.log(error)
      }
    }
    fetchData()
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          <Header title={this.props.title}/>
          <h2>Error</h2>
        </div>
      )
    }
    return (
      <div>
          <Header title={this.props.title}/>
          <h1>{this.props.title}</h1>
            {this.state.data.length > 0 && (
            <div>
              <ul id="main-ul">
              <li><div className="li-title">Отчёт 1:</div><div className="answer">
                Самый младший первоклассник: {this.state.data[0].earliest_birthday_first_class_guy.second_name} {this.state.data[0].earliest_birthday_first_class_guy.name} {this.state.data[0].earliest_birthday_first_class_guy.last_name}, 
                  его дата рождения: {this.state.data[0].earliest_birthday_first_class_guy.birthday}</div></li>
              <li><div className="li-title">Отчёт 2:</div><div className="answer">
                Количество учеников во всех вторых классах: {this.state.data[0].count_guys_in_second_classes}</div></li>
              <li><div className="li-title">Отчёт 3:</div>
              <div className="answer"><ul>{this.state.data[0].teachers_students.map(
                (item, index) => (<li key={index}>{item.teacher__second_name} {item.teacher__name} {item.teacher__last_name} имеет {item.total} учеников в распоряжении.</li>))
                }</ul></div></li>
              </ul>
            </div>
            )}
      </div>
    )
  }
}


export default Reports
import React from "react"
import axios from "axios"

const apiUrl = "http://127.0.0.1:8000/api/v1/studyclasses/"

class Form2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            answer: [],
            submit: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            id: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.get(apiUrl + this.state.id + "/students/")
        .then(response => {
            this.setState({answer: response.data, submit: ""})
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
                this.setState({answer: []})
            } else if (error.request) {
            console.log("network error");
            this.setState({submit: "Ошибка отправки формы!", answer: []})
            } else {
            console.log(error);
            this.setState({submit: "Ошибка отправки формы!", answer: []})
            }
        })
    }

    classesList(classes){
        if (classes.length > 0){
            this.setState({id:classes[0].id})
        }
        return (
            <select name="study_class" required id="id_study_class" onChange={this.handleChange}>
            {classes.length > 0 && (
              classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))
            )}
          </select>
        )
    }

    render() {
        return (
            <div>
                <p><strong>Форма вывода учеников из одного класса</strong></p>
                <form method="get" name="form2" onSubmit={this.handleSubmit}>
                    <p>
                    <label htmlFor="id_study_class">Класс обучения:</label>
                    {this.classesList(this.props.classes)}
                    </p>
                    <button type="submit">Отправить</button>
                </form>
                {this.state.answer.length > 0 && (
                    <div className="answer">{
                    this.state.answer.map((item, index) => (
                        <p key={index}>{item.second_name} {item.name} {item.last_name}</p>
                    ))}
                    </div>
                )}
                {this.state.submit.length > 0 && (
                    <div className="answer">{this.state.submit}</div>
                )}
            </div>
        )
    }
}

export default Form2
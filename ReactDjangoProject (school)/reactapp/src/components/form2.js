import React from "react"
import apiClient from "../api/apiConfig"


class Form2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.classes[0].id,
            answer: [],
            submit: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            id: event.target.value
        })
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        apiClient.get(`/api/v1/studyclasses/${this.state.id}/students/`)
        .then(response => {
            this.setState({answer: response.data, submit: ""})
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log("server responded")
                this.setState({answer: [], submit:error.response})
            } else if (error.request) {
            console.log("network error")
            this.setState({submit: "Ошибка отправки формы!", answer: []})
            } else {
            console.log(error);
            this.setState({submit: "Ошибка отправки формы!", answer: []})
            }
        })
    }

    render() {
        return (
            <div>
                <h3>Форма вывода учеников из одного класса</h3>
                <form method="get" name="form2" onSubmit={this.handleSubmit}>
                    <p>
                    <label htmlFor="id_study_class">Класс обучения:</label>
                    <select name="study_class" required id="id_study_class" onChange={this.handleChange}>
                    {this.props.classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))}
                    </select>
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
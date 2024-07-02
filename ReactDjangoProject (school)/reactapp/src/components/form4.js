import React from "react"
import apiClient from "../api/apiConfig"


class Form4 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          students: [],
          id: "",
          submit: "",
          confirm_form: false
        }
    }
    componentDidMount() {
        apiClient.get("/api/v1/students/").then((res) => {
            this.setState({students: res.data})
          })
    }
    handleChange = (event) => {
        this.setState({
            id: event.target.value,
            confirm_form: false,
            submit: ""
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.id === ""){
            this.setState({id:this.state.students[0].id})
        }
        if (!this.state.confirm_form) {
            this.setState({confirm_form: "Подтвердить"})
        } else {
            this.setState({confirm_form: false})
            apiClient.delete(`/api/v1/students/${this.state.id}/`)
            .then(response => {
                this.setState({
                    submit: "Пользователь удалён!",
                    students: this.state.students.filter(student => student.id !== Number(this.state.id))
                })
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                    this.setState({submit: "Пользователь указан невено!", answer: []})
                } else if (error.request) {
                console.log("network error");
                this.setState({submit: "Ошибка отправки формы!", answer: []})
                } else {
                console.log(error);
                this.setState({submit: "Ошибка отправки формы!", answer: []})
                }
            })
        }   
    }
    render() {
        return (
            <div>
                <p><strong>Форма удаления ученика из списка</strong></p>
                <form method="post" name="form4" onSubmit={this.handleSubmit}>
                    <label htmlFor="id_id">Ученик:</label>
                    <select name="id" required id="id_id" onChange={this.handleChange}>
                        {this.state.students.length > 0 && (
                        this.state.students.map((item, index) => (<option value={item.id} key={index}>{item.second_name} {item.name} {item.last_name}</option>))
                        )}
                    </select>
                    <button type="submit">{this.state.confirm_form || "Удалить"}</button>
                </form>
                {this.state.submit.length > 0 && (
                    <div className="answer">{this.state.submit}</div>
                )}
            </div>
        )
    }
}

export default Form4
import React from "react"
import axios from "axios"


const apiUrl = "http://127.0.0.1:8000/api/v1/students/"

class Form4 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          students: [],
          id: "",
          submit: "",
          confirm_form: false
        }
        axios.get(apiUrl).then((res) => {
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
        if (!this.state.confirm_form) {
            this.setState({confirm_form: "Подтвердить"})
        } else {
            this.setState({confirm_form: false})
            axios.delete(apiUrl + this.state.id + "/")
            .then(response => {
                this.setState({
                    answer: response.data, submit: "Пользователь удалён!",
                    students: this.state.students.filter(student => student.id !== Number(this.state.id))
                })
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
    }

    studentsList(students) {
        if (students.length > 0){
            this.setState({id:students[0].id})
        }
        return (
            <select name="id" required id="id_id" onChange={this.handleChange}>
                {students.length > 0 && (
                students.map((item, index) => (<option value={item.id} key={index}>{item.second_name} {item.name} {item.last_name}</option>))
                )}
            </select>
        )
    }

    render() {
        return (
            <div>
                <p><strong>Форма удаления ученика из списка</strong></p>
                <form method="post" name="form4" onSubmit={this.handleSubmit}>
                    <label htmlFor="id_id">Ученик:</label>
                    {this.studentsList(this.state.students)}
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
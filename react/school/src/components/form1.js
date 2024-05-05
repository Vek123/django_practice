import React from "react"
import axios from "axios"


const apiUrl = "http://127.0.0.1:8000/api/v1/students/"

class Form1 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            second_name: "",
            name: "",
            last_name: "",
            birthday: "",
            study_class: "",
            submit: ""
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value

        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.myForm.reset()
        const data = {
            second_name: this.state.second_name,
            name: this.state.name,
            last_name: this.state.last_name,
            birthday: this.state.birthday,
            study_class: this.state.study_class
        }
        axios.post(apiUrl, data)
        .then(response => {
            this.setState({submit: "Запись была успешно добавлена!"})
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
                this.setState({submit: "Запись не была добавлена!"})
            } else if (error.request) {
            console.log("network error");
            this.setState({submit: "Запись не была добавлена!"})
            } else {
            console.log(error);
            this.setState({submit: "Запись не была добавлена!"})
            }
        })
    }

    classesList(classes){
        if (classes.length > 0){
            this.setState({study_class:classes[0].id})
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
                <p><h3>Форма добавления ученика</h3></p>
                <form method="post" name="form1" onSubmit={this.handleSubmit} ref={(el) => this.myForm = el}>
                    <p>
                    <input type="text" name="second_name" maxLength="50" required placeholder="Фамилия" onChange={this.handleChange}/>
                    </p>
                    <p>
                    <input type="text" name="name" maxLength="50" required placeholder="Имя" onChange={this.handleChange}/>
                    </p>
                    <p>
                    <input type="text" name="last_name" maxLength="50" placeholder="Отчество" onChange={this.handleChange}/>
                    </p>
                    <p className="p_birthday">
                    <label htmlFor="id_birthday">Дата рождения:</label>
                    <br/>
                    <input type="date" name="birthday" required id="id_birthday" onChange={this.handleChange}/>
                    </p>
                    <p>
                    <label htmlFor="id_study_class">Класс обучения:</label>
                    <br/>
                    {this.classesList(this.props.classes)}
                    </p>
                    <button type="submit">Отправить</button>
                </form>
                {this.state.submit.length > 0 && (
                    <div className="answer">{this.state.submit}</div>
                )}
            </div>
        )
    }
}

export default Form1

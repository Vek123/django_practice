import React from "react"
import axios from "axios"

const apiUrl = "http://127.0.0.1:8000/api/v1/studyclasses/"

class Form3 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            study_class: "",
            teacher_class_object: undefined,
            teacher: "",
            teachers_list: [],
            submit: ""
        }
        axios.get("http://127.0.0.1:8000/api/v1/teachers/").then((res) => {
            this.setState({teachers_list: res.data})
        })
    }
    handleChangeTeacher = (event) => {
        this.setState({
            teacher: event.target.value
        })
    }
    handleChangeStudyClass = (event) => {
        this.setState({
            study_class: event.target.value,
            teacher: this.props.classes.find(study_class => study_class.id === Number(event.target.value)).teacher
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            study_class: this.state.study_class,
            teacher: this.state.teacher
        }
        axios.patch(apiUrl + this.state.study_class + "/", data)
        .then(response => {
            this.setState({submit: "Учитель был назначен!"})
            console.log(this.props.classes.find(study_class => study_class.id === Number(this.state.study_class)))
            this.props.classes.find(study_class => study_class.id === Number(this.state.study_class)).teacher = this.state.teacher
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
                this.setState({submit: "Учитель не был назначен!"})
            } else if (error.request) {
            console.log("network error");
            this.setState({submit: "Учитель не был назначен!"})
            } else {
            console.log(error);
            this.setState({submit: "Учитель не был назначен!"})
            }
        })
    }

    classesList(classes){
        if (classes.length > 0){
            this.setState({study_class:classes[0].id})
        }
        return (
            <select name="study_class" required id="id_study_class" onChange={this.handleChangeStudyClass}>
            {classes.length > 0 && (
              classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))
            )}
          </select>
        )
    }
    teachersList(teachers){
        if (teachers.length > 0){
            this.setState({teacher:teachers[0].id})
        }
        return (
            <select name="teacher" required id="id_teacher" onChange={this.handleChangeTeacher} value={this.state.teacher}>
                {teachers.length > 0 && (
                    teachers.map((item, index) => (<option value={item.id} key={index}>{item.second_name} {item.name} {item.last_name}</option>))
                )}
            </select>
        )
    }

    render() {
        return (
            <div>
                <p><strong>Форма назначения классного руководителя для класса</strong></p>
                <form method="post" name="form3" onSubmit={this.handleSubmit}>
                    <p>
                    <label htmlFor="id_study_class">Класс обучения:</label>
                    {this.classesList(this.props.classes)}
                    </p>
                    <p>
                    <label htmlFor="id_teacher">Учитель:</label>
                    {this.teachersList(this.state.teachers_list)}
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


export default Form3

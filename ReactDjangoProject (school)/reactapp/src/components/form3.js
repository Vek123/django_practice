import React from "react"
import axios from "axios"


class Form3 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            study_class: this.props.classes[0].id,
            teacher_class_object: undefined,
            teacher: this.props.classes[0].teacher,
            teachers_list: [],
            submit: "",
            loading: true
        }
    }
    componentDidMount() {
        this.fetchTeachers()
    }

    fetchTeachers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/v1/teachers/")
            this.setState({ teachers_list: response.data, loading: false })
        } catch (error) {
            console.error(error)
        }
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
        axios.patch("http://127.0.0.1:8000/api/v1/studyclasses/" + this.state.study_class + "/", data)
        .then(response => {
            this.setState({submit: "Учитель был назначен!"})
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
    render() {
        if (this.state.teachers_list === 0) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <p><strong>Форма назначения классного руководителя для класса</strong></p>
                <form method="post" name="form3" onSubmit={this.handleSubmit}>
                    <p>
                    <label htmlFor="id_study_class">Класс обучения:</label>
                    <select name="study_class" required id="id_study_class" onChange={this.handleChangeStudyClass}>
                    {this.props.classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))}
                    </select>
                    </p>
                    <p>
                    <label htmlFor="id_teacher">Учитель:</label>
                    <select name="teacher" required id="id_teacher" onChange={this.handleChangeTeacher} value={this.state.teacher}>
                    {this.state.teachers_list.map((item, index) => (<option value={item.id} key={index}>{item.second_name} {item.name} {item.last_name}</option>))}
                    </select>
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

import React from "react"
import Header from "./header"
import axios from 'axios'
import Form1 from "./form1"
import Form2 from "./form2"
import Form3 from "./form3"
import Form4 from "./form4"

const baseApiUrl = "http://127.0.0.1:8000/api/v1/"

class Forms extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      classes: [],
    }
    axios.get(baseApiUrl+"studyclasses/").then((res) => {
      this.setState({classes: res.data})
    })
  }

  classesList(classes){
    return (
      <select name="study_class" required id="id_study_class" defaultValue={"DEFAULT"}>
        <option value="DEFAULT">Класс не выбран</option>
        {classes.length > 0 && (
          classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))
        )}
      </select>
    )
  }

  render() {
    return (
      <div>
          <Header title={this.props.title}/>
          <h1>{this.props.title}</h1>
          <Form1 classes={this.state.classes}/>
          <hr/>
          <Form2 classes={this.state.classes}/>
          <hr/>
          <Form3 classes={this.state.classes}/>
          <hr/>
          <Form4 />
      </div>
    )
  }
}

export default Forms
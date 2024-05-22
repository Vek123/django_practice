import React, { useState, useEffect } from "react"
import Header from "./header"
import Form1 from "./form1"
import Form2 from "./form2"
import Form3 from "./form3"
import Form4 from "./form4"
import axios from "axios"


// class Forms extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       classes: [],
//     }
//     axios.get("http://127.0.0.1:8000/api/v1/studyclasses/").then((res) => {
//       this.setState({classes: res.data})
//     })
//   }

  // classesList(classes){
  //   return (
  //     <select name="study_class" required id="id_study_class" defaultValue={"DEFAULT"}>
  //       <option value="DEFAULT">Класс не выбран</option>
  //       {classes.length > 0 && (
  //         classes.map((item, index) => (<option value={item.id} key={index}>{item.class_name}</option>))
  //       )}
  //     </select>
  //   )
  // }

const Forms = (props) => {
  const [classes, setClasses] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/studyclasses/");
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  if (!classes.length) {
    return <div>Loading...</div>
  }
  return (
    <div>
        <Header title={props.title}/>
        <h1>{props.title}</h1>
        <Form1 classes={classes}/>
        <hr/>
        <Form2 classes={classes}/>
        <hr/>
        <Form3 classes={classes}/>
        <hr/>
        <Form4 />
    </div>
  )
}

export default Forms
import React, { useState, useEffect } from "react"
import Header from "./header"
import Form1 from "./form1"
import Form2 from "./form2"
import Form3 from "./form3"
import Form4 from "./form4"
import apiClient from "../api/apiConfig"


const Forms = (props) => {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/api/v1/studyclasses/")
        setLoading(false)
        setClasses(response.data)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <Header title={props.title}/>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <Header title={props.title}/>
        <h2>Error</h2>
      </div>
    )
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
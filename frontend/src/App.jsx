import { useState } from 'react'
import "./App.css"

function ResumeBuilder(props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")

  const validateName = function(event) {
    setName(event.target.value)
  }

  const validatePhone = function(event) {
    setPhone(event.target.value)
  }

  const validateEmail = function(event) {
    setEmail(event.target.value)
  }

  const validateLinkedin = function(event) {
    setLinkedin(event.target.value)
  }

  const validateGithub = function(event) {
    setGithub(event.target.value)
  }

  const submitResume = function(event) {
    event.preventDefault();
    props.compileResume(name, phone, email, linkedin, github)
  }


  return (
    <div class="section-box" id="resume-builder">
      <h1>Build-a-Resume: Your goto for building and customizing resumes!</h1>
      <hr></hr>
      <h2>Resume Header</h2>
      <form onSubmit={submitResume}>
        <label>Name </label>
        <input type="text"
               value={name}
               onChange={(e)=>{validateName(e)}}></input><br></br><br></br>

        <label>Phone Number </label>
        <input type="text"
               value={phone}
               onChange={(e)=>{validatePhone(e)}}></input><br></br><br></br>
        
        <label>E-Mail </label>
        <input type="text"
               value={email}
               onChange={(e)=>{validateEmail(e)}}></input><br></br><br></br>

        <label>LinkedIn </label>
        <input type="text"
               value={linkedin}
               onChange={(e)=>{validateLinkedin(e)}}></input><br></br><br></br>

        <label>GitHub </label>
        <input type="text"  
               value={github}
               onChange={(e)=>{validateGithub(e)}}></input><br></br><br></br>

        <input type="submit" 
               value="Compile Resume"></input>
      </form>
    </div>
  )
}

function ResumePreview(props) {
  return (
    <div class="section-box" id="resume-preview">
      <h1>Resume Preview</h1>
      <p>{props.resume_header.name}</p>
    </div>
  )
}

function App() {
  const [rHead, setRHead] = useState({})

  const compileResume = function(name, phone, email, linkedin, github) {
    setRHead({
      name: name,
      phone: phone,
      email: email,
      linkedin: linkedin,
      github: github
    })
  }

  return (
      <div id="resume-cont">
        <ResumeBuilder compileResume={compileResume}/>
        <ResumePreview resume_header={rHead}/>
      </div>
  )
}

export default App
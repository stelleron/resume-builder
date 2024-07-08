import { useState } from 'react'
import "./App.css"
import SectionModal from './SectionModal'

function ResumeBuilder(props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")

  const [showModal, setShowModal] = useState(false)

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

  const showSectionModal = function() {
    setShowModal(true)
  }

  const hideSectionModal = function() {
    setShowModal(false)
  }


  return (
    <div className="section-box" id="resume-builder">
      <h1>Build-a-Resume</h1>
      <hr></hr>
      <h2>Resume Header</h2>
      <form onSubmit={submitResume} className='main-form'>
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

        <input type="button" 
               value="Add Resume Section"
               onClick={showSectionModal}></input><br></br>
              
        <input type="submit" 
               value="Compile Resume"></input>
      </form>
      <SectionModal show={showModal} closeFunction={hideSectionModal}></SectionModal>
    </div>
  )
}

function ResumePreview(props) {
  const download_page = function() {
    var prtContent = document.getElementById("resume-page");
    var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    WinPrint.document.write('<html><head><title>My Resume</title>');
    WinPrint.document.write('<link rel="stylesheet" href="src/App.css" type="text/css" media="print">');
    WinPrint.document.write('</head><body >');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();

    WinPrint.onload = function() {
      WinPrint.print();
      WinPrint.close();
  };
  
  }

  return (
    <div className="section-box" id="resume-preview">
      <button onClick={download_page}>Download Resume</button>
      <div id="resume-page">
        <div className="page">
          <div className='resume-name'>{props.resume_header.name}</div>
            <div className='resume-key-details'>
              <span>{props.resume_header.phone}</span>
              <span>{props.resume_header.email}</span>
              <span>{props.resume_header.linkedin}</span>
              <span>{props.resume_header.github}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [rHead, setRHead] = useState({})

  const compileResume = function(name, phone, email, linkedin, github) {
    let phone_str = phone
    let email_str = email
    let linkedin_str = linkedin

    if (phone_str != "" && email_str != "") {
      phone_str +=  " • "
    }

    if (email_str != "" && linkedin_str != "") {
      email_str += " • "
    }

    if (linkedin_str != "" && github != "") {
      linkedin_str += " • "
    }

    setRHead({
      name: name,
      phone: phone_str,
      email: email_str,
      linkedin: linkedin_str,
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
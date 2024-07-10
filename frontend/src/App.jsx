import { useState } from 'react'
import "./App.css"
import SectionModal from './SectionModal'

function ResumeBuilder(props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [resumeSections, setResumeSections] = useState([])

  const [showModal, setShowModal] = useState(false)

  const validateName = function(event) {
    setName(event.target.value)
    props.store_resume(event.target.value, phone, email, linkedin, github)
  }

  const validatePhone = function(event) {
    setPhone(event.target.value)
    props.store_resume(name, event.target.value, email, linkedin, github)
  }

  const validateEmail = function(event) {
    setEmail(event.target.value)
    props.store_resume(name, phone, event.target.value, linkedin, github)
  }

  const validateLinkedin = function(event) {
    setLinkedin(event.target.value)
    props.store_resume(name, phone, email, event.target.value, github)
  }

  const validateGithub = function(event) {
    setGithub(event.target.value)
    props.store_resume(name, phone, email, linkedin, event.target.value)
  }

  const showSectionModal = function() {
    setShowModal(true)
  }

  const hideSectionModal = function() {
    setShowModal(false)
  }

  const addResumeSectionFunc = function(name) {
    setResumeSections([...resumeSections, name])
    hideSectionModal()
  }


  return (
    <div className="section-box" id="resume-builder">
      <h2>Resume Header</h2>
      <form className='main-form'>
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
      </form>
      <SectionModal show={showModal} closeFunction={hideSectionModal} addNewSectionFunction={addResumeSectionFunc}></SectionModal>
    </div>
  )
}

function ResumePreview(props) {
  return (
    <div className="section-box" id="resume-preview">
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
  const [rData, setRData] = useState({})

  const storeResume = function(name, phone, email, linkedin, github) {
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

  const compileResume = function() {
    setRData(rHead)
  }
  
  const downloadPage = function() {
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
    <div>
        <div className='page-header'>
          <h1 className='page-header-title'>
               Build-a-Resume
          </h1>
          <div className='right-bar'>
              <input type='button' value="Compile" className='bar-button' onClick={compileResume}></input>
              <input type='button' value="Download" className='bar-button' onClick={downloadPage}></input>
          </div>
        </div>
        <div id="resume-cont">
          <ResumeBuilder store_resume={storeResume}/>
          <ResumePreview resume_header={rData}/>
        </div>
    </div>
  )
}

export default App
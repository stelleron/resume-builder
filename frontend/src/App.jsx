import { useState } from 'react'
import "./App.css"
import SectionModal from './SectionModal'
import ExperienceModal from './ExperienceModal'

function PreviewBox(props) {
  const [dropDown, setDropDown] = useState(false)

  const handleClick = function() {
    if (dropDown) {
      setDropDown(false)
    } else {
      setDropDown(true)
    }
  }
  
  if (dropDown) {
    return (
      <div>
        <div className="resume-sections-column"> <span className='sections-drop-down-arrow' onClick={handleClick}>▼</span> {props.secName.name} <span className='resume-section-remove-item' onClick={() => props.removeResumeSection(props.index)}>(-)</span></div>
        {props.secName.experiences.map((exp, index) => { 
          if (exp.sub_title != "") {
            return (
              <div className='resume-experience-column'>{exp.title}, {exp.sub_title}<span className='resume-section-remove-item' onClick={() => props.removeResumeExperience(props.secName.id, index)}>(-)</span></div> 
            )
          } else {
            return (
              <div className='resume-experience-column'>{exp.title}<span className='resume-section-remove-item' onClick={() => props.removeResumeExperience(props.secName.id, index)}>(-)</span></div> 
            )
          }
        })}
        <div className="resume-experience-column resume-add-experience-column" onClick={() => (props.showExpModalFunc(props.secName.id)) }>Add Resume Experience (+)</div>
      </div>
    )
  } else {
    return (
      <div className="resume-sections-column"> <span className='sections-drop-down-arrow' onClick={handleClick}>▶</span> {props.secName.name} <span className='resume-section-remove-item' onClick={() => props.removeResumeSection(props.index)}>(-)</span></div>
    )
  }
}

function ResumeBuilder(props) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [github, setGithub] = useState("")
  const [resumeSections, setResumeSections] = useState([])

  const [sectionId, setSectionId] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)


  const validateName = function(event) {
    setName(event.target.value)
    props.store_resume(event.target.value, phone, email, linkedin, github, resumeSections)
  }

  const validatePhone = function(event) {
    setPhone(event.target.value)
    props.store_resume(name, event.target.value, email, linkedin, github, resumeSections)
  }

  const validateEmail = function(event) {
    setEmail(event.target.value)
    props.store_resume(name, phone, event.target.value, linkedin, github, resumeSections)
  }

  const validateLinkedin = function(event) {
    setLinkedin(event.target.value)
    props.store_resume(name, phone, email, event.target.value, github, resumeSections)
  }

  const validateGithub = function(event) {
    setGithub(event.target.value)
    props.store_resume(name, phone, email, linkedin, event.target.value, resumeSections)
  }

  const showSectionModal = function() {
    setShowModal(true)
  }

  const hideSectionModal = function() {
    setShowModal(false)
  }

  const addResumeSectionFunc = function(s_name) {
    setResumeSections([...resumeSections, s_name])
    hideSectionModal()
    props.store_resume(name, phone, email, linkedin, github, [...resumeSections, s_name])
  }


  const removeResumeSection = function(idx) {
    const updatedResumeSections = [...resumeSections];
    updatedResumeSections.splice(idx, 1)
    setResumeSections(updatedResumeSections)
    props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
  }

  const addResumeExperienceFunc = function(experience) {
    resumeSections.forEach((section, index) => {
      if (section.id === sectionId) {
        const updatedResumeSections = [...resumeSections];
        updatedResumeSections[index].experiences.push(experience)
        setResumeSections(updatedResumeSections)
        props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
        hideExperienceModal()
        setSectionId(0)
      }
    })
  }

  const removeResumeExperienceFunc = function(id, index) {
    resumeSections.forEach((section, idx) => {
      if (section.id == id) {
        const updatedResumeSections = [...resumeSections];
        updatedResumeSections[idx].experiences.splice(index, 1)
        setResumeSections(updatedResumeSections)
        props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
      }
    })
  }

  const showExperienceModal = function(id) {
    setSectionId(id)
    setShowExpModal(true)
  }

  const hideExperienceModal = function() {
    setShowExpModal(false)
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

        <div className="resume-sections-table">

          {resumeSections.map((secName, index) => {
            return (
              <PreviewBox secName={secName} index={index} removeResumeSection={removeResumeSection} removeResumeExperience={removeResumeExperienceFunc} showExpModalFunc={showExperienceModal}/>
            )
          })}

          <div className="resume-sections-column add-section-button" onClick={showSectionModal}> 
               Add Resume Section (+)
          </div>

        </div>


      </form>
      <SectionModal show={showModal} closeFunction={hideSectionModal} addNewSectionFunction={addResumeSectionFunc}></SectionModal>
      <ExperienceModal show={showExpModal} closeFunction={hideExperienceModal} addNewExperienceFunction={addResumeExperienceFunc}/>
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
          {props.resume_header.resumeSections != undefined &&
           props.resume_header.resumeSections.map((sName) => { return (
            <div class="resume-section">
              <div class="resume-section-title">{sName.name.toUpperCase()}</div>
              <hr></hr>
              {sName.experiences.map((exp, index) => { 
              if (exp.sub_title != "") {
                return (
                  <div class="resume-exp">
                    <div class="exp-title">{exp.title}, <span class="exp-position">{exp.sub_title}</span><span class="exp-time">{exp.time_period}</span></div>
                    <ul>
                      {exp.bullet_points.map((bullet_point) => (
                        <li><span>{bullet_point}</span></li>
                      ))}
                    </ul>
                  </div>
                )
              } else {
                return (
                  <div class="resume-exp">
                    <div class="exp-title">{exp.title}<span class="exp-time">{exp.time_period}</span></div>
                    <ul>
                      {exp.bullet_points.map((bullet_point) => (
                        <li><span>{bullet_point}</span></li>
                      ))}
                    </ul>
                  </div>
                )
              }
              })}
            </div> 
          )})}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [rHead, setRHead] = useState({})
  const [rData, setRData] = useState({})

  const storeResume = function(name, phone, email, linkedin, github, resumeSections) {
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
      github: github,
      resumeSections: resumeSections,
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
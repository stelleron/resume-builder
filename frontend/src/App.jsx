import { useState, useEffect } from 'react'
import "./App.css"
import SectionModal from './SectionModal'
import ExperienceModal from './ExperienceModal'
import axios from "axios"

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
          if (exp.title != "" && exp.sub_title != "") {
            return (
              <div className='resume-experience-column'>{exp.title}, {exp.sub_title}<span className='resume-section-remove-item' onClick={() => props.removeResumeExperience(props.secName.id, index)}> (-)</span></div> 
            )
          }
          else if(exp.title != "" && exp.sub_title == ""){
            return (
              <div className='resume-experience-column'>{exp.title}<span className='resume-section-remove-item' onClick={() => props.removeResumeExperience(props.secName.id, index)}> (-)</span></div> 
            )
          } 
          else {
            return (
              <div className='resume-experience-column'>[{exp.bullet_points[0].text.slice(0, 10)}...]<span className='resume-section-remove-item' onClick={() => props.removeResumeExperience(props.secName.id, index)}> (-)</span></div> 
            )
          }
        })}
        <div className="resume-experience-column resume-add-experience-column" onClick={() => (props.showExpModalFunc(props.secName.id, props.index)) }>Add Resume Experience (+)</div>
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
  const [showExpModal, setShowExpModal] = useState([])

  // Loads the initial resume data
  useEffect(() => {
    axios.get("/api/resume/")
         .then((data) => {
            const updatedResumeSections = data.data[0].sections
            for (let i = 0; i < updatedResumeSections.length; i++) {
              updatedResumeSections[i].experiences = updatedResumeSections[i].experiences.filter((v) => {
                return v.display == true
              })
            }

            setName(data.data[0].name)
            setPhone(data.data[0].phone)
            setEmail(data.data[0].email)
            setLinkedin(data.data[0].linkedin)
            setGithub(data.data[0].github)
            setResumeSections(updatedResumeSections)

            const updatedShowExpModal = []
            data.data[0].sections.map(() => {
              updatedShowExpModal.push(false)
            })
            setShowExpModal(updatedShowExpModal)

            props.store_resume(data.data[0].name, 
                               data.data[0].phone, 
                               data.data[0].email, 
                               data.data[0].linkedin, 
                               data.data[0].github, 
                               updatedResumeSections
            )
        })
  }, [])


  const validateName = function(event) {
    setName(event.target.value)
    props.store_resume(event.target.value, phone, email, linkedin, github, resumeSections)
    const updatedHead = {
      name: event.target.value,
      phone: phone,
      email: email,
      linkedin: linkedin,
      github: github
    }
    axios.put("/api/resume/1/", updatedHead)
  }

  const validatePhone = function(event) {
    setPhone(event.target.value)
    props.store_resume(name, event.target.value, email, linkedin, github, resumeSections)
    const updatedHead = {
      name: name,
      phone: event.target.value,
      email: email,
      linkedin: linkedin,
      github: github
    }
    axios.put("/api/resume/1/", updatedHead)
  }

  const validateEmail = function(event) {
    setEmail(event.target.value)
    props.store_resume(name, phone, event.target.value, linkedin, github, resumeSections)
    const updatedHead = {
      name: name,
      phone: phone,
      email: event.target.value,
      linkedin: linkedin,
      github: github
    }
    axios.put("/api/resume/1/", updatedHead)
  }

  const validateLinkedin = function(event) {
    setLinkedin(event.target.value)
    props.store_resume(name, phone, email, event.target.value, github, resumeSections)
    const updatedHead = {
      name: name,
      phone: phone,
      email: email,
      linkedin: event.target.value,
      github: github
    }
    axios.put("/api/resume/1/", updatedHead)
  }

  const validateGithub = function(event) {
    setGithub(event.target.value)
    props.store_resume(name, phone, email, linkedin, event.target.value, resumeSections)
    const updatedHead = {
      name: name,
      phone: phone,
      email: email,
      linkedin: linkedin,
      github: event.target.value
    }
    axios.put("/api/resume/1/", updatedHead)
  }

  const showSectionModal = function() {
    setShowModal(true)
  }

  const hideSectionModal = function() {
    setShowModal(false)
  }

  const isSectionInResume = function(sName) {
    for (let i = 0; i < resumeSections.length; i++) {
      if (resumeSections[i].id == sName.id) {
        return true
      }
    }
    return false
  }

  const addResumeSectionFunc = function(s_name) {
    setResumeSections([...resumeSections, s_name])
    hideSectionModal()
    props.store_resume(name, phone, email, linkedin, github, [...resumeSections, s_name])
    setShowExpModal([...showExpModal, false])
    axios.put(`/api/section/${s_name.id}/`, {
        name: s_name.name,
        user: 1,
        resume: 1
    })
  }

  const editResumeSectionFunc = function(s_name) {
    const updatedResumeSections = [...resumeSections];
    for (let i = 0; i < updatedResumeSections.length; i++) {
      if (updatedResumeSections[i].id == s_name.id) {
        updatedResumeSections[i].name = s_name.name
        break
      }
    }
    setResumeSections(updatedResumeSections)
  }

  const deleteResumeSectionFunc = function(sec_id) {
    const updatedResumeSections = [...resumeSections];
    for (let i = 0; i < updatedResumeSections.length; i++) {
      if (updatedResumeSections[i].id == sec_id) {
        updatedResumeSections.splice(i, 1)
        break
      }
    }
    setResumeSections(updatedResumeSections)
  }


  const removeResumeSection = function(idx) {
    const updatedResumeSections = [...resumeSections];
    const updatedShowExpModal = [...showExpModal];
    const deletedItem = updatedResumeSections.splice(idx, 1)
    updatedShowExpModal.splice(idx, 1)
    setResumeSections(updatedResumeSections)
    setShowExpModal(updatedShowExpModal)
    props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
    axios.put(`/api/section/${deletedItem[0].id}/`, {
      name: deletedItem[0].name,
      resume: null,
      user: 1
    })
  }

  const addResumeExperienceFunc = function(experience) {
    resumeSections.forEach((section, index) => {
      if (section.id === sectionId) {
        const updatedResumeSections = [...resumeSections];
        updatedResumeSections[index].experiences.push(experience)
        setResumeSections(updatedResumeSections)
        props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
        hideExperienceModal()

        axios.put(`/api/experience/${experience.id}/`, {
          title: experience.title,
          sub_title: experience.sub_title,
          time_period: experience.time_period,
          location: experience.location,
          display: true,
          section: updatedResumeSections[index].id
        })
    
        setSectionId(0)
      }
    })
  }

  const deleteResumeExperienceInModalFunc = function(sec_index, exp_id) {
    const updatedResumeSections = [...resumeSections];
    for (let i = 0; i < updatedResumeSections[sec_index].experiences.length; i++) {
      if (updatedResumeSections[sec_index].experiences[i].id == exp_id) {
        updatedResumeSections[sec_index].experiences.splice(i, 1)
        break
      }
    }
    setResumeSections(updatedResumeSections)
  }

  const editResumeExperienceFunc = function(sec_index, exp) {
    const updatedResumeSections = [...resumeSections];
    for (let i = 0; i < updatedResumeSections[sec_index].experiences.length; i++) {
      if (updatedResumeSections[sec_index].experiences[i].id == exp.id) {
        updatedResumeSections[sec_index].experiences[i].title = exp.title
        updatedResumeSections[sec_index].experiences[i].sub_title = exp.sub_title
        updatedResumeSections[sec_index].experiences[i].time_period = exp.time_period
        updatedResumeSections[sec_index].experiences[i].location = exp.location
        updatedResumeSections[sec_index].experiences[i].bullet_points = exp.bullet_point
        break
      }
    }
    setResumeSections(updatedResumeSections)
  }

  const removeResumeExperienceFunc = function(id, index) {
    resumeSections.forEach((section, idx) => {
      if (section.id == id) {
        const updatedResumeSections = [...resumeSections];
        const deletedItem = updatedResumeSections[idx].experiences.splice(index, 1)
        setResumeSections(updatedResumeSections)
        props.store_resume(name, phone, email, linkedin, github, updatedResumeSections)
        
        axios.put(`/api/experience/${deletedItem[0].id}/`, {
          title: deletedItem[0].title,
          sub_title: deletedItem[0].sub_title,
          time_period: deletedItem[0].time_period,
          location: deletedItem[0].location,
          display: false,
          section: section.id
        })
      }
    })
  }

  const showExperienceModal = function(id, index) {
    setSectionId(id)
    const updatedShowExpModal = [...showExpModal];
    updatedShowExpModal[index] = true
    setShowExpModal(updatedShowExpModal)
  }

  const hideExperienceModal = function() {
    const updatedShowExpModal = [...showExpModal];
    updatedShowExpModal.fill(false)
    console.log(updatedShowExpModal)
    setShowExpModal(updatedShowExpModal)
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
      <SectionModal show={showModal} closeFunction={hideSectionModal} addNewSectionFunction={addResumeSectionFunc} editSectionFunction={editResumeSectionFunc} deleteSectionFunction={deleteResumeSectionFunc} validateAddSectionFunction={isSectionInResume}></SectionModal>
      {resumeSections.map((v, index) => {
        return <ExperienceModal show={showExpModal[index]} sectionIndex={index} sectionId={v.id} closeFunction={hideExperienceModal} addNewExperienceFunction={addResumeExperienceFunc} deleteExperienceFunction={deleteResumeExperienceInModalFunc} editExperienceFunction={editResumeExperienceFunc}/>
      })}
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
                    <div class="exp-title">{exp.title} <span class="exp-time">{exp.time_period}</span></div>
                    <div><span class="exp-subtitle">{exp.sub_title}</span> <span class="exp-location">{exp.location}</span></div>
                    <ul>
                      {exp.bullet_points.map((bullet_point) => {
                        return <li><span dangerouslySetInnerHTML={{__html: bullet_point.text}}></span></li>
                      })}
                    </ul>
                  </div>
                )
              } else {
                return (
                  <div class="resume-exp">
                    <div class="exp-title">{exp.title}<span class="exp-time">{exp.time_period}</span></div>
                    <ul>
                      {exp.bullet_points.map((bullet_point) => {
                        return <li><span dangerouslySetInnerHTML={{__html: bullet_point.text}}></span></li>
                      })}
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
    let resume_sections = resumeSections

    if (phone_str != "" && email_str != "") {
      phone_str +=  " • "
    }

    if (email_str != "" && linkedin_str != "") {
      email_str += " • "
    }

    if (linkedin_str != "" && github != "") {
      linkedin_str += " • "
    }

    resume_sections.map((section) => {
      section.experiences.map((exp) => {
        exp.bullet_points.map((bullet_point, idx) => {
          exp.bullet_points[idx].text = bullet_point.text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.+?)\*/g, '<em>$1</em>') // Italics
          })
      })
    })

    setRHead({
      name: name,
      phone: phone_str,
      email: email_str,
      linkedin: linkedin_str,
      github: github,
      resumeSections: resume_sections,
    })
  }

  const compileResume = function() {
    setRData(rHead)
  }
  
  const downloadPage = function() {
      var prtContent = document.getElementById("resume-page");
      var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

      WinPrint.document.write('<html><head><title>Resume</title>');
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
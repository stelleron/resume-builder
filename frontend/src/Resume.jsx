import React, { useState } from "react";
import "./Resume.css"

const resume_html = [
    {
        "id": 1,
        "name": "Shreyas Donti",
        "email": "shreyasdonti15@gmail.com",
        "phone": "5086653940",
        "linkedin": "https://www.linkedin.com/in/shreyasdonti/",
        "github": "https://github.com/stelleron",
        "sections": [
            {
                "id": 1,
                "category": "Experience",
                "experiences": [
                    {
                        "id": 1,
                        "title": "Potato Farmer",
                        "sub_title": "USSR",
                        "time_period": "May 1940 - Present",
                        "bullet_points": [
                            {
                                "id": 1,
                                "text": "- FIsh and the flock\r\n- Destroyed the USSR"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "title": "Food Eater",
                        "sub_title": "McDonald's",
                        "time_period": "Sep 2010 - Aug 2016",
                        "bullet_points": []
                    }
                ],
                "bullet_list": []
            },
            {
                "id": 2,
                "category": "Skills",
                "experiences": [],
                "bullet_list": [
                    {
                        "id": 1,
                        "text": "- Tools: Wrench, Rifle"
                    }
                ]
            }
        ]
    }
]

function ResumeHeader() {
    return (
      <form>
        <h2>Resume Header</h2>
        <label htmlFor="name">Name</label><br></br>
        <input type="text" id="name" name="name"></input><br></br>

        <label htmlFor="email">E-Mail</label><br></br>
        <input type="text" id="email" name="email"></input><br></br>

        <label htmlFor="phonenum">Phone Number</label><br></br>
        <input type="text" id="phonenum" name="phonenum"></input><br></br>

        <label htmlFor="linkedin">LinkedIn</label><br></br>
        <input type="text" id="linkedin" name="linkedin"></input><br></br>
        
        <label htmlFor="github">GitHub</label><br></br>
        <input type="text" id="github" name="github"></input><br></br>
      </form> 
    )
}


function ResumeExperience(props) {
    const NONE_MODE = 0
    const EDIT_MODE = 1
    const NEW_MODE = 2

    const [idx, setIdx] = useState(0)
    const [mode, setMode] = useState(NONE_MODE)


    const componentId = "resume-experience-modal-" + props.section_id
    const [bulletPointList, setBulletPointList] = useState([])
    const [experiences, setExperiences] = useState([])
    const [expTitle, setExpTitle] = useState("")
    const [expSubTitle, setExpSubTitle] = useState("")
    const [expLocation, setExpLocation] = useState("")
    const [expTimePeriod, setExpTimePeriod] = useState("")

    const handleClick = () => {
        var modal = document.getElementById(componentId);
        modal.style.display = "block";
        setMode(NEW_MODE)
    }

    const exitClick = () => {
        var modal = document.getElementById(componentId);
        modal.style.display = "none";
        setMode(NONE_MODE)
    }

    window.onclick = function(event) {
        var modal = document.getElementById(componentId);
        if (event.target == modal) {
          modal.style.display = "none";
          setMode(NONE_MODE)
        }
    } 

    const validateExpTitleInput = function(event) {
        setExpTitle(event.target.value)
    }

    const validateExpSubtitleInput = function(event) {
        setExpSubTitle(event.target.value)
    }

    const validateExpLocationInput = function(event) {
        setExpLocation(event.target.value)
    }

    const validateExpTimePeriodInput = function(event) {
        setExpTimePeriod(event.target.value)
    }

    const addResumeExperience = function(event) {
        event.preventDefault();
        if (mode === NEW_MODE) {
            setExperiences([...experiences, {
                id: experiences.length + 1,
                title: expTitle,
                sub_title: expSubTitle,
                location: expLocation,
                time_period: expTimePeriod,
                bullet_points: bulletPointList
            }])
        } else if (mode === EDIT_MODE) {
            const updatedExp = experiences
            updatedExp[idx].title = expTitle
            updatedExp[idx].sub_title = expSubTitle
            updatedExp[idx].location  = expLocation
            updatedExp[idx].time_period = expTimePeriod
            updatedExp[idx].bullet_points = bulletPointList
            setExperiences(updatedExp)
        }

        setMode(NONE_MODE)
        setBulletPointList([])
        exitClick()
    }

    const handleBulletPointChange = function(id, p_value) {
        setBulletPointList(
            bulletPointList.map(
                (bullet_point) => (
                    bullet_point.id === id ? {id: bullet_point.id, value: p_value} : bullet_point
                )
            )
        )
    }

    const addBulletPoint = function() {
        setBulletPointList([...bulletPointList, {
            id: bulletPointList.length + 1,
            value: ""
        }])
    }

    const deleteExperience = function(exp_id) {
        const updatedExperiences = experiences.filter(exp => exp.id != exp_id)
        setExperiences(updatedExperiences)
    }

    const deleteBulletPoint = function(bullet_point_id) {
        const updatedBulletPoints = bulletPointList.filter(bp => bp.id != bullet_point_id)
        setBulletPointList(
            updatedBulletPoints.map(
                (bullet_point, index) => (
                    {id: index + 1, value: bullet_point.value}
                )

            )
        )
    }

    const editExperience = function(idx) {
        var modal = document.getElementById(componentId);
        modal.style.display = "block";
        setMode(EDIT_MODE)
        setIdx(idx)
    }

    return (
        <div className="resume-section-experience">
            <h3>{props.section_id}. {props.section_name}</h3>
            {experiences.map((experience, index) => (
                <div>
                    <div><strong> {experience.title}</strong>, {experience.time_period} </div>
                    <div>{experience.sub_title}, {experience.location}</div>
                    <ul>
                    {experience.bullet_points.map(
                        (bullet_point) => (
                            <li>{bullet_point.value}</li>
                        )
                    )}
                    </ul>
                    <button onClick={() =>editExperience(index)}>Edit Experience</button>
                    <button onClick={() => deleteExperience(experience.id)}>Delete Experience</button>
                    <br></br>
                    <br></br>
                </div>
            ))}
            <button onClick={handleClick}>Add Experience</button>
            <div id={componentId} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={exitClick}>&times;</span>
                    <form onSubmit={addResumeExperience}>
                        <label htmlFor="exp-title">Experience Title</label><br></br>
                        <input type="text" name="exp-title" onChange={(e) => validateExpTitleInput(e)} required></input><br></br>
                        <label htmlFor="exp-subtitle">Experience Subtitle</label><br></br>
                        <input type="text" name="exp-subtitle" onChange={(e) => validateExpSubtitleInput(e)}></input><br></br>
                        <label htmlFor="exp-location">Location</label><br></br>
                        <input type="text" name="exp-location" onChange={(e) => validateExpLocationInput(e)}></input><br></br>
                        <label htmlFor="exp-period">Time Period</label><br></br>
                        <input type="text" name="exp-period" onChange={(e) => validateExpTimePeriodInput(e)} required></input><br></br>
                        {bulletPointList.map((bullet_point) => (
                            <div>
                                <label>Bullet Point {bullet_point.id}</label><input type="button" value="Delete" onClick={()=>deleteBulletPoint(bullet_point.id)}></input><br></br>
                                <input type="text" value={bullet_point.value} onChange={(e) => handleBulletPointChange(bullet_point.id, e.target.value)}></input>
                            </div>
                        ))}
                        <input type="button" value="Add Bullet Point" onClick={addBulletPoint}></input>
                        <input type="submit" value="Create"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ResumeSections() {
    // Define state variables for the form inputs
    const NONE_MODE = 0
    const EDIT_MODE = 1
    const NEW_MODE = 2

    const [idx, setIdx] = useState(0)
    const [mode, setMode] = useState(NONE_MODE)
    const [id, setId] = useState(1)
    const [name, setName] = useState('');
    const [sections, setSections] = useState([]);

    const handleClick = () => {
        var modal = document.getElementById("resume-section-modal");
        modal.style.display = "block";
        setMode(NEW_MODE)
    }

    const exitClick = () => {
        var modal = document.getElementById("resume-section-modal");
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        var modal = document.getElementById("resume-section-modal");
        if (event.target == modal) {
          modal.style.display = "none";
        }
    } 

    const isUnique = (new_experience) => {
        let unique = true
        sections.forEach((experience, index) => {
            if (experience.section_name === new_experience) {
                unique = false
            }
        })
        return unique
    }

    const validateInput = function(e) {
        setName(e.target.value)
        if (!isUnique(e.target.value)) {
            e.target.setCustomValidity('No duplicates allowed');
        } else {
            e.target.setCustomValidity('')
        }
    }

    const addResumeSection = function(event) {
        event.preventDefault();
        if (mode === NEW_MODE) {
            setSections([...sections, {
                section_id: id,
                section_name: name}
            ])
        } else if (mode === EDIT_MODE) {
            const updatedSections = sections
            updatedSections[idx].section_name = name
            setSections(updatedSections)
        }

        setName("")
        setId(id + 1)
        setMode(NONE_MODE)
        exitClick()
    }   

    const handleEditSection = function(idx) {
        var modal = document.getElementById("resume-section-modal");
        modal.style.display = "block";
        setMode(EDIT_MODE)
        setIdx(idx)
    }

    const handleDeleteSection = function(section_id){
        const updatedSections = sections.filter(section => section.section_id != section_id)
        setSections(updatedSections)
        return
    }

    return (
        <div>
            <h2 id="resume-section-title">Sections</h2>
            {sections.map((section, index) => (
                <div>
                    <ResumeExperience section_id={index + 1} section_name={section.section_name}/>
                    <button onClick={() => handleEditSection(index)}>Edit Section</button>
                    <button onClick={() => handleDeleteSection(section.section_id)}>Delete Section</button>
                </div>
            ))}
            <br></br>
            <button onClick={handleClick}>Add Resume Section</button>
            <div id="resume-section-modal" className="modal">
                <div id="resume-section-modal-content" className="modal-content">
                    <span className="close" onClick={exitClick}>&times;</span>
                    <form onSubmit={addResumeSection}>
                        <label htmlFor="name">Section Name</label><br></br>
                        <input type="text" name="name" 
                               value={name} 
                               onChange={(e) => validateInput(e)} required></input><br></br>
                        <input type="submit" value="Create"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

function FunctionButtons() {
    return (
        <div>
            <button>Compile Resume</button>
            <button>Download Resume</button>
        </div>
    )
}

function ResumePreview() {
    return (
        <div id="resume-preview">
            Hello World
        </div>
    )
}


function Resume() {
    return (
    <>
        <h1> Resume Generator </h1>
        <ResumePreview/>
        <ResumeHeader/>
        <ResumeSections/>
        <br></br>
        <FunctionButtons/>
    </>
    )
}

export default Resume
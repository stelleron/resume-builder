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
    const componentId = "resume-experience-modal-" + props.section_id

    const handleClick = () => {
        var modal = document.getElementById(componentId);
        modal.style.display = "block";
    }

    const exitClick = () => {
        var modal = document.getElementById(componentId);
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        var modal = document.getElementById(componentId);
        if (event.target == modal) {
          modal.style.display = "none";
        }
    } 

    const addResumeExperience = function(event) {
        event.preventDefault();
        exitClick()
    }

    return (
        <div className="resume-section-experience">
            <h3>{props.section_id}. {props.section_name}</h3>
            <button onClick={handleClick}>Add Experience</button>
            <div id={componentId} className="modal">
                <div className="modal-content">
                    <span className="close" onClick={exitClick}>&times;</span>
                    <form onSubmit={addResumeExperience}>
                        <label htmlFor="exp-title">Experience Title</label><br></br>
                        <input type="text" name="exp-title"></input><br></br>
                        <label htmlFor="exp-subtitle">Experience Subtitle</label><br></br>
                        <input type="text" name="exp-subtitle"></input><br></br>
                        <label htmlFor="exp-period">Time Period</label><br></br>
                        <input type="text" name="exp-period"></input><br></br>
                        <input type="submit" value="Create"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ResumeSections() {
    // Define state variables for the form inputs
    const [id, setId] = useState(1)
    const [name, setName] = useState('');
    const [experiences, setExperiences] = useState([]);

    const handleClick = () => {
        var modal = document.getElementById("resume-section-modal");
        modal.style.display = "block";
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
        return !experiences.includes(new_experience)
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
        setExperiences([...experiences, {
            section_id: id,
            section_name: name}
        ])
        setName("")
        setId(id + 1)
        exitClick()
    }   

    const handleDeleteSection = function(section_id){
        const updatedSections = experiences.filter(section => section.section_id != section_id)
        console.log(updatedSections)
        setExperiences(updatedSections)
        return
    }

    return (
        <div>
            <h2 id="resume-section-title">Sections</h2>
            {experiences.map((section, index) => (
                <div>
                    <ResumeExperience section_id={index + 1} section_name={section.section_name}/>
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
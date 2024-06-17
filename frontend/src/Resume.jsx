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
        <h3>Resume Header</h3>
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

function ResumeSections() {
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

    return (
        <div>
            <h3>Resume Section</h3>
            <button onClick={handleClick}>Add Resume Section</button>
            <div id="resume-section-modal" className="modal">
                <div id="resume-section-modal-content">
                    <span className="close" onClick={exitClick}>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>
        </div>
    )
}

function CompileResume() {
    return (
        <button>Compile Resume</button>
    )
}


function ResumePreview() {
    return (
    <>
        <h1> Resume Generator </h1>
        <ResumeHeader/>
        <ResumeSections/>
        <CompileResume/>
    </>
    )
}

export default ResumePreview
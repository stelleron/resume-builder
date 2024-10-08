import React, { useState, useRef, useEffect} from 'react'
import axios from "axios"

function ExperienceModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1
    const EDIT_MODE = 2

    const [mode, setMode] = useState(NONE_MODE)
    const [expNames, setExpNames] = useState(["(+) Add New Experience", "", "", "", "", "", "", ""])

    const [expTitle, setExpTitle] = useState("")
    const [expSubTitle, setExpSubTitle] = useState("")
    const [expLocation, setExpLocation] = useState("")
    const [expTimePeriod, setExpTimePeriod] = useState("")
    const [bulletPoints, setBulletPoints] = useState([])
    const [errorMessage, setErrorMessage] = useState("")

    const [idx, setIdx] = useState(-1)
    const [sectionId, setSectionId] = useState(1)
    const [id, setId] = useState(1)

    useEffect(() => {
        axios.get("/api/experience/")
            .then((data) => {
                if (data.data.length != 0) {
                    setId(data.data[data.data.length - 1].id + 1)
                }
                let updatedExpNames = [...expNames];
                data.data.map((v, index) => {
                    for (let i = 0; i < updatedExpNames.length; i++) {
                        if (v.section == props.sectionId) {
                            if (updatedExpNames[i] === "(+) Add New Experience") {
                                updatedExpNames[i + 1] = "(+) Add New Experience"
                                updatedExpNames[i] = {
                                    id: v.id,
                                    title: v.title,
                                    sub_title: v.sub_title,
                                    time_period: v.time_period,
                                    location: v.location,
                                    bullet_points: v.bullet_points
                                }
                                break
                            }
                        }
                    }
                })
                setExpNames(updatedExpNames)
            }
        )
        }, [])

    const validateAddNewExperience = function(expName) {
        if (!props.validateAddExperienceFunction(props.sectionIndex, expName.id)) {
            props.addNewExperienceFunction(expName)
            setErrorMessage("")
        } else {
            setErrorMessage("This experience has already been added!")
        }
    }

    const changeMode = function(mode) {
        setMode(mode)
        setErrorMessage("")
    }

    const setEditMode = function(index, mode) {
        setExpTitle(expNames[index].title)
        setExpSubTitle(expNames[index].sub_title)
        setExpLocation(expNames[index].location)
        setExpTimePeriod(expNames[index].time_period)
        setBulletPoints(expNames[index].bullet_points)
        setIdx(index)
        setMode(mode)
        setErrorMessage("")
    }

    const exitFunction = function() {
        setMode(NONE_MODE)
        setErrorMessage("")
        props.closeFunction()
    }

    const addExperience = function(event) {
        event.preventDefault()
        if ( (expTitle == "" || expTimePeriod == "") && bulletPoints.length == 0) {
            setErrorMessage("If you don't have bullet points, you must fill the experience title and time period at least")
            return
        }

        for (let i = 0; i < expNames.length; i++) {
            if (expNames[i] === "(+) Add New Experience") {
                let updatedExpNames = [...expNames];
                updatedExpNames[i + 1] = "(+) Add New Experience"
                updatedExpNames[i] = {
                    id: id,
                    title: expTitle,
                    sub_title: expSubTitle,
                    location: expLocation,
                    time_period: expTimePeriod,
                    bullet_points: [...bulletPoints]
                }
                axios.post('/api/experience/', {
                    title: expTitle,
                    sub_title: expSubTitle,
                    location: expLocation,
                    time_period: expTimePeriod,
                    display: false,
                    section: props.sectionId
                }).then((data) => {
                    updatedExpNames[i].id = data.data.id 
                    if (id != data.data.id) {
                        setId(data.data.id + 1)
                    } else {
                        setId(id + 1)
                    }

                    bulletPoints.map((value, index) => {
                        axios.post('/api/bullet_point/', {
                            text: value.text,
                            experience: data.data.id
                        })
                    })
                })
                
                setExpNames(updatedExpNames)
                setMode(NONE_MODE)
                setExpTitle("")
                setExpSubTitle("")
                setExpTimePeriod("")
                setExpLocation("")
                setBulletPoints([])
                setErrorMessage("")
                return
            }
        }
    }

    const editExperience = function(event) {
        event.preventDefault()
        if ( (expTitle == "" || expTimePeriod == "") && bulletPoints.length == 0) {
            setErrorMessage("ERROR: If you don't have bullet points, you must fill the experience title and time period at least")
            return
        }
        
        let updatedExpNames = [...expNames];
        updatedExpNames[idx] = {
            id: updatedExpNames[idx].id,
            title: expTitle,
            sub_title: expSubTitle,
            location: expLocation,
            time_period: expTimePeriod,
            bullet_points: bulletPoints
        }

        axios.get(`/api/experience/${updatedExpNames[idx].id}/`)
             .then((data) => {
                axios.put(`/api/experience/${updatedExpNames[idx].id}/`, {
                    title: expTitle,
                    sub_title: expSubTitle,
                    location: expLocation,
                    time_period: expTimePeriod,
                    bullet_points: bulletPoints,
                    display: data.data.display,
                    section: data.data.section  
                })

                data.data.bullet_points.forEach((v, i) => {
                    axios.delete(`/api/bullet_point/${v.id}`)
                }) 
                bulletPoints.forEach((v, i) => {
                    axios.post("/api/bullet_point/", {
                        text: v.text,
                        experience: data.data.id
                    })
                }) 

                props.editExperienceFunction(props.sectionIndex, {
                    id: updatedExpNames[idx].id,
                    title: expTitle,
                    sub_title: expSubTitle,
                    location: expLocation,
                    time_period: expTimePeriod,
                    bullet_points: bulletPoints,
                })
             })

        setExpNames(updatedExpNames)
        setMode(NONE_MODE)
        setExpTitle("")
        setExpSubTitle("")
        setExpTimePeriod("")
        setExpLocation("")
        setBulletPoints([])
        setIdx(-1)
        setErrorMessage("")
        return
    }

    const deleteItem = function(index) {
        const updatedExpNames = [...expNames];
        if (updatedExpNames.length > 8) {
            const deletedItem = updatedExpNames.splice(index, 1)
            axios.delete(`/api/experience/${deletedItem[0].id}/`)
            props.deleteExperienceFunction(props.sectionIndex, deletedItem[0].id)
            setExpNames(updatedExpNames)
        } else {
            console.log(updatedExpNames[index])
            axios.delete(`/api/experience/${updatedExpNames[index].id}/`)
            props.deleteExperienceFunction(props.sectionIndex, updatedExpNames[index].id)
            // props.deleteSectionFunction(updatedExpNames[index].id)
            for (let i = index; i < updatedExpNames.length - 1; i++) {
                updatedExpNames[i] = updatedExpNames[i + 1]
            }
            updatedExpNames[updatedExpNames.length - 1] = ""
            setExpNames(updatedExpNames)
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
    
    const addBulletPoint = function() {
        setBulletPoints([...bulletPoints, ""])
    }

    const deleteBulletPoint = function(index) {
        const updatedBulletPoints = [...bulletPoints]
        updatedBulletPoints.splice(index, 1)
        setBulletPoints(updatedBulletPoints)
    }

    const handleBulletPointChange = function(index, p_value) {
        const updatedBulletPoints = [...bulletPoints]
        updatedBulletPoints[index] = {
            id: 0,
            text: p_value
        }
        setBulletPoints(updatedBulletPoints)
    }
    

    if (!props.show) {
        return (
            <>
            </>
        )
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className="close" onClick={exitFunction}>&times;</span>
                <div className='modal-box'>
                    <h2>Resume Experiences</h2>
                    {mode === NONE_MODE && 
                    <div className='overflow-box'>
                    <div className='error-message'>{errorMessage}</div>
                    <table>
                        <thead></thead>
                        <tbody>
                        {
                            expNames.map((expName, index) => {
                                if (expName === "(+) Add New Experience") {
                                    return (
                                        <tr className="new-section-button">
                                            <td>
                                                <input type="button" 
                                                       value={expName}
                                                       onClick={()=>(changeMode(ADD_MODE))}>
                                                </input>
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td>

                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr>
                                            {expName == "" && 
                                            <td>
                                                {expName}
                                            </td>
                                            }
                                            {expName.title == "" && expName.sub_title == "" &&
                                            <td onClick={() => validateAddNewExperience(expName)}>
                                                [{expName.bullet_points[0].text.slice(0, 10)}...]
                                            </td>
                                            }
                                            {expName != "" && expName.sub_title == "" && expName.title != "" &&
                                            <td onClick={() => validateAddNewExperience(expName)}>
                                                {expName.title} 
                                            </td>
                                            }
                                            {expName != "" && expName.sub_title != "" && expName.title != "" &&
                                            <td onClick={() => validateAddNewExperience(expName)}>
                                                {expName.title}, {expName.sub_title}
                                            </td>
                                            }
                                            <td>
                                                {expName != "" && 
                                                <input type='button' 
                                                       value="-"
                                                       onClick={() => (deleteItem(index))}></input>
                                                }
                                            </td>
                                            <td>
                                                {expName != "" && 
                                                <input type='button' 
                                                       value="Edit"
                                                       onClick={() => (setEditMode(index, EDIT_MODE))}></input>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                    }
                    {mode === ADD_MODE &&
                        <div>
                            <form onSubmit={addExperience}>
                                <div className='error-message'>{errorMessage}</div>
                                <label>Experience Title</label>
                                <input type="text" onChange={(e) => validateExpTitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Experience Subtitle (E.g: Company)</label>
                                <input type="text" onChange={(e) => validateExpSubtitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Time Period</label>
                                <input type="text" onChange={(e) => validateExpTimePeriodInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Location</label>
                                <input type="text" onChange={(e) => validateExpLocationInput(e)}></input>

                                {bulletPoints.map((bullet_point, index) => (
                                    <div>
                                        <label>Bullet Point {index + 1} </label>
                                        <input type="button" value="Delete" onClick={()=>deleteBulletPoint(index)}></input>
                                        <br></br>
                                        <textarea className="text-area-element"  
                                                  onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                                  value={bullet_point.text}></textarea>
                                    </div>
                                ))}

                                <input type="button" value="Add Bullet Point" onClick={addBulletPoint}></input>
                                <input type="submit" value="Create"></input>
                            </form>
                        </div>
                    }
                    {mode == EDIT_MODE && 
                        <div>
                            <form onSubmit={editExperience}>
                                <div className='error-message'>{errorMessage}</div>
                                <label>Experience Title</label>
                                <input type="text" 
                                       value={expTitle}
                                       onChange={(e) => validateExpTitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Experience Subtitle (E.g: Company)</label>
                                <input type="text" value={expSubTitle} onChange={(e) => validateExpSubtitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Time Period</label>
                                <input type="text" value={expTimePeriod} onChange={(e) => validateExpTimePeriodInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Location</label>
                                <input type="text" value={expLocation} onChange={(e) => validateExpLocationInput(e)}></input>

                                {bulletPoints.map((bullet_point, index) => (
                                    <div>
                                        <label>Bullet Point {index + 1} </label>
                                        <input type="button" value="Delete" onClick={()=>deleteBulletPoint(index)}></input>
                                        <br></br>
                                        <textarea className="text-area-element"  
                                                  onChange={(e) => handleBulletPointChange(index, e.target.value)}
                                                  value={bullet_point.text}></textarea>
                                    </div>
                                ))}

                                <input type="button" value="Add Bullet Point" onClick={addBulletPoint}></input>
                                <input type="submit" value="Edit"></input>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExperienceModal
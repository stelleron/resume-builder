import React, { useState, useRef, useEffect} from 'react'

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

    const [idx, setIdx] = useState(-1)

    const changeMode = function(mode) {
        setMode(mode)
    }

    const setEditMode = function(index, mode) {
        setExpTitle(expNames[index].title)
        setExpSubTitle(expNames[index].sub_title)
        setExpLocation(expNames[index].location)
        setExpTimePeriod(expNames[index].time_period)
        setBulletPoints(expNames[index].bullet_points)
        setIdx(index)
        setMode(mode)
    }

    const exitFunction = function() {
        setMode(NONE_MODE)
        props.closeFunction()
    }

    const addExperience = function(event) {
        event.preventDefault()
        for (let i = 0; i < expNames.length; i++) {
            if (expNames[i] === "(+) Add New Experience") {
                let updatedExpNames = [...expNames];
                updatedExpNames[i + 1] = "(+) Add New Experience"
                updatedExpNames[i] = {
                    title: expTitle,
                    sub_title: expSubTitle,
                    location: expLocation,
                    time_period: expTimePeriod,
                    bullet_points: [...bulletPoints]
                }
                setExpNames(updatedExpNames)
                setMode(NONE_MODE)
                setExpTitle("")
                setExpSubTitle("")
                setExpTimePeriod("")
                setExpLocation("")
                setBulletPoints([])
                return
            }
        }
    }

    const editExperience= function(event) {
        event.preventDefault()
        let updatedExpNames = [...expNames];
        updatedExpNames[idx] = {
            title: expTitle,
            sub_title: expSubTitle,
            location: expLocation,
            time_period: expTimePeriod,
            bullet_points: bulletPoints
        }
        setExpNames(updatedExpNames)
        setMode(NONE_MODE)
        setExpTitle("")
        setExpSubTitle("")
        setExpTimePeriod("")
        setExpLocation("")
        setBulletPoints([])
        setIdx(-1)
        return
    }

    const deleteItem = function(index) {
        const updatedExpNames = [...expNames];
        if (updatedExpNames.length > 8) {
            updatedExpNames.splice(index, 1)
            setExpNames(updatedExpNames)
        } else {
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
        updatedBulletPoints[index] = p_value
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
                                            <td onClick={() => props.addNewSectionFunction(expName)}>
                                                {expName}
                                            </td>
                                            }
                                            {expName != "" && expName.sub_title == "" &&
                                            <td onClick={() => props.addNewSectionFunction(expName)}>
                                                {expName.title} 
                                            </td>
                                            }
                                            {expName != "" && expName.sub_title != "" &&
                                            <td onClick={() => props.addNewSectionFunction(expName)}>
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
                                <label>Experience Title</label>
                                <input type="text" onChange={(e) => validateExpTitleInput(e)} required></input>

                                <br></br>
                                <br></br>

                                <label>Experience Subtitle (E.g: Company)</label>
                                <input type="text" onChange={(e) => validateExpSubtitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Time Period</label>
                                <input type="text" onChange={(e) => validateExpTimePeriodInput(e)} required></input>

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
                                                  value={bullet_point}></textarea>
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
                                <label>Experience Title</label>
                                <input type="text" 
                                       value={expTitle}
                                       onChange={(e) => validateExpTitleInput(e)} required></input>

                                <br></br>
                                <br></br>

                                <label>Experience Subtitle (E.g: Company)</label>
                                <input type="text" value={expSubTitle} onChange={(e) => validateExpSubtitleInput(e)}></input>

                                <br></br>
                                <br></br>

                                <label>Time Period</label>
                                <input type="text" value={expTimePeriod} onChange={(e) => validateExpTimePeriodInput(e)} required></input>

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
                                                  value={bullet_point}></textarea>
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
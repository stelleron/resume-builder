import { useState } from 'react'

function ExperienceModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1
    const EDIT_MODE = 2

    const [mode, setMode] = useState(NONE_MODE)
    const [expNames, setExpNames] = useState(["(+) Add New Experience", "", "", "", "", "", "", ""])
    const [bulletPoints, setBulletPoints] = useState([])

    const [sName, setSName] = useState("")
    const [idx, setIdx] = useState(-1)

    const changeMode = function(mode) {
        setMode(mode)
    }

    const setEditMode = function(index, mode) {
        setIdx(index)
        setMode(mode)
    }

    const exitFunction = function() {
        setMode(NONE_MODE)
        props.closeFunction()
    }
    
    const blankFunc = function() {

    }
    
    const addItem = function(event) {
        event.preventDefault()
        if (sName === "") {
            setMode(NONE_MODE)
            return
        }
        for (let i = 0; i < sectionNames.length; i++) {
            if (sectionNames[i] === "(+) Add New Section") {
                let updatedSecNames = [...sectionNames];
                updatedSecNames[i + 1] = "(+) Add New Section"
                updatedSecNames[i] = sName
                setSectionNames(updatedSecNames)
                setMode(NONE_MODE)
                setSName("")
                return
            }
        }
    }

    const addBulletPoint = function() {
        setBulletPoints([...bulletPoints, ""])
    }

    const deleteBulletPoint = function(index) {
        const updatedBulletPoints = [...bulletPoints]
        console.log(updatedBulletPoints)
        updatedBulletPoints.splice(index, 1)
        console.log(updatedBulletPoints)
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
                            expNames.map((secName, index) => {
                                if (secName === "(+) Add New Experience") {
                                    return (
                                        <tr className="new-section-button">
                                            <td>
                                                <input type="button" 
                                                       value={secName}
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
                                            <td onClick={() => props.addNewSectionFunction(secName)}>
                                                {secName}
                                            </td>
                                            <td>
                                                {secName != "" && 
                                                <input type='button' 
                                                       value="-"
                                                       onClick={() => (deleteItem(index))}></input>
                                                }
                                            </td>
                                            <td>
                                                {secName != "" && 
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
                            <form onSubmit={addItem}>
                                <label>Experience Title</label>
                                <input type="text" onChange={blankFunc} required></input>

                                <br></br>
                                <br></br>

                                <label>Experience Subtitle (E.g: Company)</label>
                                <input type="text" onChange={blankFunc}></input>

                                <br></br>
                                <br></br>

                                <label>Time Period</label>
                                <input type="text" onChange={blankFunc}></input>

                                <br></br>
                                <br></br>

                                <label>Location</label>
                                <input type="text" onChange={blankFunc}></input>

                                {bulletPoints.map((bullet_point, index) => (
                                    <div>
                                        <label>Bullet Point {index + 1} </label>
                                        <input type="button" value="Delete" onClick={()=>deleteBulletPoint(index)}></input>
                                        <br></br>
                                        <input type="text" value={bullet_point} onChange={(e) => handleBulletPointChange(index, e.target.value)}></input>
                                    </div>
                                ))}

                                <input type="button" value="Add Bullet Point" onClick={addBulletPoint}></input>
                                <input type="submit" value="Create"></input>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExperienceModal
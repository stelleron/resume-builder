import { useState } from 'react'

function SectionModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1
    const EDIT_MODE = 2

    const [mode, setMode] = useState(NONE_MODE)
    const [sectionNames, setSectionNames] = useState(["(+) Add New Section", "", "", "", "", "", "", ""])

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

    const validateSecName = function(event) {
        setSName(event.target.value)
    }

    const deleteItem = function(index) {
        const updatedSecNames = [...sectionNames];
        if (updatedSecNames.length > 8) {
            updatedSecNames.splice(index, 1)
            setSectionNames(updatedSecNames)
        } else {
            for (let i = index; i < updatedSecNames.length - 1; i++) {
                updatedSecNames[i] = updatedSecNames[i + 1]
            }
            updatedSecNames[updatedSecNames.length - 1] = ""
            setSectionNames(updatedSecNames)
        }
    }

    const editItem = function(event) {
        event.preventDefault()
        let updatedSecNames = [...sectionNames];
        updatedSecNames[idx] = sName
        setSectionNames(updatedSecNames)
        setMode(NONE_MODE)
        setSName("")
        setIdx(-1)
        return
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
                    <h2>Resume Sections</h2>
                    {mode === NONE_MODE && 
                    <table>
                        {
                            sectionNames.map((secName, index) => {
                                if (secName === "(+) Add New Section") {
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
                                            <td>
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
                    </table>
                    }
                    {mode === ADD_MODE &&
                    <div>
                        <form onSubmit={addItem}>
                            <label>Section Name</label>
                            <input type="text"
                                   onChange={validateSecName}></input>
                            <input type="submit"
                                   value="Create"></input>
                        </form>
                    </div>
                    }
                    {mode === EDIT_MODE &&
                    <div>
                        <form onSubmit={(event) => (editItem(event))}>
                            <label>Section Name</label>
                            <input type="text"
                                onChange={validateSecName}></input>
                            <input type="submit"
                                value="Edit"></input>
                        </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionModal
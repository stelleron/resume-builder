import { useEffect, useState } from 'react'
import axios from 'axios'

function SectionModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1
    const EDIT_MODE = 2

    const [mode, setMode] = useState(NONE_MODE)
    const [sectionNames, setSectionNames] = useState(["(+) Add New Section", "", "", "", "", "", "", ""])

    const [id, setId] = useState(1)
    const [sName, setSName] = useState("")
    const [idx, setIdx] = useState(-1)
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        axios.get("/api/section/")
             .then((data) => {
                setId(data.data[data.data.length - 1].id + 1)
                let updatedSecNames = [...sectionNames];
                data.data.map((v, index) => {
                    for (let i = 0; i < updatedSecNames.length; i++) {
                        if (updatedSecNames[i] === "(+) Add New Section") {
                            updatedSecNames[i + 1] = "(+) Add New Section"
                            updatedSecNames[i] = {
                                id: v.id,
                                name: v.name,
                                experiences: []
                            }
                            break
                        }
                    }
                setSectionNames(updatedSecNames)
             })
        })
    }, [])

    const validateAddNewSection = function(secName) {
        if (!props.validateAddSectionFunction(secName)) {
            props.addNewSectionFunction(secName)
            setErrorMessage("")
        } else {
            setErrorMessage("This section has already been added!")
        }
    }


    const changeMode = function(mode) {
        setErrorMessage("")
        setMode(mode)
    }

    const setEditMode = function(index, mode) {
        setErrorMessage("")
        setSName(sectionNames[index].name)
        setIdx(index)
        setMode(mode)
    }

    const exitFunction = function() {
        setMode(NONE_MODE)
        setErrorMessage("")
        props.closeFunction()
    }

    const validateSecName = function(event) {
        setSName(event.target.value)
    }

    const deleteItem = function(index) {
        setErrorMessage("")
        const updatedSecNames = [...sectionNames];
        if (updatedSecNames.length > 8) {
            const deletedItem = updatedSecNames.splice(index, 1)
            axios.delete(`/api/section/${deletedItem[0].id}/`)
            setSectionNames(updatedSecNames)
        } else {
            axios.delete(`/api/section/${updatedSecNames[index].id}/`)
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
        updatedSecNames[idx].name = sName
        axios.get(`/api/section/${updatedSecNames[idx].id}/`)
             .then((data) => {
                axios.put(`/api/section/${updatedSecNames[idx].id}/`, {
                    name: sName,
                    user: 1,
                    resume: data.data.resume
                })
             })
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
                updatedSecNames[i] = {
                    id: id,
                    name: sName,
                    experiences: []
                }
                setId(id + 1)
                setSectionNames(updatedSecNames)
                setMode(NONE_MODE)
                setSName("")
                axios.post('/api/section/', {
                    name: sName,
                    user: 1,
                    resume: null,
                })
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
                    <div className='overflow-box'>
                    <div className='error-message'>{errorMessage}</div>
                    <table>
                        <thead></thead>
                        <tbody>
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
                                            {secName == "" &&
                                            <td>
                                            
                                            </td>}
                                            {secName != "" && 
                                            <td onClick={() => validateAddNewSection(secName)}>
                                                {secName.name}
                                            </td>
                                            }
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
                            <label>Section Name</label>
                            <input type="text"
                                   onChange={validateSecName} required></input>
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
                                    value={sName}
                                   onChange={validateSecName} required></input>
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
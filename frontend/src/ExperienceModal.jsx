import { useState } from 'react'

function ExperienceModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1
    const EDIT_MODE = 2

    const [mode, setMode] = useState(NONE_MODE)
    const [expNames, setExpNames] = useState(["(+) Add New Experience", "", "", "", "", "", "", ""])

    const [sName, setSName] = useState("")
    const [idx, setIdx] = useState(-1)

    const exitFunction = function() {
        setMode(NONE_MODE)
        props.closeFunction()
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
                </div>
            </div>
        </div>
    )
}

export default ExperienceModal
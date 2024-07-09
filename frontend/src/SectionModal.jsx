import { useState } from 'react'

function SectionModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1

    const [mode, setMode] = useState(NONE_MODE)
    const [sectionNames, setSectionNames] = useState(["(+) Add New Section", "", "", "", "", "", "", ""])


    const changeMode = function(mode) {
        setMode(mode)
    }

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
                    <h2>Resume Sections</h2>
                    <table>
                        {
                            sectionNames.map((secName) => (
                                <tr>
                                    <td>
                                        {secName}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SectionModal
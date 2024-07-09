import { useState } from 'react'

function SectionModal(props) {
    const NONE_MODE = 0
    const ADD_MODE = 1

    const [mode, setMode] = useState(NONE_MODE)

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
                <div className='modal-left-box'>
                    <h2>Resume Section</h2>
                    <table>
                    </table>
                    <input type="button" value="+ Add New Section"
                           onClick={() => changeMode(ADD_MODE)}></input>
                </div>
                { (mode === NONE_MODE) && 
                    <div className='modal-right-box centering-box'>
                            <h2 style={{margin: 5}}>There's nothing here</h2>
                            <div>Click Add/Edit to get started.</div>
                    </div>
                }
                { (mode === ADD_MODE) && 
                    <div className='modal-right-box left-align-box'>
                        <h2>Pizza</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default SectionModal
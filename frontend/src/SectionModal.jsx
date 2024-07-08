import { useState } from 'react'

function SectionModal(props) {
    if (!props.show) {
        return (
            <>
            </>
        )
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className="close" onClick={props.closeFunction}>&times;</span>
                <div className='modal-left-box'>
                    <h2>Resume Section</h2>
                    <table>
                    </table>
                    <input type="button" value="+ Add New Section"></input>
                </div>
                <div className='modal-right-box'>
                    <h2 style={{margin: 5}}>There's nothing here</h2>
                    <div>Click a button to get started.</div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal
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
                <div>Fortnite</div>
            </div>
        </div>
    )
}

export default SectionModal
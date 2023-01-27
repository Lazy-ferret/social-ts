import React from 'react'

type PropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<PropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle}:</b>
            <span>{contactValue}</span>
        </div>
    )
}

export default Contact
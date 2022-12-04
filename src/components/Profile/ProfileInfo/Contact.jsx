import React from "react";

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b>{contactTitle}:</b>
            <span>{contactValue}</span>
        </div>
    )
}

export default Contact
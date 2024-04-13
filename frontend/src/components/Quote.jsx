import React from "react";

const Quote = ({name, message, time}) => {
    return (
        <div>
            <p>{name}</p>
            <p>{message}</p>
            <p>{time}</p>
        </div>
    );
};

export default Quote;

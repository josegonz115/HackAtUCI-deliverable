import React from "react";

const Quote = ({name, message, time}) => {
    return (
        <div className="p-4 m-2 bg-yellow-200 rounded-lg shadow-lg border border-yellow-400">
            <p className="font-bold text-lg">{name}</p>
            <p className="mt-2">{message}</p>
            <p className="mt-2 text-sm text-gray-500">{
                new Date(time).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                })}
            </p>
        </div>
    );
};

export default Quote;

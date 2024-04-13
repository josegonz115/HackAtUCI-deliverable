import { useState } from "react";

// uncontrolled form: use DOM instead of component state!
const SubmitForm = ({ onUpdateQuotes }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target); // name, message
        const inputName = formData.get("name"); 
        const inputMessage = formData.get("message"); 
        const postQuote = async () => {
            try {
                // api expects form data encoding
                const response = await fetch("api/quote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `name=${encodeURIComponent(inputName)}&message=${encodeURIComponent(inputMessage)}`, 
                });
                if (!response.ok) {
                    throw new Error(`Error with the HTTP! status: ${response.status}`);
                }
                console.log(`Quote submitted successfully by ${inputName}: ${inputMessage}`);
                onUpdateQuotes(); 
            } catch (error) {
                console.error("Error submitting quote:", error);
            }
        };
        postQuote();
    };


    return (
        <>
            <h2>Submit a quote</h2>
            {/* action="/api/quote" method="post"  | will not work due to using event.preventDefault() */}
            <form className="submitform-container debug" onSubmit={handleSubmit}>
                <label htmlFor="input-name">Name</label>
                <input type="text" name="name" id="input-name" required />
                <label htmlFor="input-message">Quote</label>
                <input type="text" name="message" id="input-message" required />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default SubmitForm;

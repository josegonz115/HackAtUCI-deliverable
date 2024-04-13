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

    // <div className="bg-slate-400 mx-auto w-96 min-w-max  py-2 px-4 rounded-lg shadow-lg mb-8">
    // <h2 className="text-2xl font-bold text-center w-full">Submit a quote</h2>
    // {/* action="/api/quote" method="post"  | will not work due to using event.preventDefault() */}
    // <form className=" flex flex-col items-center gap-2 mt-4 w-full" onSubmit={handleSubmit}>
    return (
        <div className="bg-indigo-300 border border-indigo-400 mx-auto w-80 sm:w-80 md:w-96 lg:w-[600px] min-w-fit  py-4 px-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-center w-full">Submit a quote</h2>
        <form className="flex flex-col items-center gap-2 mt-4 w-full" onSubmit={handleSubmit}>
                <div className="mb-5 w-full">
                    <label htmlFor="input-name" className=" mb-2 text-lg font-medium text-gray-900">Your Name</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        type="text" name="name" id="input-name" placeholder="What do we call you..."required 
                    />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="input-message" className="mb-2 text-lg font-medium text-gray-900">Your Quote</label>
                    {/* <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        type="text" name="message" id="input-message" required
                    /> */}
                    <textarea 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  
                        id="input-message" name="message" type="text" rows="5" placeholder="What is your heart saying..." required
                    />
                </div>

                {/* <button type="submit">Submit</button> */}
                <button type="submit" className="w-6/12 text-indigo-700 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-4">Submit</button>

            </form>
        </div>
    );
};

export default SubmitForm;

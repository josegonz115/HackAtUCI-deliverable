import { useState, useEffect } from "react";
import Quote from "./Quote";

const Quotes = () => {
    // quotes:{  name: string, message: string, time: string }[]
    const [quotes, setQuotes] = useState([]);
    useEffect(() => {
        const fetchQuotes = async () => {
            const response = await fetch(
                "/api/quote/?maxage=2021-02-21T22:00:00"
            );
            const data = await response.json();
            setQuotes(data);
            // console.log(quotes); // TESTING
        };
        fetchQuotes();
    }, []);

    return (
        <div className="messages">
            {quotes.length > 0 ? (
                quotes.map((quote, i) => (
                    <Quote
                        name={quote.name}
                        message={quote.message}
                        time={quote.time}
                        key={quote.name + i}
                    />
                ))
            ) : (
                <h2>No quotes yet 🥺</h2>
            )}
        </div>
    );
};

export default Quotes;

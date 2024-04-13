import "./App.css";
import { useState } from "react";
import Quotes from "./components/Quotes";
import SubmitForm from "./components/SubmitForm";

function App() {
	const [updateQuotes, setUpdateQuotes] = useState(false);
	const handleUpdateQuotes = () => {
		setUpdateQuotes(prevState => !prevState); // functional update
	};

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}

			<h1>Hack at UCI Tech Deliverable</h1>
			<SubmitForm onUpdateQuotes={handleUpdateQuotes} />
			<Quotes updateQuotes={updateQuotes}/>
		</div>
	);
}

export default App;

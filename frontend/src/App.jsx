import "./App.css";
import { useState } from "react";
import Quotes from "./components/Quotes";
import SubmitForm from "./components/SubmitForm";
import QuoteBook from "./images/quotebook.png";

function App() {
	const [updateQuotes, setUpdateQuotes] = useState(false);
	const handleUpdateQuotes = () => {
		setUpdateQuotes(prevState => !prevState); // functional update
	};

	return (
		<div className="flex flex-col debug p-6">
			<div className="flex flex-col gap-4 mb-8">
				<img src={QuoteBook} alt="Quote Book" width="100" className="mx-auto"/>
				<h1 className="mx-auto text-4xl font-bold text-center">Hack at UCI Tech Deliverable</h1>
			</div>
			<SubmitForm onUpdateQuotes={handleUpdateQuotes} />
			<Quotes updateQuotes={updateQuotes}/>
		</div>
	);
}

export default App;

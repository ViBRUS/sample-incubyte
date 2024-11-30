import './App.css'
import { useState, useEffect } from "react";

function App() {
	const [input, setInput] = useState('');
	const [delimiter, setDelimiter] = useState('');
	const [result, setResult] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		let sum = +result;
		const regex = /\/\/(.*?)(\W)/;

		if(input.length) {
			const match = input.match(regex);
			if(match) {
				setDelimiter(match[2]);
			} else {
				setDelimiter(',');
			}
			if(input.includes(delimiter) || input.includes('\n')) {
				const numbersWithComma = input.split('\n');
				numbersWithComma.forEach(num => {
					if(num.includes(delimiter)) {
						sum += num.split(delimiter)
						.map((n) => parseFloat(n.trim()))
						.filter((n) => !isNaN(n))
						.reduce((acc, n) => acc+n, 0);
					} else if(!isNaN(num)) {
						sum += +num;
					}
				});
			} else if(!isNaN(input)) {
				sum += +input
			}
		}
		setResult(sum);
	};

  return (
    <>
    <form onSubmit={handleSubmit}>
      <textarea
      	name="input"
      	type="text"
      	data-testid="input-field"
      	value={input}
      	onChange={(e) => setInput(e.target.value)}
      />
      <input type="submit" value="form submit"/>
      <p className="result">{result}</p>
    </form>
    </>
  )
}

export default App

import './App.css'
import { useState, useEffect } from "react";
import constants from "./constants";

function App() {
	const [input, setInput] = useState('');
	const [delimiter, setDelimiter] = useState(constants.DEFAULT_DELIMITER);
	const [result, setResult] = useState(0);

	useEffect(() => {
		const delimiterRegex = constants.REGEX.DELIMITER;
		if(input.length) {
			const delimiterMatch = input.match(delimiterRegex);
       		if(delimiterMatch) {
				   setDelimiter(delimiterMatch[2]);
        	} else {
				setDelimiter(constants.DEFAULT_DELIMITER);
        	}
		}
	}, [input]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let sum = +result;

		const negativeRegex = constants.REGEX.NEGATIVE_NUMBER;
		const negativeNumbers = [];

		if(input.length) {
			if(input.includes(delimiter) || input.includes('\n')) {
				const numbersWithComma = input.split('\n');
				numbersWithComma.forEach(num => {
					if(num.includes(delimiter)) {
						num.split(delimiter).forEach((n) => {
							if(n.match(negativeRegex)) {
								negativeNumbers.push(n.match(negativeRegex))
							}
							})
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
		if(negativeNumbers.length > 0) {
			setResult(`negative numbers not allowed ${negativeNumbers.join(', ')}`);
		} else {
			setResult(sum);
		}
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

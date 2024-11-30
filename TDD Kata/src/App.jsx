import './App.css'
import { useState, useEffect } from "react";

function App() {
	const [input, setInput] = useState('');
	const [result, setResult] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		let sum = +result;
		if(input.length) {
			if(input.includes(',') || input.includes('\n')) {
				const numbersWithComma = input.split('\n');
				numbersWithComma.forEach(num => {
					if(num.includes(',')) {
						sum += num.split(',')
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

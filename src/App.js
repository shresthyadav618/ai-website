import { useEffect, useState } from 'react';
import './App.css';
import { supportedLanguages } from "./api/api";
function App() {

  const [select,changeSelect] = useState(null);
  
  useEffect(()=>{
    console.log(process.env.REACT_APP_API_KEY);
    async function getData(){
      const url = supportedLanguages;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
		'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
  console.log(result.languages);

  changeSelect(result.languages)

} catch (error) {
	console.error(error);
}
    }

    getData();
  },[])

  
  const options_req = select ? select.map((elm,idx)=>{
    // if(idx<10)
    return <option value="${elm.language}">${elm.name}</option>
  }) : null;
  // console.log(...options_req)
  if(options_req){
    console.log([...options_req])
  }
  return (
    <div className="App">
      <form>
        <select>{options_req && options_req.map((elm)=>{
          console.log(elm);
          return elm;
        })}</select>
      </form>
    </div>
  );
}

export default App;

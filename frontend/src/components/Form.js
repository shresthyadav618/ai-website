import "@fortawesome/fontawesome-free/css/all.css";
import { useEffect, useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import MoonLoader from "react-spinners/MoonLoader";
import { supportedLanguages } from "../api/api";
import "./styles/Form.css";
export default function useForm() {
  const [select, changeSelect] = useState(null);
  const [loading,setLoading] = useState(false);
  const [translatedText, changeTranslatedText] = useState(null);
  useEffect(() => { 
    console.log(process.env.REACT_APP_API_KEY);
    async function getData() {
      
      const url = supportedLanguages;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
        },
      };

      try {
        
        const response = await fetch(url, options);
       
        const result = await response.json();
        console.log(result.languages);

        changeSelect(result.languages);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);
console.log(select)
  const options_req = select
    ? select.map((elm, idx) => {
      const val = JSON.stringify({lang : elm.name,code : elm.language});
        return <option value={val} name={elm.name}>{elm.name} </option>;
      })
    : null;
  if (options_req) {
    console.log([...options_req]);
  }

  const [data, changeData] = useState({
    from: {code : "en", lang : "English"},
    to: {code : "en",lang : "English"},
    content: "",
  });

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    async function GetTranslation() {
      
      const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '42f11e3f83msh93eaeda437bf90ap1402e3jsn34cee8c7d266',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		q: data.content,
		target: data.to.code,
		source: data.from.code
	})
};

try {
	const response = await fetch(url, options);
  if(response.ok){
    setLoading(false);
  }
	const result = await response.json();
	changeTranslatedText(()=>{return result.data.translations[0].translatedText});
} catch (error) {
	console.error(error);
}
    }
   
    GetTranslation();
  }
console.log(data);



  return (
    <div className="form__container flex flex-col gap-y-10">
      <h1 className="form__heading">CONVERT</h1>
        {loading && <MoonLoader color="#36d7b7" />}
        
      <form>
        <div className="form__textarea gap-x-2">
          <textarea value={data.content} placeholder="Enter Text" cols={"40"}  rows={"10"} onChange={(e)=>{changeData((prev)=>{
            return {...prev, content : e.target.value}
          })}}></textarea>
          <textarea
            placeholder="Translation"
            cols={"40"}
            rows={"10"}
            value={translatedText ? translatedText : ''}
          ></textarea>
        </div>

        <div className="form__language__selection">
          <div className="flex justify-center f items-center">
            <div className="flex gap-x-2 mr-4  justify-center items-center">
              <i class="fa-solid fa-volume-high cursor-pointer" style={{ color: "gray" , size : 'xl' }} onClick={()=>{
                const utterance = new SpeechSynthesisUtterance(data.content);
                utterance.lang = data.from.code
                speechSynthesis.speak(utterance)
              }}></i>
              <i class="fa-solid fa-file cursor-pointer" onClick={()=>{
                console.log('clicked to copy',data.content)
                navigator.clipboard.writeText(data.content)

              }} style={{ color: "gray" }}></i>
              <div className="line"></div>
            </div>

            {/* <input></input> */}
           
            <select className="form__select cursor-pointer"    onChange={(e)=>{
              const parsedJson = JSON.parse(e.target.value);
              changeData((prev)=>  {  return {...prev, from : {code : parsedJson.code , lang : parsedJson.lang }}})
              console.log(data)
            }}>
              {options_req &&
                options_req.map((elm) => {
                  // console.log(elm);
                  return elm;
                })}
            </select>
          </div>

          <i class="fa-solid fa-right-left p" onClick={()=>{
            const prevContent = data.content;
            const first = document.querySelectorAll('select')[0];
            const second = document.querySelectorAll('select')[1];
            const temp = first.value;
            first.value = second.value;
            second.value = temp;
            changeData((prev)=>{
              return {...prev , from : prev.to , to : prev.from ,content : translatedText }
            })
            changeTranslatedText((prev)=>{return prevContent});
          }}></i>

          <div className="flex flex-row-reverse s justify-center items-center">
            <div className="flex gap-x-2 ml-4  justify-center items-center">
              <div className="line"></div>
              <i class="fa-solid fa-volume-high cursor-pointer" style={{ color: "gray" }} onClick={()=>{
              
                const utterance = new SpeechSynthesisUtterance(translatedText);
                utterance.lang = data.to.code
                speechSynthesis.speak(utterance);
               

                // const utterance = new SpeechSynthesisUtterance(translatedText);
                // utterance.lang = data.to.code;
                // speechSynthesis.speak(utterance)
              }}></i>
              <i class="fa-solid fa-file cursor-pointer" onClick={()=>{
                console.log('clicked to copy',translatedText)
                navigator.clipboard.writeText(translatedText)
              }} style={{ color: "gray" }}></i>
            </div>

            <select className="form__select cursor-pointer"   onChange={(e)=>{
               const parsedJson = JSON.parse(e.target.value);
               changeData((prev)=>  {  return {...prev, to : {code : parsedJson.code , lang : parsedJson.lang }}})
               console.log(data)
            }}>
              {options_req &&
                options_req.map((elm) => {
                  // console.log(elm);
                  return elm;
                })}
            </select>
          </div>
        </div>
        <button className="btn" onClick={(e)=>{handleSubmit(e)}}>
          <p>Translate Text</p>
        </button>
      </form>
    </div>
  );
}

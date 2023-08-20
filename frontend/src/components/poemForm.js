import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MoonLoader from "react-spinners/MoonLoader";
import "./styles/Form.css";
export default function usePoem() {
    const startListening = ()=> SpeechRecognition.startListening({continuous : true, language :'en-IN'});

    const {browserSupportsSpeechRecognition  ,resetTranscript , transcript } = useSpeechRecognition();
    // let {transcript} = useSpeechRecognition();
    console.log(transcript);
    const [loading , setLoading] = useState(false);
  const [data, changeData] = useState();
//   transcript = data + transcript;
  const [generate, changeGenerate] = useState(null);
  const BASE_URL = `https://openagent.onrender.com`;
//   const [isListening, changeIsListening] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const request = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });

    console.log(request);
    if (request.ok) {
        setLoading(false);
      const dataRes = await request.json();
      console.log("the json response is : ", dataRes);
      changeGenerate(() => {
        return dataRes.data;
      });
    } else {
      const json = await request.json();
      console.log("there was some error while getting the response", json);
    }
  }

 


  return (
    <div className="form__container flex flex-col gap-y-10">
        <h1 className="form__heading">ASK OPENAI</h1>
        {loading && <MoonLoader color="#36d7b7" margin="10px auto" />}
        
      <form>
        <div className="flex gap-x-2 form__textarea">
        <textarea
          onChangeCapture={(e) => {
            
            changeData(() => {
              return e.target.value;
            });

          }} value={data} readOnly
          className="p-4 outline-none rounded-lg pointer-events-none caret-transparent"
          cols={"40"}
          rows={"10"}
          placeholder="ask openAI something... (allow for microphone access, and click on start listening to take input (chrome compatible) )"
        ></textarea>
        <textarea placeholder="your response will be shown here..." value={generate} className="p-4 outline none rounded-lg" cols={'40'} rows={'10'} ></textarea>
        </div>
        {browserSupportsSpeechRecognition && <div className="flex gap-x-2 dpf">
          <button
            className="btn"
            type="button"
            onClick={()=>{ startListening();}}
          >
            Start Listening
          </button>{" "}
          <button
            onClick={()=>{
                SpeechRecognition.stopListening();
                changeData(()=>{return transcript});
            }}
            type="button"
            className="btn"
          >
            Stop Listening
          </button>
          <button className="btn" type="button" onClick={()=>{resetTranscript();changeData(()=>{return ''})}}>Clear Text</button>
        </div>}
        <button className="btn " onClick={(e) => handleSubmit(e)}>
          Generate
        </button>
      </form>

      {/* <div>{transcript}</div> */}
    </div>
  );
}

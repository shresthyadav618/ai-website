import "@fortawesome/fontawesome-free/css/all.css";
import { useEffect, useState } from "react";
import { supportedLanguages } from "../api/api";
import "./Form.css";
export default function useForm() {
  const [select, changeSelect] = useState(null);

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

  const options_req = select
    ? select.map((elm, idx) => {
        return <option value="${elm.language}">{elm.name}</option>;
      })
    : null;
  if (options_req) {
    console.log([...options_req]);
  }
  return (
    <div className="form__container">
      <form>
        <div className="form__textarea">
          <textarea placeholder="Enter Text" cols={"40"} rows={"10"}></textarea>
          <textarea placeholder="Translation" cols={"40"} rows={"10"}></textarea>
        </div>

        <div className="form__language__selection">
          <div className="flex justify-center items-center">
            <div className="flex gap-x-2 mr-4 justify-center items-center">
              <i class="fa-solid fa-volume-high" style={{ color: "gray" }}></i>
              <i class="fa-solid fa-file" style={{ color: "gray" }}></i>
              <div className="line"></div>
            </div>
            
           {/* <input></input> */}
           <select className="form__select">
              {options_req &&
                options_req.map((elm) => {
                  console.log(elm);
                  return elm;
                })}
            </select>
          </div>

          <i class="fa-solid fa-right-left"></i>

          <div className="flex flex-row-reverse justify-center items-center">
            <div className="flex gap-x-2 ml-4 justify-center items-center">
            <div className="line"></div>
              <i class="fa-solid fa-volume-high" style={{ color: "gray" }}></i>
              <i class="fa-solid fa-file" style={{ color: "gray" }}></i>
              
            </div>
           
            <select className="form__select">
              {options_req &&
                options_req.map((elm) => {
                  console.log(elm);
                  return elm;
                })}
            </select>
          </div>

        </div>
        <button className="btn"><p>Translate Text</p></button>
      </form>
    </div>
  );
}

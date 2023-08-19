import CoverImage from "../assets/required.jpg"
import './styles/topContainer.css'
export default function topContainer(){
   return(
    <div className="top__container flex">
        
    <div className="image__container">
        <img src={CoverImage} className="cover__image" alt="image not found"></img>
    </div>
    <div className="text__container relative ">
        <div className="absolute top-0 left-0 text-xl">Translate</div>
        <div className="absolute top-0 right-0  text-xl">Convert</div>
        <div className="absolute bottom-0 left-0 text-xl">Ask AI</div>
        <div className="absolute bottom-0 right-0 text-xl">Generate</div>
        <div className="flex m-auto text-3xl lg:text-4xl font-bold text-center text__container__center__heading">UNLEASH THE TRUE POWER OF AI & LANGUAGE!</div>
        
    </div>
</div>
   )
}
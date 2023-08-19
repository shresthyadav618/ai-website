import './styles/middleContainer.css'
export default function middle(){
    return(
        <div className="text-white flex flex-col middle__container">
            <div className="first__container flex flex-col xl:flex-row">
                <h1>MASTER MULTILINGUALISM AND OPENAI</h1>
                <span>No longer fear the language barrier! Our Translate Language tool swiftly bridges the gap between you and speakers of other languages. Have your text translated in a jiffy without losing its essence.</span>
            </div>

            <div className='first__container flex flex-col xl:flex-row'>
                <h1 style={{color : '#8B8C89'}}>AI MASTERY</h1>
                
                <span> Unleash your curiosity and explore endless possibilities with our AI-powered question and answer platform . Select a language, enter your text, and watch as it transforms before your eyes. Our tool even provides a pronunciation guide for those pronunciation-perplexing phrases.  Don’t wait, get started now! Try it out now!</span>
            </div>
        </div>
    )
}
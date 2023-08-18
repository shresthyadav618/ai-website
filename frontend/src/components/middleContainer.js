import './styles/middleContainer.css'
export default function middle(){
    return(
        <div className="text-white flex flex-col middle__container">
            <div className="first__container flex flex-col xl:flex-row">
                <h1>MASTER MULTILINGUALISM</h1>
                <span>No longer fear the language barrier! Our Translate Language tool swiftly bridges the gap between you and speakers of other languages. Have your text translated in a jiffy without losing its essence.</span>
            </div>

            <div className='second__container'>
                <h1>INSTANT TRANSLATIONS</h1>
                <p>Select a language, enter your text, and watch as it transforms before your eyes. Our tool even provides a pronunciation guide for those pronunciation-perplexing phrases. Try it out now!</p>
            </div>
        </div>
    )
}
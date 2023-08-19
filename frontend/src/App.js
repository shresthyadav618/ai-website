
import './App.css';
import Form from "./components/Form";
import TopComponent from './components/TopComponent';
import MiddleComponent from "./components/middleContainer";
import GeneratorForm from "./components/poemForm";
function App() {

 
  return (
    <div className="App flex flex-col">
      <TopComponent/>
      <MiddleComponent/>
      <GeneratorForm/>
     <Form/>
    </div>
  );
}

export default App;

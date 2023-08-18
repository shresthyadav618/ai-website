
import './App.css';
import Form from "./components/Form";
import TopComponent from './components/TopComponent';
import MiddleComponent from "./components/middleContainer";
function App() {

 
  return (
    <div className="App flex flex-col">
      <TopComponent/>
      <MiddleComponent/>
     <Form/>
    </div>
  );
}

export default App;

import "./App.css";
import Banner from "./component/Banner";
import Contact from "./component/Contact";
import Projects from "./component/Projects";
import Skills from "./component/Skills";

function App() {
  return (
    <div className="App">
      <Banner />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;

import "./App.css";
import Banner from "./component/Banner";
import Comments from "./component/Comments";
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
      <Comments/>
    </div>
  );
}

export default App;

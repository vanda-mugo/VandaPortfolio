import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Banner } from './components/Banner/Banner';
import { Skills } from './components/Skills/Skills';
import { Services } from './components/Services/Services';
import { Experience } from './components/Experience/Experience';
import SplashCursor from  './components/SplashCursor/SplashCursor';

function App() {

  return (
    <div className='App'>
      < SplashCursor />
      <NavBar />
      <Banner />
      < Skills />
      <Services />
      <Experience />
    </div>
  )
}

export default App


//      < SplashCursor />

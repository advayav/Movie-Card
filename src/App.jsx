import './css/App.css'
//import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from './context/MovieContext';

//Component: function in javascript that returns jsx code(looks like html) always start with a capital letter
//Can only have one root element being returned so for eg having more than one <div></div> at the same level will give an error
//Fix this by returning a fragment with div inside it <></>
function App() {

  return (
    <MovieProvider>
      <NavBar />
       <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* define the route and the path is defined with / so that means that it will be the webpage and then the /
              the page it will go to will be the home page
          */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App

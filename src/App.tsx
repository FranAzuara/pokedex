import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokemonInfo from "./pages/PokemonInfo";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonInfo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;

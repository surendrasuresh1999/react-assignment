import Navbar from "./Components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MovieComponentFun from "./Components/MovieComponent";
import MovieDetails from "./Components/MovieDetails";

const App = () => {
  return(
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path="/" element={<MovieComponentFun />} />
        <Route exact path="/show/:id/*" element={<MovieDetails />} />
      </Routes>
 </BrowserRouter>
  )
}

export default App;
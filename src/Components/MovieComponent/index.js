import { Fragment, useState, useEffect } from "react";
import Card from "../MovieCard";
import Loader from "../LoaderComponent";
const MovieComponentFun = () => {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
   const getMoviesData = async () => {
    const API = "https://api.tvmaze.com/search/shows?q=all"
    const response = await fetch(API);
    const responseData = await response.json();
    setMovieData(responseData)
    setLoading(true)
   }
   getMoviesData();
  },[])

  return(
    <>
      {
        isLoading ? <Fragment>
        <div className="container">
          <h1 className="my-3 heading">All Movies</h1>
          <div className="row">
            {
              movieData.map((data,index)=>(
                <div key={index} className="col-12 col-md-4 col-lg-3 pb-4">
                  <Card movieData={data} />
                </div>
              ))
            }
          </div>
        </div>
    </Fragment> : <Loader />
      }
    </>
    
  )
}

export default MovieComponentFun;
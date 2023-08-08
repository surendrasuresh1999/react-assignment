import React from 'react'
import { Link } from 'react-router-dom';
import noImage from "../../assets/no-image.jpg"
const Card = (props) => {
    const {movieData} = props;
    const {image,name,status,language,id} = movieData.show;
    const hexCode = status === "Running" ? "#12fc29" : status !== "Ended" ? "#7bc0d4" : "#f22947";
  return (
    <div className="card">
        <img src={`${image === null ? noImage :image?.medium}`} className="card-img-top" alt="..." height={250} />
        <div className="card-body">
            <h5 className="card-title mb-0">{name}</h5>
            <div className='d-flex align-items-center'>
                <p className='status'>status: {status}</p>
                <div className='rounded-circle' style={{backgroundColor:`${hexCode}`,height:"12px",width:"12px",marginLeft:'4px'}}></div>
            </div>
            <p className='language mb-2'>language: {language}</p>
            <Link to={`/show/${id}/${name.split(" ").join("-")}`}>
                <button className="btn btn-primary">See More &rarr;</button>
            </Link>
        </div>
    </div>
  )
}

export default Card
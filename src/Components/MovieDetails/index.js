    import {Fragment, useState, useEffect} from 'react'
    import { useParams } from "react-router-dom";
    import noImage from "../../assets/no-image.jpg"
    import Loader from '../LoaderComponent';
    const GenderData = [
        {
        id:1,
        lable: "Men",
        value: "men",
        },
        {
        id:2,
        lable: "Women",
        value: "women",
        },
        {
            id:3,
            lable: "Other",
            value: "other",
        }
    ]
    const MovieDetails = () => {
        const { id } = useParams();
        const [isFetching, setFetching] = useState(false);
        const [userName, setUserName] = useState('');
        const [gender, setGender] = useState('men');
        const [isToaster, setToaster] = useState(false);
        const [movieDetailsData, setMovieDetailsData] = useState({});
        
        useEffect(()=>{
            // note: actually this is not good way to fetching particular movie details, as of now i implemented like this because of api is not accepting dynamic id values are something that's why i implemented like this way...
            // correct way is to pass the particular movie id for api and fetch the data and rest of the process is same this is actual way to fetch dynamic routes data... 
            const getShowDetailData = async () => {
                const API = "https://api.tvmaze.com/search/shows?q=all"
                const response = await fetch(API);
                const responseData = await response.json();
                const pageData = responseData.find(data => data?.show?.id === parseInt(id));
                setMovieDetailsData(pageData.show)
                setFetching(true)
            }
            getShowDetailData();
        },[id])

        const handleFormSubmit = (event) => {
            event.preventDefault()

            const payLoad ={
                name:userName,
                gender:gender
            }
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = [...existingUsers, payLoad];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUserName('')
            setToaster(true);
            setTimeout(()=>{
                setToaster(false)
            },6000);
        }

        const handleUserName = (event) =>{
            setUserName(event.target.value)
        }

    return (
        <Fragment>
            <div className='container'>
                {
                    isFetching ? (
                    <Fragment>
                        <h1 className='my-3 my-md-5 heading'>{movieDetailsData.name} Movie</h1>
                        <div className='row'>
                            <div className='col-12 col-md-8 mb-3 mb-md-0'>
                                <div className='d-flex flex-column flex-md-row'>
                                    <img src={`${movieDetailsData.image === null ? noImage :movieDetailsData.image?.original}`} alt="cover" className='col-12 col-md-4 rounded-2' height={350}/>
                                    <div className='col-12 col-md-8 py-3 py-md-0 px-md-5'>
                                        <div className='summary-content' dangerouslySetInnerHTML={{ __html: movieDetailsData.summary }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-4 pb-4 pt-2 information-container'>
                                <h1 className='fs-3 text-secondary'>Movie Information</h1>
                                <div className='py-1 d-flex flex-column'>
                                    {movieDetailsData.network && <p><b>Network:</b> {movieDetailsData.network?.name}</p>}
                                    {movieDetailsData.schedule &&
                                    <p>
                                        <b>Schedule: </b> 
                                        {movieDetailsData.schedule?.time}{" "}
                                        {
                                            movieDetailsData.schedule.days?.map((day)=>(
                                                <span key={day}>{day} </span>
                                            ))
                                        }
                                        
                                    </p>}
                                    {movieDetailsData.language && <p><b>Language:</b> {movieDetailsData.language}</p>}
                                    {movieDetailsData.status && <p><b>Status:</b> {movieDetailsData.status}</p>}
                                    {movieDetailsData.type && <p><b>Show Type:</b> {movieDetailsData.type}</p>}
                                    {movieDetailsData.genres && <p><b>Genres:</b> {
                                            movieDetailsData.genres.map((genere)=>(
                                                <span key={genere}>{genere}{" "}</span>
                                            ))
                                        }
                                        </p>
                                    }
                                    
                                    {/* <!-- Button trigger modal --> */}
                                    <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Book Ticket Now
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">{movieDetailsData.name} Movie</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <form onSubmit={handleFormSubmit}>
                                                <div className="modal-body">
                                                    <div className='d-flex flex-wrap row-gap-3 gap-3 pb-3'>
                                                        <div>
                                                        {movieDetailsData.language && <p><b>Language:</b> {movieDetailsData.language}</p>}
                                                        </div>
                                                        <div>
                                                        {movieDetailsData.status && <p><b>Status:</b> {movieDetailsData.status}</p>}
                                                        </div>
                                                        <div>
                                                        {movieDetailsData.genres && <p><b>Genres:</b> {
                                                                movieDetailsData.genres.map((genere)=>(
                                                                    <span key={genere}>{genere}{" "}</span>
                                                                ))
                                                            }
                                                            </p>
                                                        }
                                                        </div>
                                                    </div>
                                                    <div className='d-flex flex-column flex-md-row gap-md-4'>
                                                        <div className='d-flex flex-column mb-3 mb-md-0'>
                                                            <label htmlFor='name'>Name:</label>
                                                            <input onChange={handleUserName} type='text' name='name' value={userName} placeholder='Enter Name' id='name' className='user-name-input'/>
                                                        </div>
                                                        <div className='d-flex flex-column gender-container'>
                                                            <label htmlFor="gender" className="form-lable">Gender:</label>
                                                            <select onChange={(event)=>setGender(event.target.value)} name="gender" id="gender" className='select-gender'>
                                                            {GenderData.map(data=>(
                                                                <option key={data.id} selected={gender === data.value} value={data.value}>{data.lable}</option>
                                                            ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        {isToaster && (
                            <div className={`toaster d-flex align-items-center justify-content-between py-4 px-1 ${isToaster ? 'show' : ''}`}>
                                <p className='text-success success-title'>
                                   Your ticket is confirmed, Thank you!
                                </p>
                                <button class="close" type="button" onClick={()=>setToaster(false)}>&#x2715;</button>
                            </div>
                        )}
                    </Fragment>
                    )
                    : <Loader />
                }
            </div>
        </Fragment>
    )
    }

    export default MovieDetails;
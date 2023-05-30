import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateReading from './UpdateReading';
import DeleteReading from './DeleteReading';
import { FaRegThumbsUp, FaRegThumbsDown} from "react-icons/fa";
import { RiBookmarkFill } from "react-icons/ri";
import MoreDetails from './MoreDetails';

import './reading.css';
//import { FaGrLike } from 'react-icons/fa';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reading() {
	const [obj, setObj] = useState([]);
	const [readinglist, setreadinglist] = useState([]);
	const [showUpdate, setshowUpdate] = useState(false);
	const [showFlagDelet, setshowFlagDelet] = useState(false);
	const [showDetails, setshowDetails] = useState(false);
	function handleshowUpdate(item) {
		setshowUpdate(true);
         
		 setObj(item);
		
	}
	function handleCloseUpdate() {
		setshowUpdate(false);
	}
	function handleshowDelet(item) {
		setshowFlagDelet(true);
         
		 setObj(item);
		 
	}
	function handleCloseFlagDelet() {
		setshowFlagDelet(false);
	}
	//
	function handleshowDetails(item) {
		setshowDetails(true);
         
		 setObj(item);
		 
	}
	function handleCloseDetails() {
		setshowDetails(false);
	}
	function getTheList() {
		const serverurl = `${process.env.REACT_APP_ServerURL}/readingnow`;
		axios(serverurl)
			.then(result => {

				setreadinglist(result.data);
				console.log(result.data);

			})
			.catch(error => {
				console.log(`there is something error`);
			})
	}

	useEffect(() => {
		getTheList()
	}, []);

	return (
		<div className="card-continar" style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center'}}>
		<>
		
			{readinglist.map(item => {
                  
				return (
<>                     
					<div className="card border-primary mb-3 card" style={{ maxWidth: "20rem" }} key={item.id}>
						<h5 className="card-header title text-color">{item.title}</h5>
						<div className="card-body">
							<img className="img" src={item.book_image} alt="book cover image"/>
							<p className='author' >-- {item.author}</p>
							<div className="continar ">
								<p>Finshing Reading</p>
							{
								item.finsh_reading ? <span className="text-color">Yes</span>
									: <span className="text-color"> No</span>

							}
							</div>
							<div className="continar">
							<p >Recommend This Book?</p>
							{
								item.recommindation ? <span className="thumb text-color"> <FaRegThumbsUp /></span>
                               :
							   <span className="thumb text-color"> <FaRegThumbsDown /></span>	

							}
							</div>
							
							<div className="continar">
							<p >Book Mark</p>
							<p >{item.book_mark}<span className="spanBookMark text-color"><RiBookmarkFill/></span></p>
							
							</div>
							<a href="#" className="continar color-blue" onClick={() => { handleshowDetails(item) }}>More Details</a>
							<div className="continar btn-containar">
							<button type="button" className="btn btn-outline-primary" onClick={() => { handleshowUpdate(item) }}>Update</button>
							<button type="button" className="btn btn-outline-danger" onClick={() => { handleshowDelet(item) }}>Delete</button>
	                         </div>
						</div>

					</div>
					<MoreDetails showDetails={showDetails} handleshowDetails={handleshowDetails} handleCloseDetails={handleCloseDetails} item={obj}/>
					<UpdateReading showUpdate={showUpdate} handleshowUpdate={handleshowUpdate} handleCloseUpdate={handleCloseUpdate} item={obj} getTheList={getTheList}/>
					<DeleteReading showFlagDelet={showFlagDelet} handleshowDelet={handleshowDelet} handleCloseFlagDelet={handleCloseFlagDelet} item={obj} getTheList={getTheList}/>
					</>
				);
			})}
		</>
		</div>
	)
}
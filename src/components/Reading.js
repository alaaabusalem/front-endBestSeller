import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateReading from './UpdateReading';
import DeleteReading from './DeleteReading';

import './reading.css';
//import { FaGrLike } from 'react-icons/fa';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function Reading() {
	const [obj, setObj] = useState([]);
	const [readinglist, setreadinglist] = useState([]);
	const [showUpdate, setshowUpdate] = useState(false);
	const [showFlagDelet, setshowFlagDelet] = useState(false);
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
	let arrayForQouts = [];
	function quotsList(qouts) {
		qouts.forEach(element => {
			arrayForQouts.push(<p className="card-text">{element}</p>);
		});
		return (<div>{arrayForQouts}</div>)
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
						<div className="card-header title">{item.title}</div>
						<div className="card-body">
							<img className="img" src={item.book_image} alt="book cover image"/>
							<div className="continar pad-top">
							<p>qouts</p>
							{
								item.qouts === null ? <p>No</p>
									:
									<div>{quotsList(item.qouts)}</div>
							}
                            </div>
							<div className="continar">
								<p>finsh reading?</p>
							{
								item.finsh_reading ? <span style={{ backgroundColor: "green" }}>Yes</span>
									: <span style={{ backgroundColor: "red" }}> No</span>

							}
							</div>
							<div className="continar">
							<p >Recommend this Book?</p>
							{
								// item.recommindation ? <span style={{ backgroundColor: "green" }}>yes</span>:
								// <span>
                                // <FaGrLike title="GrLike" />
                                // </span>
									

							}
							</div>
							<div className="continar">
							<p >Your opinion about this book</p>
							<p >{item.opinion}</p>
							</div>
							<div className="continar">
							<p >book mark</p>
							<p >{item.book_mark}</p>
							</div>
							<div className="continar btn-containar">
							<button type="button" className="btn btn-outline-primary" onClick={() => { handleshowUpdate(item) }}>Update</button>
							<button type="button" className="btn btn-outline-danger" onClick={() => { handleshowDelet(item) }}>Delete</button>
	                         </div>
						</div>

					</div>
					<UpdateReading showUpdate={showUpdate} handleshowUpdate={handleshowUpdate} handleCloseUpdate={handleCloseUpdate} item={obj} getTheList={getTheList}/>
					<DeleteReading showFlagDelet={showFlagDelet} handleshowDelet={handleshowDelet} handleCloseFlagDelet={handleCloseFlagDelet} item={obj} getTheList={getTheList}/>
					</>
				);
			})}
		</>
		</div>
	)
}
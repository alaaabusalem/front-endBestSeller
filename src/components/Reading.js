import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateReading from './UpdateReading';
import DeleteReading from './DeleteReading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
		<div style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center'}}>
		<>
			{readinglist.map(item => {
                  
				return (
<>                     
					<div className="card border-primary mb-3" style={{ maxWidth: "20rem" }} key={item.id}>
						<div className="card-header">{item.title}</div>
						<div className="card-body">
							<img src={item.book_image} alt="book cover image" style={{ width: "100%", height: "350px", objectFit: "cover" }}/>
							<p className="text-secondary">qouts I liked from this book</p>
							{
								item.qouts === null ? <p className="text-info"> There is No qouts addedd yet</p>
									:
									<div>{quotsList(item.qouts)}</div>
							}

							{
								item.finsh_reading ? <span style={{ backgroundColor: "green" }}>finshed reading</span>
									: <span style={{ backgroundColor: "red" }}> Not finshing reading</span>

							}
							<p className="text-secondary">Recommend this Book?</p>
							{
								item.recommindation ? <span style={{ backgroundColor: "green" }}>yes</span>
									: <span style={{ backgroundColor: "red" }}> No</span>

							}
							<p className="text-secondary">Your opinion about this book</p>
							<p className="text-info">{item.opinion}</p>
							<p className="text-secondary">book mark</p>
							<p className="text-info">{item.book_mark}</p>
							<button type="button" className="btn btn-outline-primary" onClick={() => { handleshowUpdate(item) }}>Update</button>
							<button type="button" className="btn btn-outline-danger" onClick={() => { handleshowDelet(item) }}>Delete</button>
	
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
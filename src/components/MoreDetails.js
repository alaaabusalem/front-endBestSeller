import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './MoreDetails.css'
function MoreDetails(props) {
   
    return (
        <>
            <Modal show={props.showDetails} onHide={props.handleCloseDetails} Key={props.item.id} className="details-main " style={{background:"#000080"}}>
                <Modal.Header closeButton  className='details-header'>
                  
                </Modal.Header>
                <Modal.Body className='details-body'>
                <div className="details-continar">
                <div className="">
							<h3>Book Description</h3>
                            {
								props.item.descrip === "" || null || " "? <p className='details-text'>There is No Description </p>
									:
									<p className='details-text'>{props.item.descrip}</p>
							}
                            </div>
                            <br ></br>
                <div className="">
							<h3>Your opinion about this Book</h3>
							{
								props.item.opinion === null ? <p className='details-text'>You don't share your opinion yet</p>
									:
									<div className='details-text'>{props.item.opinion}</div>
							}
                            </div>
                            <br ></br>
                            <div className="">
							<h3>Qouts You Like From this book</h3>
							{
								props.item.qouts === null ? <p className='details-text'>there is No Qouts yet.</p>
									:
									<div className='details-text'>{props.item.qouts}</div>
							}
                            </div>
                            </div>
                </Modal.Body>

            </Modal>
        </>
    )
}
export default MoreDetails;
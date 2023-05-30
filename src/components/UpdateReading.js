import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Updating.css';
function UpdateReading(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
      
        const updatedItem = { ...props.item, qouts: e.target.qouts.value };
      
        if (e.target.finished.checked) {
          updatedItem.finsh_reading = true;
        } else {
          updatedItem.finsh_reading = false;
        }
      
        if (e.target.recommend.checked) {
          updatedItem.recommindation = true;
        } else {
          updatedItem.recommindation = false;
        }
      
        updatedItem.opinion = e.target.opinion.value;
        updatedItem.book_mark = e.target.Book_mark.value;
        const bookMarkValue = e.target.Book_mark.value;
        updatedItem.book_mark = bookMarkValue !== "" ? Number(bookMarkValue) : null;
        console.log(updatedItem);
      
        const serverURL = `${process.env.REACT_APP_ServerURL}/updatemodal`;
        axios
          .put(serverURL, updatedItem)
          .then((response) => {
            console.log("Correct");
            props.getTheList();
          })
          .catch((error) => {
            console.log(error);
          });
      
        props.handleCloseUpdate();
      };
      
    return (
        <>
            <Modal show={props.showUpdate} onHide={props.handleCloseUpdate} style={{background:"#000080"}}>
                <Modal.Header closeButton className='header'>
                    <Modal.Title>{props.item.title}</Modal.Title>

                </Modal.Header>
                <Modal.Body className='body'>
                    <Image src={props.item.book_image} className='imgUdate'></Image>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>qout</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.item.qouts}
                                name="qouts"
                            />
                            {
								props.item.finsh_reading ? <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="finished reading" name="finished" defaultChecked />
                            </Form.Group>
									: <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="finished reading" name="finished" />
                                </Form.Group>

							}
                            {
								props.item.recommindation ?  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="recommend this book" name="recommend" defaultChecked/>
                            </Form.Group>
									:  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="recommend this book" name="recommend"/>
                                </Form.Group>

							}
                           
                            <Form.Label>Your opinion about the book</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.item.opinion}
                                name="opinion"
                            />
                            <Form.Label>Book mark</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.item.book_mark}
                                name="Book_mark"
                            />

                        </Form.Group>
                        <div className='btnContainarUdate continarUpdate'>
                        <Button variant="primary" type="submit" className=" outline"> update</Button>
                        <Button variant="secondary" onClick={props.handleCloseUpdate}> Close</Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdateReading;
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './DeleteReading.css'
function DeleteReading(props) {
    const handelSubmit = (e) => {
        e.preventDefault();


        const serverURL = `${process.env.REACT_APP_ServerURL}/deleteitemfromreading/${props.item.id}`;
        axios.delete(serverURL)
            .then(response => {
                console.log(response.data)
                // props.reloadList(response);
                props.getTheList();
            })
            .catch((error) => {
                console.log(error)
            });
        props.handleCloseFlagDelet();
    }
    return (
        <>
            <Modal show={props.showFlagDelet} onHide={props.handleCloseFlagDelet} Key={props.item.id}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handelSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Are you sure that you want to delete <span className='spanDelete'>{props.item.title}</span> Book?</Form.Label>

                        </Form.Group >
                        <div className='continarDelete'>
                        <Button variant="primary" type="submit" className="btn btn-dark btnContainarDelete">     Yes
                        </Button>
                        <Button variant="secondary btnContainarDelete" onClick={props.handleCloseFlagDelet}>
                            No
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}
export default DeleteReading;
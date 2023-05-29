import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
function UpdateReading(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        //[props.item.qout]=[`${e.target.qout.value}`];
        if (e.target.finished.checked) { [props.item.finsh_reading] = [true] }
        else { [props.item.finsh_reading] = [false]; }
        if (e.target.recommend.checked) { [props.item.recommindation] = [true] }
        else { [props.item.recommindation] = [false]; }
        [props.item.opinion] = [e.target.opinion.value];
        [props.item.book_mark] = [e.target.Book_mark.value];
        console.log(props.item);
        const serverURL = `${process.env.REACT_APP_ServerURL}/updatemodal`;
        axios.put(serverURL, props.item)
            .then(response => {
                console.log("correct");
                //console.log(response);
            props.getTheList();
            })
            .catch((error) => {
                console.log(error)
            });
        props.handleCloseUpdate();
    }
    return (
        <>
            <Modal show={props.showUpdate} onHide={props.handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.title}</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Image src={props.item.book_image} width='50%' height='50%'></Image>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>qout</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.item.qout}
                                name="qout"
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
                        <Button variant="primary" type="submit" className="btn btn-dark"> update</Button>
                        <Button variant="secondary" onClick={props.handleCloseUpdate}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default UpdateReading;
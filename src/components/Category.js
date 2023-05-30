import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaWikipediaW } from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import './reading.css';

function Category() {
    const { content } = useParams();

    const [Categorys, setCategorys] = useState([]);
    const [alertStatus, setAlertStatus] = useState("")
    const [alertId, setAlertId] = useState("")
    const [searchIt,setSearchIt]=useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    function searchItem(item) {
        handleShowModal();
        const serverurl = `https://serverproject-3q4m.onrender.com/search/${item}`;
        axios(serverurl)
            .then(result => {
                console.log(result.data);
                setSearchIt(result.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const getCategorys = async () => {
        try {
            const serverURL = `${process.env.REACT_APP_ServerURL}/category-items?list_name_encoded=${content}`;
            const response = await axios.get(serverURL);
            console.log(response.data);
            setCategorys(response.data);
        } catch (error) {
            console.log(error);
        }
    };

   const addToReading = (item) => {
    setAlertId(item.title)
    const object = {
        book_image: item.book_image,
        title: item.title,
        author: item.author,
        description: item.description,
        buy_links: [item.buy_links[0].url]
    };
    console.log(object);

    const serverURL = `${process.env.REACT_APP_ServerURL}/readingnow`;
    axios.get(serverURL)
        .then(response => {
            const readingList = response.data;
            const bookExists = readingList.some(book => book.title === item.title);

            if (bookExists) {
                console.log("Book already exists in the reading list.");
                setAlertStatus("danger")
            } else {
                const addToReadingURL = `${process.env.REACT_APP_ServerURL}/add-to-reading`;
                axios.post(addToReadingURL, object)
                    .then(response => {
                        console.log(response.data);
                        setAlertStatus("success")
                    })
                    .catch(error => {
                        console.log(error);
                        setAlertStatus("danger")
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

const addToWish = (item) => {
    setAlertId(item.title)
    const object = {
        book_image: item.book_image,
        title: item.title,
        author: item.author,
        description: item.description,
        buy_links: [item.buy_links[0].url]
    }
    console.log(object);

    const serverURL = `${process.env.REACT_APP_ServerURL}/wishlist`;
    axios.get(serverURL)
        .then(response => {
            const readingList = response.data;
            const bookExists = readingList.some(book => book.title === item.title);

            if (bookExists) {
                console.log("Book already exists in the wish list.");
                setAlertStatus("danger")
            } else {
                const addToWishURL = `${process.env.REACT_APP_ServerURL}/add-to-wish`;
                axios.post(addToWishURL, object)
                    .then(response => {
                        console.log(response.data);
                        setAlertStatus("success")
                    })
                    .catch(error => {
                        console.log(error);
                        setAlertStatus("danger")
                    });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

useEffect(() => {
    getCategorys()
}, [])
console.log(alertId);
    return (
        <>
             <Modal show={showModal} onHide={handleCloseModal} style={{background:"#000080"}}>
        <div >
      <Modal.Header closeButton>
  <Modal.Title>{searchIt.title}</Modal.Title>
</Modal.Header>
<Modal.Body>{searchIt.image && <img src={searchIt.image} alt="imageofauther" style={{ height: "200px" }} />}</Modal.Body>
<Modal.Body>{ searchIt.summary && searchIt.summary[0]}</Modal.Body>
<Modal.Body>{searchIt.summary && searchIt.summary[1]}</Modal.Body>
<Modal.Body>{ searchIt.summary && searchIt.summary[2]}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

            <div className="card-continar" style={{ margin: 50, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>

                {Categorys.map(item => {
                    return (
                        <div className="card border-danger mb-3 card" style={{ maxWidth: "20rem" }}>
                
                            <div className="card-header title text-color" style={{display: "flex",flexDirection:"column",justifyContent:"center"}}>{item.title}</div>
                            <div className="card-body">
                                <img className="img" src={item.book_image} alt="about" />
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                <p className='author' >-- {item.author}</p>
                                <Button  variant="btn-outline-primary"  onClick={()=>searchItem(item.author)}>
         <FaWikipediaW />
      </Button>
      </div>
                                <p className="continar" style={{ textAlign: 'left', display: "flex", alignItems: "center" ,height:'100px'}}>{item.description}</p>
                                
                                <p className="buy-link-title" style={{ fontWeight: 'bold' ,textAlign: 'left'}}>Buy Links:</p>
    <div className="buy-links" style={{ marginBottom: '10px' ,textAlign: 'left'}}>
        <a className=" buy-link" href={item.buy_links[0].url}>{item.buy_links[0].name}</a>
        <br />
        <a className=" buy-link" href={item.buy_links[1].url}>{item.buy_links[1].name}</a>
        <br />
    </div>
  
    <div className='continar btn-containar' style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', bottom: 0, width: '100%' }}>
    <button type="button" className="btn btn-outline-primary" onClick={() => { addToReading(item) }}>Add To List</button>
    <button type="button" className="btn btn-outline-primary" onClick={() => addToWish(item)}>Wishlist</button>
</div>
{(alertStatus == "success" && item.title==alertId) ?
                <Alert variant={alertStatus}>
                    The Book has been added to the list !
                    <Button onClick={() => { setAlertStatus('') }}>Close</Button>
                </Alert>
                : (alertStatus == "danger" && item.title==alertId) ?
                    <Alert variant={alertStatus}>
                        The Book already exists in the list !
                        <Button onClick={() => { setAlertStatus('') }}>Close</Button>
                    </Alert>
                    :
                    <></>}

                               
                            </div>
                      

                        </div>
                        
                    );
                    
                })}
            </div>
        </>
    )
}
export default Category;
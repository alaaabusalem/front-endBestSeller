import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaWikipediaW } from "react-icons/fa";
import './reading.css';
export default function WishList() {
  
const [WishList,setWishList]=useState([]);
const [searchIt,setSearchIt]=useState([]);
const [showModal, setShowModal] = useState(false);
const handleCloseModal = () => setShowModal(false);
const handleShowModal = () => setShowModal(true);
    function getTheList() {
        const serverurl = `${process.env.REACT_APP_ServerURL}/wishlist`;
        axios(serverurl)
            .then(result => {
                console.log(result.data);
                setWishList(result.data);
            })
            .catch(error => {
                console.log(`there is something error`);
            })
    }
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

  const deleteFromWish = (bookid) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      const serverurl = `${process.env.REACT_APP_ServerURL}/deleteitemfromwish/${bookid}`;
      axios
        .delete(serverurl)
        .then(response => {
          getTheList();
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

    const addToReading = (item) => {
      const serverurl = `${process.env.REACT_APP_ServerURL}/deleteitemfromwish/${item.id}`;
      axios
        .delete(serverurl)
        .then(response => {
          getTheList();
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    const object = {
      book_image: item.book_image,
      title: item.title,
      author: item.author,
      description: item.description,
      buy_links: [item.buy_links[0].url]
    };
    console.log(object);

    // Check if the book already exists in the reading list
    const serverURL = `${process.env.REACT_APP_ServerURL}/readingnow`;
    axios.get(serverURL)
      .then(response => {
        const readingList = response.data;
        const bookExists = readingList.some(book => book.title === item.title);

        if (bookExists) {
          console.log('Book already exists in the reading list.');
        } else {
          const confirmation = window.confirm('Are you sure you want to add this item to the reading list?');
          if (confirmation) {
            const addToReadingURL = `${process.env.REACT_APP_ServerURL}/add-to-reading`;
            axios
              .post(addToReadingURL, object)
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  
    useEffect(() => {
        getTheList()
    }, []);

	console.log(searchIt);
    return (
        <>
<div style={{ margin: 50, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>

  {WishList.map(item => {
    return (
      <div className="card border-primary mb-3 card" style={{ maxWidth: "20rem" }}>
        

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
        <div className="card-header title text-color"  >{item.title}</div>
        <img src={item.book_image} alt={item.title} className="img" />
        <div className="card-body" >
          <div style={{display:"flex",justifyContent:"space-between"}}>
        <p className='author' >-- {item.author}</p>
        <Button  variant="btn-outline-primary"  onClick={()=>searchItem(item.author)}>
         <FaWikipediaW />
      </Button>
      </div>
        
      <p className="card-text" style={{ textAlign: 'left', height: "130px", display: "flex", alignItems: "center" }}>{item.descrip}</p>
         
          <div className='continar btn-containar'>
          <button type="button" className="btn btn-outline-primary" onClick={() => { addToReading(item) }}>Add to List</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => { deleteFromWish(item.id) }}>Delete</button>
          </div>
        </div>
      </div>
    );
  })}
</div>
        </>
    )
}
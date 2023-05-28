import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WishList() {
	
const [WishList,setWishList]=useState([]);
    function getTheList() {
        const serverurl = `${process.env.REACT_APP_ServerURL}/wishlist`;
		//const serverurl = `https://project-0mbl.onrender.com/category-items?list_name_encoded=hardcover-fiction`;
        axios(serverurl)
            .then(result => {
                console.log(result.data);
                setWishList(result.data);
            })
            .catch(error => {
                console.log(`there is something error`);
            })
    }


	const deleteFromWish = (bookid) => {

        const serverurl = `${process.env.REACT_APP_ServerURL}/deleteitemfromwish/${bookid}`;
        axios.delete(serverurl)
            .then(response => {
                getTheList()
                console.log(response.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }

	const addToReading = () => {

        const serverurl = `${process.env.REACT_APP_ServerURL}/add-to-reading`;
        axios.post(serverurl)
            .then(response => {
                getTheList()
                console.log(response.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTheList()
    }, []);

	
    return (
        <>
		<h1>Wish List page</h1>
		{WishList.map(item=>{
      return (
        <div className="card border-primary mb-3" style={{maxWidth:"20rem"}}>
        <div className="card-header">{item.author}</div>
		<img src={item.book_image} alt={item.title}/>
        <div className="card-body">
          <h1 className="card-title">{item.title}</h1>
          <p className="card-text">{item.descrip}</p>
		 <div>
		 <button type="button" className="btn btn-primary" onClick={() => { deleteFromWish(item.id) }}>Delete</button>
		 <button type="button" className="btn btn-primary" onClick={() => { addToReading(item.id) }}>Add to Reading List</button>
		 </div>
		  
        </div>
        </div>
        );
     })}
        </>
    )
}
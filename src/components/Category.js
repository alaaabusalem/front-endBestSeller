import axios from "axios";
import { useEffect, useState } from 'react';


function Category({category}) {

        
    const [Categorys, setCategorys] = useState([]);

    let books


    const getCategorys = () => {
        const serverURL = `${process.env.REACT_APP_ServerURL}/category-items?list_name_encoded=${category}`;
        axios.get(serverURL)
            .then(response => {
                console.log(response.data)
                setCategorys(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const addToReading = (item) => {
        
        const object={
            book_image:item.book_image,
            title:item.title,
            author:item.author,
            description:item.description,
            buy_links:[item.buy_links[0].url]
        }
        console.log(object)
        const serverURL = `${process.env.REACT_APP_ServerURL}/add-to-reading`;
        axios.post(serverURL, object)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)

            })
    }

    const addToWish = (item) => {
        const serverURL = `${process.env.REACT_APP_ServerURL}/add-to-wish`;
        axios.post(serverURL, item)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)

            })
    }

    useEffect(() => {
        getCategorys()
    }, [])
    return(
        <>
        <div style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center' }}>
         {Categorys.map(item=>{
      return (
        <div className="card border-danger mb-3" style={{maxWidth:"20rem"}}>
        <div className="card-header">{item.author}</div>
        <img src={item.book_image} alt="about"/>
        <div className="card-body">
          <h4 className="card-title">{item.title}</h4>
          <p className="card-text">{item.description}</p>
          
            <a className="card-text" href={item.buy_links[0].url}>{item.buy_links[0].name}</a><br/>
            <a className="card-text" href={item.buy_links[1].url}>{item.buy_links[1].name}</a><br/>
            <button type="button" className="btn btn-outline-primary" onClick={() => { addToReading(item) }}>Now I' Reading</button>
        </div>
        </div>
        );
     })}
     </div>
        </>
    )
}
export default Category;
import axios from "axios";
import { useEffect, useState } from 'react';
function Category({category}) {
    const [Categorys, setCategorys] = useState([]);
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
    useEffect(() => {
        getCategorys()
    }, [])
    return(
        <>
         {Categorys.map(item=>{
      return (
        <div className="card border-danger mb-3" style={{maxWidth:"20rem"}}>
        <div className="card-header">{item.author}</div>
        <img src={item.book_image} alt="about"/>
        <div className="card-body">
          <h4 className="card-title">{item.title}</h4>
          <p className="card-text">{item.description}</p>
          <p className="card-text">{item.buy_links[0].url}</p>
        </div>
        </div>
        );
     })}
        </>
    )
}
export default Category;
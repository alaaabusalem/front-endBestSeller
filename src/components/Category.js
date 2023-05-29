import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import './reading.css';

function Category() {
    const { content } = useParams();

    const [Categorys, setCategorys] = useState([]);
    const [alertStatus, setAlertStatus] = useState("")



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


    return (
        <>
            {alertStatus == "success" ?
                <Alert variant={alertStatus}>
                    The Book has been added to the list !
                    <Button onClick={() => { setAlertStatus('') }}>Close</Button>
                </Alert>
                : alertStatus == "danger" ?
                    <Alert variant={alertStatus}>
                        The Book already exists in the list !
                        <Button onClick={() => { setAlertStatus('') }}>Close</Button>
                    </Alert>
                    :
                    <></>}

            <div className="card-continar" style={{ margin: 50, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>

                {Categorys.map(item => {
                    return (
                        <div className="card border-danger mb-3" style={{ maxWidth: "20rem" }}>
                            <div className="card-header">{item.author}</div>
                            <div className="card-body">
                                <img className="img" src={item.book_image} alt="about" style={{ width: "100%", height: "350px", objectFit: "cover" }} />
                                <h4 className="card-title">{item.title}</h4>
                                <p className="card-text">{item.description}</p>

                                <a className="card-text" href={item.buy_links[0].url}>{item.buy_links[0].name}</a><br />
                                <a className="card-text" href={item.buy_links[1].url}>{item.buy_links[1].name}</a><br />

                                <div className="continar">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => { addToReading(item) }}>Now I' Reading</button>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => addToWish(item)}>wish list</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default Category;
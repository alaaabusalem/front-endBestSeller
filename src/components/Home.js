import axios from "axios";
import { useState, useEffect } from 'react';
import c1 from '../assets/c1.svg'
import c2 from '../assets/c2.svg'
import c3 from '../assets/c3.svg'
import c44 from '../assets/c44.svg'
import c5 from '../assets/c5.svg'
import c6 from '../assets/c6.svg'
import c7 from '../assets/c7.svg'
import c8 from '../assets/c8.svg'
const logoStyle = {
	width: '130px',
	height: 'auto',
	borderRadius: '40%',
};
const Card = ({ borderClass, title, content,image }) => {
  return (
    <div className={`card ${borderClass} mb-3`} style={{ maxWidth: '20rem' }}>
      <div className="card-header">Header</div>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
				<img src={image} alt="book logo" style={logoStyle} />
        {/* <p className="card-text">{content}</p> */}
      </div>
    </div>
  );
};
export default function Home() {
  const [category, setCategory] = useState([]);

  // const getCategory = () => {
  //   const url = `${process.env.REACT_APP_serverURL}`;
  //   axios(url)
  //     .then(res => {
  //       setCategory(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       if (axios.isAxiosError(error)) {
  //         console.log('Axios error:', error.response);
  //       } else {
  //         console.log('Error:', error.message);
  //       }
  //     });
  // }
	// console.log(category);
  // useEffect(() => {
  //   getCategory();
  // }, []);

  return (
    <>
      

			<div style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center' }}>
      <Card borderClass="border-primary" image={c1} title="Food and Fitness" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-secondary" image={c2} title="Education" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-success" image={c3} title="Games and Activities" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-danger" image={c44} title="Health" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-warning" image={c5} title="Family" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-info" image={c6} title="Science" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-light" image={c7} title="Sports" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
      <Card borderClass="border-dark" image={c8} title="Travel" content="Some quick example text to build on the card title and make up the bulk of the card's content." />
    </div>
    </>
  );
}

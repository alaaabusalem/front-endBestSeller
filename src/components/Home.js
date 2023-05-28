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
import Category from "./Category";
const logoStyle = {
	width: '130px',
	height: 'auto',
	borderRadius: '40%',
};


export default function Home() {
	const [selectCategory, setSelectCategory]=useState(false)
  const [category, setCategory] = useState('');
	const Card = ({ borderClass, title, content,image }) => {
		function handelClike (){
			setSelectCategory(true);
			console.log(content);
			setCategory(content);
			}
		return (
			<div onClick={()=>handelClike()} className={`card ${borderClass} mb-3`} style={{ maxWidth: '20rem' }}>
				<div className="card-header">{title}</div>
				<div className="card-body">
					{/* <h4 className="card-title">{title}</h4> */}
					<img src={image} alt="book logo" style={logoStyle} />
					{/* <p className="card-text">{content}</p> */}
				</div>
			</div>
		);
	};

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
      
{ !selectCategory ?
			<div style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center' }}>
      <Card  borderClass="border-primary" image={c1} title="Food and Fitness" content="food-and-fitness" />
      <Card borderClass="border-secondary" image={c2} title="Education" content="education" />
      <Card borderClass="border-success" image={c3} title="Games and Activities" content="games-and-activities" />
      <Card borderClass="border-danger" image={c44} title="Health" content="health" />
      <Card borderClass="border-warning" image={c5} title="Family" content="family" />
      <Card borderClass="border-info" image={c6} title="Science" content="science" />
      <Card borderClass="border-light" image={c7} title="Sports" content="sports" />
      <Card borderClass="border-dark" image={c8} title="Travel" content="travel" />
    </div>
		: <Category category={category} />}
    </>
  );
}

import { useState, useRef,useEffect  } from 'react';
import Tilt from "react-parallax-tilt";
import Type from "./Type";
import { TweenMax,gsap} from 'gsap';
import c1 from '../assets/c1.svg'
import c2 from '../assets/c2.svg'
import c3 from '../assets/c3.svg'
import c44 from '../assets/c44.svg'
import c5 from '../assets/c5.svg'
import c6 from '../assets/c6.svg'
import c7 from '../assets/c7.svg'
import c8 from '../assets/c8.svg'
import b1 from '../assets/b1.svg'
import b2 from '../assets/b2.svg'
import b3 from '../assets/b3.svg'
import b4 from '../assets/b4.svg'
import Category from "./Category";
import { Container, Row, Col } from "react-bootstrap";
import './home.css'
const logoStyle = {
	width: '130px',
	height: 'auto',
	borderRadius: '40%',
};


export default function Home() {
  let laplItem= useRef(null);
	const [selectCategory, setSelectCategory]=useState(false)
  const [category, setCategory] = useState('');
  useEffect (()=>{
    
    TweenMax.fromTo(laplItem,4,{rotate:0,duration:2,ease:"sine.inOut" },{ rotate:10,duration:2,repeat:-1, yoyo:true,ease:"sine.inOut"})
  },[])
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
      <>
      <Container fluid className="home-about-section" >
      <Container>
        <Row>
          <Col md={20} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
            Welcome <span className="purple"> to Our Book </span> Website
            </h1>
            <p className="home-about-body">
            Explore our vast collection of fiction and non-fiction books 
              <br />
              <br />Find your next favorite read and get lost in captivating stories
              <i>
                <b className="purple"> Stay updated with the latest releases and literary news </b>
              </i>
              <Type />
            </p>
          </Col>
        </Row>
        <img  ref={el =>{laplItem=el}} src={b4} alt='animation' style={{ width: "400px", height: "350px" }} />
      </Container>
    </Container>
			<div style={{ margin:50,display: 'flex', flexWrap: 'wrap', gap: '20px',justifyContent: 'center'}}>
      <Card  borderClass="border-secondary" image={c1} title="Food and Fitness" content="food-and-fitness" />
      <Card borderClass="border-secondary" image={c2} title="Education" content="education" />
      <Card borderClass="border-secondary" image={c3} title="Games and Activities" content="games-and-activities" />
      <Card borderClass="border-secondary" image={c44} title="Health" content="health" />
      <Card borderClass="border-secondary" image={c5} title="Family" content="family" />
      <Card borderClass="border-secondary" image={c6} title="Science" content="science" />
      <Card borderClass="border-secondary" image={c7} title="Sports" content="sports" />
      <Card borderClass="border-secondary" image={c8} title="Travel" content="travel" />
    </div>
    </>
		: <Category category={category} />}
    </>
  );
}

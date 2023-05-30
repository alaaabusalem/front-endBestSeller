import "./About.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import alaa from '../assets/alaa.png'
import yaman from '../assets/yaman.png'
import ammar from '../assets/ammar.png'
import anas from '../assets/anas.png'

function About() {

    return (
        <>
            <h1 id="h1"><strong>Best Sellers Helper</strong></h1> <br />
            <p id="p">Welcome to <b>Best Sellers Helper</b> - your gateway to the world of reading!
            </p>

            <p id="p">At Best Sellers Helper, we believe books have the power to transport us to different worlds,
                spark our imaginations, and expand our knowledge.
                We are an online books site dedicated to connecting book lovers with a wide range of literary treasures from all different genres,
                eras and categories.
            </p>

            <p id="p">Our mission is to provide a virtual haven for book lovers,
                where they can explore, discover and immerse themselves in the magic of words.
                With a library of digital books, we strive to cater to all reading preferences, from exciting books like food, sports,
                education, games or health books etc...
            </p>

            <p id="p">The site also contains a reading now page that helps with reading in terms of putting quotes that you like in each book, 
            or you can put the page number you reached in each book. 
            And after completing the book, you can delete it from the list and start in other books and Through the site, 
            you can find the books you want to buy from the following sites (Amazon, Apple Books).
            </p>


            <p id="p">You can now join us today and immerse yourself in the boundless world of books.
                Let Best Sellers Helper be your trusted companion as you unravel stories, expand your horizons, and embark on endless adventures.
            </p>

            <div>
                <p className="text-warning" id="d"><b>Team Members</b></p>
                <div className="cardTeam">
                <Card className="cardBorder" style={{ width: '18rem'}}>
                    <Card.Img variant="top" src={yaman} />
                    <Card.Body>
                        <Card.Title className="text-warning">Yaman Ayoun</Card.Title>
                        <Card.Text>
                        Software engineer, I studied at Luminus University, and now I studying at ASAC to become a full stack developer in .NET .
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cardBorder" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={ammar} />
                    <Card.Body>
                        <Card.Title className="text-warning">Ammar Tarawneh</Card.Title>
                        <Card.Text>
                        Junior Full stack developer, studying .Net at ASAC, well experienced as a teacher, and interested to learn any new thing.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cardBorder" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={alaa} />
                    <Card.Body>
                        <Card.Title className="text-warning">Ala' Abusalem</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="cardBorder" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={anas} />
                    <Card.Body>
                        <Card.Title className="text-warning">Anas Al Shammah</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </div>
            </div>
            
        </>
    )
}

export default About;
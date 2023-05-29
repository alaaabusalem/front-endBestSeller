import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  image: {
    width: '100px',
    height: 'auto',
    marginRight: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  author: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  description: {
    fontSize: '14px',
  },
};

export default function Search() {
  const { searchTerm } = useParams();
  const [wishList, setWishList] = useState([]);
	const [readinglist, setreadinglist] = useState([]);
	console.log(searchTerm);
  function getTheList() {
    const serverurl = `${process.env.REACT_APP_ServerURL}/wishlist`;
    axios(serverurl)
      .then(result => {
        console.log(result.data);
        setWishList(result.data);
      })
      .catch(error => {
        console.log(`There is an error: ${error}`);
      });
  }
	function getTheListR() {
		const serverurl = `${process.env.REACT_APP_ServerURL}/readingnow`;
		axios(serverurl)
			.then(result => {

				setreadinglist(result.data);
				console.log(result.data);

			})
			.catch(error => {
				console.log(`there is something error`);
			})
	}
  useEffect(() => {
    getTheList();
		getTheListR();
  }, []);

  // Filter the wishlist based on the search term
	const filteredList = wishList.filter(item =>
    item.title.toLowerCase().includes((searchTerm ?? '').toLowerCase()) ||
    item.author.toLowerCase().includes((searchTerm ?? '').toLowerCase())
  );
	const filteredList2 = readinglist.filter(item =>
    item.title.toLowerCase().includes((searchTerm ?? '').toLowerCase()) ||
    item.author.toLowerCase().includes((searchTerm ?? '').toLowerCase())
  );

  return (
    <>
 
       <div style={styles.container}>
        {filteredList.length<1 &&  filteredList2.length<1 ?<h3>you dont add</h3> :null}
       {filteredList.length>0 ?
      <div>
        <h3 style={styles.heading}>Wish List</h3>
        <ul style={styles.list}>
          {filteredList.map(item => (
            <li key={item.id} style={styles.listItem}>
              <img src={item.book_image} alt={item.title} style={styles.image} />
              <div>
                <h4 style={styles.title}>{item.title}</h4>
                <p style={styles.author}>Author: {item.author}</p>
                <p style={styles.description}>Description: {item.descrip}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      : null}
      {filteredList2.length>0 ?
      <div>
        <h3 style={styles.heading}>Reading List</h3>
        <ul style={styles.list}>
          {filteredList2.map(item => (
            <li key={item.id} style={styles.listItem}>
              <img src={item.book_image} alt={item.title} style={styles.image} />
              <div>
                <h4 style={styles.title}>{item.title}</h4>
                <p style={styles.author}>Author: {item.author}</p>
                <p style={styles.description}>Description: {item.descrip}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      : null}
    </div>
    </>
  );
}

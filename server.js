const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Change to your desired port


const dbConnection = mysql.createConnection({
    host: 'localhost',  // Replace with your MySQL host
    user: 'root',       // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'unexplored_himalaya', // Replace with your database name
 });

 dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
 });


 app.set('view engine', 'ejs');
app.set('views', 'views');


 app.use(bodyParser.json());


app.use(express.static('public')); // Serve static files from the 'public' folder



app.get('/', (req, res) => {
    // Fetch and render location data from the database
    const sql = 'SELECT * FROM locations';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching location data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.render('index.ejs', { locations: results });
    });
  });



  app.get('/location/:id', (req, res) => {
    const locationId = req.params.id;
    // Fetch location details by ID from the database
    const sql = 'SELECT * FROM locations WHERE id = ?';
    db.query(sql, [locationId], (err, results) => {
      if (err) {
        console.error('Error fetching location details:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Location not found');
      } else {
        res.render('location.ejs', { location: results[0] });
      }
    });
  });
  


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


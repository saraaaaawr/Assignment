const express = require('express');
const mysql = require('mysql2');
const app = express();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});
// Create MySQL connection
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'cag project'
});
connection.connect((err) => {
if (err) {
console.error('Error connecting to MySQL:', err);
return;
}
console.log('Connected to MySQL database');
});
// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false 
}));
// Define routes
// Example:
// app.get('/', (req, res) => {
// connection.query('SELECT * FROM TABLE', (error, results) => {
// if (error) throw error;
// res.render('index', { results }); // Render HTML page with data
// });
// })

app.get("/", (req, res) => {
    connection.query("SELECT * FROM products", (error, results) =>{
        if (error) throw error; 
        res.render("index", {products: results});

    });
});

app.get("/product/:id", (req, res) =>{
    const productId = req.params.id;
    connection.query("SELECT * FROM products WHERE productId = ?",
    [productId], (error, results)=> {
        if (error) throw error;
        if (results.length > 0){
            res.render("product", {product:results[0]});
        }else{
            res.status(404).send("Product not found")
        }
    });
});

app.get('/addProduct', (req, res) =>{
    res.render('addProducts');
});

app.post("/addProduct", upload.single("image"), (req, res)=>{
    const {name, quantity, price} = req.body;
    let image;
    if (req.file){
        image = req.file.filename;
    }else{
        image=null;
    }
    
    const sql = "INSERT INTO products (productName, quantity, price, image) VALUES (?, ?, ?, ?)";
    connection.query(sql, [name, quantity, price, image], (error, results)=> {
        if (error){
            console.error("Database adding err: ", error.message);
            return res.status(500).send("Err adding pdt");
        }
        else{
            res.redirect("/");
        }
    });
});


app.post("/editProduct/:id", upload.single("image"), (req, res) => {
    const productID = req.params.id;
    const {name, quantity, price} = req.body;

    let image = req.body.currentImage;
    if (req.file){
        image = req.file.filename;
    }
   
    const sql = "UPDATE products SET productName=?, quantity=?, price=?, image=? WHERE productID=?";
    connection.query(sql, [name, quantity, price, image, productID], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving product");
        }else{
            res.redirect("/");
        }
    });
});

app.get('/editProduct/:id', (req,res) => {
    const productID = req.params.id;
  
    const sql = "SELECT * FROM products WHERE productID = ?";
    connection.query(sql, [productID], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving product");
        }
        if (results.length > 0){
            res.render("editProduct", {product: results[0]});
        } else{
            res.status(404).send("Product not found");
        }
    });
});

app.get('/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;
  
    const sql = "DELETE FROM products WHERE productId = ?";
    connection.query(sql, [productId], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error deleting product");
        } else{
            res.redirect("/");
        }
    }) ;  
});



app.get("/review", (req, res) => {
    connection.query("SELECT * FROM reviews", (error, results) =>{
        if (error) throw error; 
        res.render("review", {review: results});

    });
});



app.get('/addReview', (req, res) =>{
    res.render('addReview');
});

app.post("/addReview", upload.single("image"), (req, res)=>{
    const {title, description, rating, name} = req.body;
    let image;
    if (req.file){
        image = req.file.filename;
    }else{
        image=null;
    }
    
    const sql = "INSERT INTO reviews (reviewTitle, description, rating, reviewerName, image) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [title, description, rating, name, image], (error, results)=> {
        if (error){
            console.error("Database adding err: ", error.message);
            return res.status(500).send("Err adding pdt");
        }
        else{
            res.redirect("/");
        }
    });
});


app.post("/editReview/:itemID", upload.single("image"), (req, res) => {
    const itemID = req.params.id;
    const {reviewTitle, description, rating, reviewerName} = req.body;

    let image;
    if (req.file){
        image = req.file.filename;
    }else{
        image=null;
    }
   
    const sql = "UPDATE reviews SET reviewTitle=?, description=?, rating=?, reviewerName=?, image=? WHERE itemID=?";
    connection.query(sql, [reviewTitle, description, rating, reviewerName, image, itemID], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving review");
        }else{
            res.redirect("/");
        }
    })
})

app.get('/editReview/:itemID', (req,res) => {
    const itemID = req.params.id;
  
    const sql = "SELECT * FROM reviews WHERE itemID = ?";
    connection.query(sql, [itemID], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error retrieving product");
        }
        if (results.length > 0){
            res.render("editReview", {review: results[0]});
        } else{
            res.status(404).send("Review not found");
        }
    });
});

app.get('/deleteReview/:id', (req, res) => {
    const itemID = req.params.id;
  
    const sql = "DELETE FROM reviews WHERE itemID = ?";
    connection.query(sql, [itemID], (error, results)=>{
        if (error){
            console.error("Database query error:", error.message);
            return res.status(500).send("Error deleting review");
        } else{
            res.redirect("/");
        }
    }) ;  
});

app.get("/home", (req, res) => {
    connection.query("SELECT * FROM home", (error, results) =>{
        if (error) throw error; 
        res.render("home", {home: results});

    });
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
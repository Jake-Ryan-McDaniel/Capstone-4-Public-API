import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

//wasn't sure if I needed this or not so I just added it just in case. I didn't end up needing it for the Ron Swanson quotes.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// the initial landing page.
app.get("/", (req, res) =>{
    res.render("index.ejs", { content: "Awaiting your click..." });
});
// Post to the home page to add a quote from Ron Swanson to the h2 tag on the ejs file using axios and the api linked below.
app.post("/ron", async (req, res) =>{
    try {
        const result = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
        res.render("index.ejs", {
           content: result.data
        });
    }catch(error){
        console.log(error.response);
        res.status(500);
    }
    })
// this one is to generate a random fact I went over the rate limit so I couldn't tell if what I changed fixed any of the issues I have. All of it is commented out on the ejs file
// so I can come back to it later.
app.post("/fact", async (req, res) =>{
try {
    const result = await axios.get("https://api.fungenerators.com/fact/random");
    res.render("index.ejs", { content: result });
}catch(error){
    console.log(error.response.data);
    res.status(404);
}
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
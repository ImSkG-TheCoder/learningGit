const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const htpps = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));





app.get("/", function (req, res) {
    console.log("you are on get function of websites ");
    res.sendFile(__dirname + "/index.html");
});




app.post("/", function (req, res) {
    var first_name = req.body.firstName;
    var last_name = req.body.lastName;
    var email = req.body.email;
    var pass1 = req.body.password1;
    var pass2 = req.body.password2;
    if (pass1 === pass2) {
        res.sendFile(__dirname + "/success.html");
        var data = {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first_name,
                    LNAME: last_name
                }
            }]

        };
        var jsonData = JSON.stringify(data);
        const url = "https://us12.api.mailchimp.com/3.0/lists/62d4209be0";
        const options = {
            method: "POST",
            auth: "shahikant:c28dd781bf6917ccb5ee27bd4f52e2c4-us12"
        }
        const request = htpps.request(url, options, function (response) {
            response.on("data", function (data) {
                console.log(JSON.parse(data));
            })

        });


        request.write(jsonData);
        request.end();
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})



app.listen(process.env.PORT || 8080, function (req, res) {
    console.log("Your server is very fast running ");
});


//api_key = c28dd781bf6917ccb5ee27bd4f52e2c4-us12
//audience_id = 62d4209be0;
//url https://mandrillapp.com/api/1.0/users/ping
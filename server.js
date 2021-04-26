var express = require("express");
var app = express();
var path = require("path");
var expbs = require("express-handlebars");
var fs = require("fs");
var jsonfile = require("jsonfile");
var hbshelpers = require("./helpers/handelbars");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var file = "./Contactdata.json";


var smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: "Zoho",        
    auth: {
      user: "info@opseazy.com",
      pass: "S@heim0412",
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", expbs({ defaultLayout: "main", helpers: hbshelpers }));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "public/image")));
app.use(express.static(path.join(__dirname, "public/style")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const serve = {
    serveData: JSON.parse(fs.readFileSync("public/data/about.json")),
    aspectData: JSON.parse(fs.readFileSync("public/data/about.json")),
  };
  res.render("about", serve);
});

app.get("/services/:title", (req, res) => {  
  try {
    const services = {
      serveData: JSON.parse(
        fs.readFileSync(`public/data/services/${req.params.title}.json`)
      ),
    };
    res.render("services", services);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(404);
      res.render("error");
    }
  }
});

app.get("/industries/:title", (req, res) => {
  try {
    const industries = {
      serveData: JSON.parse(
        fs.readFileSync(`public/data/industries/${req.params.title}.json`)
      ),
    };
    res.render("industries", industries);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(404);
      res.render("error");
    }
  }
});

app.get("/solutions", (req, res) => {
  res.render("solutions");
});

app.get("/aspects", (req, res) => {
  res.render("aspects");
});

app.get("/blog", (req, res) => {
  res.render("blog");
});

app.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy");
});

app.get("/career", (req, res) => {
  res.render("career");
});

app.get("/industries", (req, res) => {
  res.render("industries");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/robots.txt", (req, res) => {
  res.sendFile("public/robots.txt");
});

app.get("/cookies", (req, res) => {
  res.render("cookies");
});

app.get("/termsofuse", (req, res) => {
  res.render("termsofuse");
});

app.get("/sitemap", (req, res) => {
  res.render("sitemap");
});  


app.post("/send-email", function (req, res) {
  var mailOption = {
    from: '"opseazy form submitting"<info@opseazy.com>',
    to: "ghani@opseazy.com",
    subject: "Request",
    text: `Name : ${req.body.name} 
                Company Name : ${req.body.companyname}
                Company Industry : ${req.body.companyindustry}
                Email : ${req.body.email} 
                Mobile Number : ${req.body.mobilenumber} 
                Comments : ${req.body.comments}`,
  };

  smtpTransport.sendMail(mailOption, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent:" + info.response);
  });
  res.redirect("/");
});

// app.post('/contact',(req,res)=>{
//     var name = req.body.name;
//     var companyname = req.body.companyname;
//     var companyindustry = req.body.companyindustry;
//     var email = req.body.email;
//     var mobilenumber = req.body.mobilenumber;
//     var comments =req.body.comments;

//     var obj = {name: name, companyname: companyname,
//                companyindustry:companyindustry,email:email,
//                mobilenumber:mobilenumber,comments:comments}
//     jsonfile.writeFileSync(file,obj, {flag:'a'});
//     res.render('contact')
// });

app.get("*", (req, res) => {
  res.status(404);
  res.render("error");
});

app.listen(5000, (err) => {
  if (err) console.log("server is error");
  else console.log("server is running on 4000");
});

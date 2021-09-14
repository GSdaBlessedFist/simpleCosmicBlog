const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Cosmic = require('cosmicjs');
const api = Cosmic();
const bucket = api.bucket({
  slug: 'simpolog-development',
  read_key: 'RzIBvihwYgZzWI9g9y3iPg5Ny4wRbqvpTxD1wHziiGu28NsbNB',
  // write_key: 'SCCepIVDzTPhp4VWFurDfvbjqIwklMJsT1NU4A4QQJr8wLs0N3'
})
const port = process.env.PORT || 3400;
const p = console.log;

// Express config
const publicDirectory = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "./src/templates/views");
const partialsPath = path.join(__dirname, "./src/templates/partials");

// Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static("public"));
hbs.registerPartials(partialsPath);
hbs.registerHelper('increment', (index)=>{
	index++;
	return index;
});
hbs.registerHelper('removeHTML',(content)=>{
	//REGEX for removing HTML tags in string
	const reg = /(<([^>]+)>)/ig;
	return content.replace(reg,"");
})
app.use('/', (req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
})
///////////////////////////////////////////////////////////

app.get("/", async(req, res) => {
	let data = await bucket.getObjects({
		query:{
			type: "comments"
		},
		props: "id,slug,title,content,metafields"
	})
	let posts = data.objects;
	let colors = {
		color1: "hsl(30,50%,50%)",
		color2: "hsl(50,75%,50%)"
	}
  res.render('index',{posts});
});

app.listen(port, () => {
  console.log(`Red to go on port: ${port}`);
});

const chalk = require('chalk');
const util = require('util');
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cors = require('cors');
require('dotenv').config()
////////////CMS///////////////////////
const Cosmic = require('cosmicjs');
const api = Cosmic();
const bucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ
  // write_key: 'SCCepIVDzTPhp4VWFurDfvbjqIwklMJsT1NU4A4QQJr8wLs0N3'
})
//////////////JPG Compression///////
const sharp = require('sharp');

(async()=>{
	try{
		await sharp("./src/images/underwater.jpg").jpeg({ progressive: true, force: false,mozjpeg: true,quality:60 }).toFile("./public/images/optimized_underwater.jpg");
		await sharp("./src/images/smoke.jpg").jpeg({ progressive: true, force: false,mozjpeg: true,quality:60 }).toFile("./public/images/optimized_smoke.jpg");
		await sharp("./src/images/candle.jpg").jpeg({ progressive: true, force: false,mozjpeg: true,quality:60 }).toFile("./public/images/optimized_candle.jpg");

	}catch(error){
		console.log(error)
	}
})()

////////////////////////////////////
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
app.use(cors({ origin: "*" }));
hbs.registerPartials(partialsPath);
hbs.registerHelper('increment', (index)=>{
	index++;
	return index;
});
hbs.registerHelper('removeHTML',(content)=>{
	//REGEX for removing HTML tags in string

	//FIX NEEDED: removes aposterphes too
	const reg = /<.*?>/ig;
	return content.replace(reg,"");
})
app.use('/', (req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
})
///////////////////////////////////////////////////////////

app.get("/", async(req, res) => {
	let homepageData = await bucket.getObject({
  id: '613f5b78695852000929437b',
  props: 'title,content'
})
	let postData = await bucket.getObjects({
		query:{
			type: "comments"
		},
		props: "id,slug,title,content,metadata"
	})
	let picturesData = await bucket.getMedia({
		props: "imgix_url"
	});
	let linksData = await bucket.getObjects({
		query:{
			type: "links"
		},
		props:"slug,title,content,metadata",
		limit: 10
	});
	let aboutMeData = await bucket.getObject({
		 id: '614780a6cdf3270009df0c70',
  	 props: 'slug,title,content'
	});
	//////////////////////////////////////////
	let homepageInfo = {
		"homepage": homepageData.object	
	};
	let postsInfo = {
		"posts":postData.objects
	};
	let linkInfo = {
		"links":linksData.objects
	}
	let aboutMeInfo = {
		"aboutMe": aboutMeData.object
	}
	///////////////////////////////////////////
	let dataset = {
		...homepageInfo,
		...postsInfo,
		...linkInfo,
		...aboutMeInfo
	}
	
	let colors = {
		color1: "hsl(30,50%,50%)",
		color2: "hsl(50,75%,50%)"
	}
	console.log("#########################################")
	// p(chalk.cyan(JSON.stringify(dataset.posts[0].metadata.post_picture.imgix_url)))
	console.log("#######################################")

  res.render('index',{dataset});
});

///////////EMAIL//////////////////////

//more to come
///////////EMAIL//////////////////////

app.listen(port, () => {
  console.log(chalk.yellow.bold(`Red to go on port: ${port}`));
});

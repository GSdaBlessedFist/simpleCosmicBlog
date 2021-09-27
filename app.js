const chalk = require('chalk');
const util = require('util');
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
////////////CMS///////////////////////
const Cosmic = require('cosmicjs');
const api = Cosmic();
const bucket = api.bucket({
  slug: process.env.COSMIC_SLUG,
  read_key: process.env.COSMIC_READ
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
app.use(express.urlencoded({  extend:false  }));
app.use(express.json());
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
///////////EMAIL///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
app.post('/email',(req,res)=>{
  console.log(`${req.body.name}'s info caught.`)
  try{
//////////////////////////AUTHORIZATION////////////////
      const oauth2Client = new OAuth2(
           process.env.CLIENT_ID,
           process.env.CLIENT_SECRET,
           "https://developers.google.com/oauthplayground" // Redirect URL
      );
      oauth2Client.setCredentials({
        refresh_token: "1//04eXSznqmnWL1CgYIARAAGAQSNwF-L9IrKmVUctcV9RMSNDeFiPGtW45F-BQRiJDS4s1n8QBPpjozgrqpiKYlCWGssE8Mzjg5U7E"
      });
      const accessToken = oauth2Client.getAccessToken();
/////////////////////////TRANSPORTER/////////////////////////////
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "gsdablessedfist@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESHTOKEN,
          accessToken: accessToken,
          // tls:{
          //   rejectUnauthorized:false
          // }
        },
      })
////////////////////////CONTENT/////////////////////////////////
      const alertMessageToMyself = {
        from: req.body.email,
        sender: req.body.name,
        to: "Gsdablessedfist@gmail.com",
        // to: "baughman.kristy77@gmail.com",
        subject: "Someone was interested.",
        generateTextFromHTML: true,
        html: `
        <div style="background: #112;color: white;padding: 20px;">
          <h1 style="font-size:3rem;text-align:center;">${req.body.name} is interested.</h1>
          <div>${req.body.email}</div>
          <div>Message reads:</div>
          <p>${req.body.message}</p>
        </div>
        `
      }
      const thankyouMessage = {
        from: "gsdablessedfist@gmail.com",
        to: req.body.email,
        subject: "Thank you for your interest..",
        generateTextFromHTML: true,
        html : `
          <div style="display:block;width:100%;height:100vh;color:purple;font-size:1.5rem;">Love ya, toosery
          </div>
        `
      }
///////////////////////SEND//////////////////////////////
      const p = console.log;
      transporter.sendMail(alertMessageToMyself,(error,response)=>{
        error ? p(error) : p(response);
        transporter.close();
      })
      transporter.sendMail(thankyouMessage,(error,response)=>{
        error ? p(error) : p(response);
        transporter.close();
      })
/////////////////////////////////////////////////////////
  }catch(error){
    console.log(error)
  }
})
///////////EMAIL//////////////////////
app.listen(port, () => {
  console.log(chalk.yellow.bold(`Red to go on port: ${port}`));
});
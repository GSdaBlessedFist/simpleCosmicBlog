const otherWorksButton= document.getElementById("other-works"),
	  aboutMeButton = document.getElementById("aboutme"),
	  contactButton = document.getElementById("contact");
const otherWorks_links = document.querySelectorAll('[data-linktitle]');
const aboutMeContent= document.querySelector('[data-aboutmecontent]');
const heroSectionTextContainer= document.getElementById("hero-section-text-container");
const tabsAreaCloseButton= document.querySelectorAll("tabsArea-close-container_button");

var heroTextDisplaying = false;
var otherWorksDisplaying = false;
var aboutMeDisplaying = false;
var contactDisplaying = false;
document.addEventListener('click',(e)=>{
	if(e.target==otherWorksButton){
		console.log("OTHER WORKS")
		displayHeroSectionTextContainer();
		
		displayOtherWorksInfo();
	};
	if(e.target==aboutMeButton){
		console.log("ABOUT ME")
		displayHeroSectionTextContainer();
		displayAboutMeInfo();
	}
	if(e.target==contactButton){
		console.log("CONTACT ME");
		displayHeroSectionTextContainer();
		displayContactInfo();
	}
})

function displayHeroSectionTextContainer(){
	if(heroTextDisplaying)return;
	gsap.set(heroSectionTextContainer,{display:"flex"});
	gsap.to(heroSectionTextContainer,{duration:.35,opacity:1});
	heroTextDisplaying = true;
}
function displayOtherWorksInfo(){
	if(otherWorksDisplaying==true)return;
	if(aboutMeDisplaying==true || contactDisplaying==true){
		heroSectionTextContainer.innerHTML=``;
	}
	heroSectionTextContainer.innerHTML+=`
	<a href="#" class="tabsArea-close-container" style="text-decoration:none;background:transparent;">
		<div class="tabsArea-close-container_button" id="tabsArea-close-container_button">X</div>
	</a>
	<h2 style="color:hsl(16, 63%, 59%);background:transparent;">other works...</h2>
	<div class="otherWorks" id="otherworks"></div>
	`;
	for(let x=0;x<otherWorks_links.length;x++){
		document.querySelector("#otherworks").innerHTML+=`
			<div class="otherWorks--linkContainer">
				<h3 class="otherWorks--linkContainer_title">${otherWorks_links[x].dataset.linktitle}</h3>
					<a href="${otherWorks_links[x].dataset.url}" class="otherWorks--linkContainer_url">${otherWorks_links[x].dataset.url}</a>
				<div class="otherWorks--linkContainer_description>${otherWorks_links[x].dataset.description}</div>
			</div>
		</div>
	`;
	otherWorksDisplaying=true;
	aboutMeDisplaying = false;
	contactDisplaying  = false;
	}
	let close = document.querySelector(".tabsArea-close-container_button");
	close.addEventListener('click',(e)=>{
		e.preventDefault();
		gsap.to(close,{duration:.35,opacity:0});
		gsap.to(heroSectionTextContainer,{duration:.35,opacity:0});
		heroSectionTextContainer.innerHTML=``;
		heroTextDisplaying = false;
		otherWorksDisplaying = false;
		aboutMeDisplaying = false;
		contactDisplaying  = false;
	})
}
function displayAboutMeInfo() {
	if(aboutMeDisplaying==true)return;
	if(otherWorksDisplaying==true || contactDisplaying==true){
		heroSectionTextContainer.innerHTML=``;
	}
	
	heroSectionTextContainer.innerHTML+=`
		<a href="#" class="tabsArea-close-container" style="text-decoration:none;background:transparent;">
		<div class="tabsArea-close-container_button" id="tabsArea-close-container_button">X</div>
		</a>
		<h2 style="color:hsl(16, 63%, 59%);background:transparent;">about me</h2>
		<div class="aboutMe" id="aboutMe">

			<h3 style="text-align:center;background: transparent;padding-bottom: 10px;">Jason Zamora = Aspiring FullStack developer</h3>
			<p>I have 10 years of customer support experience assisting via email/chat/phone. I have worked with <span class="orange-span">HTML, CSS, Javascript</span> for the greater part of 6yrs and am an aspiring full stack developer. In my experience, I frequently work with<span class="orange-span"> Node.js, Express, MongoDB, MySQL, Handlebars.js, Socket.io, GSAP (library),React</span>, and <span class="orange-span">Sass</span>. I'm also familiar with versioning via <span class="orange-span">Git</span> and <span class="orange-span">API creation</span>. In addition to my focus on web development technology, I'm also skilled at <span class="orange-span">vector/raster design, using Illustrator/Inkscape and SVG</span>, in general. On my spare time, if I'm not learning or working on one of several web-based projects, I'm improving my illustration skills. As a developer, I seek to be the "glue" between front/ backend teams. My current endeavors are focused on gaining proficiency on GraphQL both front and backend..NOTE: I, unfortunately ,do not have professional work experience just yet but I do work well with teams. </p>
		</div>
	`;
	otherWorksDisplaying = false;
	aboutMeDisplaying = true;
	contactDisplaying  = false;
	let close = document.querySelector(".tabsArea-close-container_button");
	close.addEventListener('click',(e)=>{
		e.preventDefault();
		gsap.to(close,{duration:.35,opacity:0});
		gsap.to(heroSectionTextContainer,{duration:.35,opacity:0});
		heroSectionTextContainer.innerHTML=``;
		heroTextDisplaying = false;
		otherWorksDisplaying = false;
		aboutMeDisplaying = false;
		contactDisplaying  = false;
	})
}
function displayContactInfo(){
	if(contactDisplaying==true)return;
	if(aboutMeDisplaying==true || otherWorksDisplaying==true){
		heroSectionTextContainer.innerHTML=``;

	}

	heroSectionTextContainer.innerHTML+=`
		<a href="#" class="tabsArea-close-container" style="text-decoration:none;background:transparent;">
		<div class="tabsArea-close-container_button" id="tabsArea-close-container_button">X</div>
		</a>
		<h2 style="color:hsl(16, 63%, 59%);background:transparent;">contact</h2>
		<div class="emailFormContainer">
			<div class="emailFormContainer_email-title">Jason Zamora</div>
			<h3 class="emailFormContainer_email-address">GSdaBlessedFist@gmail.com</h3>
			<div class="email-greeting">
				Comments...feedback...</br>Interested in hiring? </br>Send a message.
			</div>
			<form id="emailFormContainer_contact-form" method="POST" action="localhost:3400/email" enctype="multipart/form-data">
				<div class="form-group">
					<input placeholder="Name" id="name" name="name" type="text" class="form-name" required />
					<input placeholder="Email" id="email" type="email" name="email" class="form-control" aria-describedby="emailHelp" required />
					<textarea placeholder="Message" id="message" name="message" class="form-control" rows="3" cols="5" required></textarea>
				</div>
				<button type="submit" value="submit" class="contact-submit-button">Submit</button>
			</form>
		</div>
	`;
	///////////////////////////SEND MESSAGE/////////////////////////////////////
	const submit = document.querySelector('.contact-submit-button');
	submit.addEventListener('click', (e) => {
	    e.preventDefault();
	    let name = document.getElementById("name").value.trim();
	    let email = document.getElementById("email").value.trim();
	    let message = document.getElementById("message").value.trim();

	    const reg = /<.*?>/ig;
		message.replace(reg,"");

	    const data = {
	        name,
	        email,
	        message
	    }
	    console.log(data)
	    const send = async (data) => {
	        try {
	            const message = await axios.post('/email', data)
	            .then(function(response) {
	                return response.json;
	            })
	            .then(datum => {
	            	console.log(datum)
	            })
	        }catch (error) {
	            console.log(error)
	        }
	    }
	    send(data)
	    heroTextDisplaying = false;
	    gsap.to(heroSectionTextContainer,{duration:.65,delay:.75,opacity:0});
	})
	///////////////////////////////////////////////////////////

	otherWorksDisplaying = false;
	aboutMeDisplaying = false;
	contactDisplaying  = true;
	let close = document.querySelector(".tabsArea-close-container_button");
	close.addEventListener('click',(e)=>{
		e.preventDefault();
		gsap.to(close,{duration:.35,opacity:0});
		gsap.to(heroSectionTextContainer,{duration:.35,opacity:0});
		heroSectionTextContainer.innerHTML=``;
		heroTextDisplaying = false;
		otherWorksDisplaying = false;
		aboutMeDisplaying = false;
		contactDisplaying  = false;
	})
}
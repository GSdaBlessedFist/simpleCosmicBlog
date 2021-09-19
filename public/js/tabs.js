//tabs.js
const otherWorksButton= document.getElementById("other-works"),
	  aboutMeButton = document.getElementById("aboutme"),
	  contactButton = document.getElementById("contact");
const otherWorks_links = document.querySelectorAll('[data-linktitle]');
const aboutMeContent= document.querySelector('[data-aboutmecontent]');
const heroSectionTextContainer= document.getElementById("hero-section-text-container");
const tabsAreaCloseButton= document.getElementById("tabsArea-close-button");

var heroTextDisplaying = false;
var otherWorksDisplaying = false;
var aboutMeDisplaying = false;
document.addEventListener('click',(e)=>{
	if(e.target==otherWorksButton){
		displayHeroSectionTextContainer();
		displayOtherWorksInfo()
	};
	if(e.target==tabsAreaCloseButton){
		console.log("click")
		// gsap.to(tabsAreaCloseButton,{duration:.35,opacity:0});
		// gsap.to(heroSectionTextContainer,{duration:.35,opacity:0});
		// heroTextDisplaying = false;
		// otherWorksDisplaying = false;
	};
	if(e.target==aboutMeButton){
		console.log("ABOUT ME")
		displayHeroSectionTextContainer();
		displayAboutMeInfo();
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
	if(aboutMeDisplaying==true){
		heroSectionTextContainer.innerHTML=``;
	}
	heroSectionTextContainer.innerHTML+=`
	<a href="#" style="text-decoration:none;background:tranparent;">
		<div class="tabsArea-close-button" id="tabsArea-close-button">X</div>
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
	}
}
function displayAboutMeInfo() {
	if(otherWorksDisplaying==true){
		heroSectionTextContainer.innerHTML=``;
	}
	if(aboutMeDisplaying==true)return;
	heroSectionTextContainer.innerHTML+=`
		<h2 style="color:hsl(16, 63%, 59%);background:transparent;">about me</h2>
		<div class="aboutMe" id="aboutMe">
			<p>I have 10 years of customer support experience assisting via email/chat/phone. I have worked with <span class="orange-span">HTML, CSS, Javascript</span> for the greater part of 6yrs and am an aspiring full stack developer. In my experience, I frequently work with<span class="orange-span"> Node.js, Express, MongoDB, MySQL, Handlebars.js, Socket.io, GSAP (library),React</span>, and <span class="orange-span">Sass</span>. I'm also familiar with versioning via <span class="orange-span">Git</span> and <span class="orange-span">API creation</span>. In addition to my focus on web development technology, I'm also skilled at <span class="orange-span">vector/raster design, using Illustrator/Inkscape and SVG</span>, in general. On my spare time, if I'm not learning or working on one of several web-based projects, I'm improving my illustration skills. As a developer, I seek to be the "glue" between front/ backend teams. My current endeavors are focused on gaining proficiency on GraphQL both front and backend..NOTE: I, unfortunately ,do not have professional work experience just yet but I do work well with teams. </p>
		</div>
	`;
	otherWorksDisplaying = false;
	aboutMeDisplaying = true;
}
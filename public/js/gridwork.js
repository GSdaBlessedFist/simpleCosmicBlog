//gridwork.js
const p = console.log;
const technicallyButton= document.getElementById("technically-button");
const primeContainerGrid= document.getElementById("prime-container");
const titleColumn= document.getElementById("title-column");
const titleImageSection= document.getElementById("title-column_image-section");
const titlePic= document.getElementById("title-pic");
const skillsColumn= document.getElementById("skills-column");
const githubButton= document.getElementById("github-button");
const closeButton= document.getElementById("close-button");
const posts = document.getElementsByClassName("posts-column--post-container");
const articleContainer= document.getElementById("article-container");
const gridColumnsConfigs = {
	"close": "45% 30% 0% 25%",
	"open": "25% 30% 20% 25%"
}
document.addEventListener('click',(e)=>{
	e.preventDefault();
	if(e.target==technicallyButton){
		gsap.to(primeContainerGrid,{duration:.95,gridTemplateColumns:gridColumnsConfigs.open,ease: "elastic.out(1, 0.7)"});
		gsap.to(skillsColumn,{duration:.65,opacity:1,delay:.45});
	}
	if(e.target==closeButton){
		console.log(gridColumnsConfigs.close)
		gsap.to(skillsColumn,{duration:.15,opacity:0});
		gsap.to(primeContainerGrid,{duration:.65,gridTemplateColumns:gridColumnsConfigs.close,ease:" power2.out"});
	}
	if(e.target==githubButton){
		window.open("https://github.com/GSdaBlessedFist/Simple-Cosmic-blog","_blank");
	}
})
const selected ="2px hsl(16, 63%, 59%) solid";
var articleDisplayed = false;
var selectedPost = null;
function sendArticleToTitlePicSection(post){
	titlePic.style.display="none";
	articleContainer.style.display= "block";
	const body = post.querySelector(".post-summary").dataset.fullarticle;
	articleContainer.innerHTML+=`
		<h1 class="article-title">${post.querySelector(".post-titlebar_title").innerHTML}</h1>
		<div style="text-indent: 20px;">
			<p class="article-words">${body}</p>
		</div>
	`;
	articleDisplayed=true;
	selectedPost= document.querySelector(".article-title").innerText;
}
function adjustTitleColumnDivisions(){
	gsap.to(titleColumn,{duration:.35,gridTemplateRows:"20% 80%"});
}
Array.from(posts).forEach((post)=>{
	post.addEventListener('click',(e)=>{
		adjustTitleColumnDivisions();
		if(articleDisplayed){
			articleContainer.innerHTML=``;
		}
		gsap.set(post,{border:selected});
		gsap.set(post.querySelector(".post-titlebar_title"),{color:"hsl(16, 63%, 59%)"});
		sendArticleToTitlePicSection(post);
	})
})
//gridwork.js
const p = console.log;
const technicallyButton= document.getElementById("technically-button");
const primeContainerGrid= document.getElementById("prime-container");
const skillsColumn= document.getElementById("skills-column");
const githubButton= document.getElementById("github-button");
const gridColumnsConfigs = {
	"closed": "50% 25.9% .1% 25%",
	"open": "25% 30% 20% 25%"
}

document.addEventListener('click',(e)=>{
	e.preventDefault();
	if(e.target==technicallyButton){
		gsap.to(primeContainerGrid,{duration:.95,gridTemplateColumns:gridColumnsConfigs.open,ease: "elastic.out(1, 0.7)"});
		gsap.to(skillsColumn,{duration:.65,opacity:1,delay:.35});
	}
	if(e.target==githubButton){
		window.open("https://github.com/GSdaBlessedFist/Simple-Cosmic-blog","_blank");
	}
})
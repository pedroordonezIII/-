let defferedPrompt; 

window.addEventListener("beforeinstallprompt", (e) => {

	e.preventDefault(); 

	deferredPrompt = e; 

	btnAdd.style.display = 'block'; 

}); 

btnAdd.addEventListener("click", (e) => {
	btnAdd.style.display = "none"; 

	deferredPrompt.prompt();

	deferredPrompt.userChoice
		.then((choiceResult) => {
			if(choiceResult.outcome === "accepted"){
				console.log("User accepted the AHS prompt"); 
			}
			else{
				console.log("User dismissed the A2HS prompt"); 
			}
			defferedPrompt = null; 
		});
});
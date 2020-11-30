let defferedPrompt; 


/*
W
*/
window.addEventListener("beforeinstallprompt", (e) => {

	//prevent chrome 67 and earlier from showing the prompt
	e.preventDefault(); 

	//stash the event so it can be triggered later
	deferredPrompt = e;
}); 

// window.addEventListener("beforeinstallprompt", (e) => {

// 	e.preventDefault(); 

// 	deferredPrompt = e; 

// 	//update user interface and notify user they can add to homescreen
// 	btnAdd.style.display = 'block'; 

// }); 

/**
Upon clicking the button shown at the bottom of the page,
the usert will be given the option to install the application
to their homescreen 
**/
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

window.addEventListener("appinstalled", (evt) =>{
	app.logEvent("A2HS", "installed");
})
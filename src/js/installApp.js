window.addEventListener("beforeinstallprompt", (e) => {

	e.preventDefault(); 

	deferredPrompt = e; 

	btnAdd.style.display = 'block'; 

})
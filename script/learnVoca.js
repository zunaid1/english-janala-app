function pronounceWord(word) {
	console.log(word)
	const utterance = new SpeechSynthesisUtterance(word);
	utterance.lang = 'en-EN'; // English
	window.speechSynthesis.speak(utterance);
}



const showSpinner = () => {
	document.getElementById("spinner").classList.remove("hidden");
	document.getElementById("word-container").classList.add("hidden");
};
const hideSpinner = () => {
	document.getElementById("spinner").classList.add("hidden");
	document.getElementById("word-container").classList.remove("hidden");
};


//==========Logout==========================================================
document.getElementById('logout').addEventListener('click', function () {
	//alert("Logout button clicked....");
	const navbar = document.getElementById('header');
	const vocabularySection = document.getElementById('learn-section');
	const faqSection = document.getElementById('faq-section');
	const bannerSection = document.getElementById('banner-section');
	const footer = document.getElementById('footer-section');

	//sweet alert 
	Swal.fire({
		icon: "question",
		title: "Do you want to Logout?",
		showCancelButton: true,
		confirmButtonText: "Logout",
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {


	//hide section
	navbar.classList.toggle('hidden');
	vocabularySection.classList.toggle('hidden');
	faqSection.classList.toggle('hidden');

	//show section
	bannerSection.classList.remove('hidden');
	footer.classList.remove('hidden');


	Swal.fire({
		position: "top-end",
			icon: "success",
			title: "English Janala Logout successfully.",
			showConfirmButton: false,
			timer: 1500

	});
		}

	});





	//HIDE: nav, vocabulary, FAQ
	//and SHOWS: Banner, footer 

})
// Swal.fire({
// 	position: "top-end",
// 	icon: "success",
// 	title: "Your work has been saved",
// 	showConfirmButton: false,
// 	timer: 1500
//   });



//====================================================================
//hidden
document.getElementById('btn-start').addEventListener('click', function (e) {
	const userId = document.getElementById('userId').value;
	const password = document.getElementById('password').value;
	const bannerSection = document.getElementById('banner-section');
	//const convertedPassword= parseInt(password)
	//console.log(password, convertedPassword);
	e.preventDefault()
	if (userId.length === 0) {
		alert("Please input user name.");
		return;
	}

	if (password.length === 0) {
		alert("Please input password.");
		return;
	}

	if (password === "123456") {

		const navbar = document.getElementById('header');
		const vocabularySection = document.getElementById('learn-section');
		const faqSection = document.getElementById('faq-section');
		const bannerSection = document.getElementById('banner-section');
		const footer = document.getElementById('footer-section');

		//show section
		navbar.classList.remove('hidden');
		vocabularySection.classList.remove('hidden');
		faqSection.classList.remove('hidden');
		footer.classList.remove('hidden');

		//hide section
		bannerSection.classList.toggle('hidden');



		// "Welcome, to the class."
		Swal.fire({
			title: `

				<div class="flex justify-center items-center gap-1">
				
				<h5 class="">Welcome to</h5>
				<h3 class="font-bold">English</h3>
				<img class="w-8 h-8" src="./assets/logo.png" alt="">
				<h3>জানালা</h3>
			</div>


			` ,
			icon: "success",
			draggable: false
		});
		const hiddenClasses = document.getElementsByClassName("hidden");
		console.log(hiddenClasses)
		for (let cls of hiddenClasses) {
			cls.classList.remove("hidden");
			console.log(cls.id)
		}

		bannerSection.classList.add("hidden");
	}
	else {
		alert("Please input valid Password.");
	}

	//alert(userId,password)

}
)

function removeActiveClass() {
	const activeButtons = document.getElementsByClassName("active");
	for (let btn of activeButtons) {
		btn.classList.remove("active");
	}

}

//========================================================================
//-------------Load Lessons
//========================================================================
function loadLessons() {
	showSpinner();
	// 1- fetch the data
	fetch("https://openapi.programming-hero.com/api/levels/all")
		//2 - convert promise to json
		.then((res) => res.json())
		//3 - send data to display
		.then((data) => displayLessons(data.data));
}

function displayLessons(lessons) {
	// get the container
	const lessonsContainer = document.getElementById("lesson-container");
	//console.log(levels);
	for (let les of lessons) {
		//console.log(les);

		const categoryDiv = document.createElement("div");
		categoryDiv.innerHTML = `
		 <button id="btn-${les.level_no}" onclick="loadCategoryLessons(${les.level_no})" class="text-2xl border-2 border-[#422AD5] text-[#422AD5] hover:bg-[#422AD5] hover:text-white px-4 py-2 rounded-lg transition duration-300 focus:text-white"><i class="fa-solid fa-book-open"></i> Lesson-${les.level_no}</button>
		`;
		lessonsContainer.append(categoryDiv);
	}
	hideSpinner();
}
//========================================================================
//========================================================================




//========================================================================
//--------START: Load word by lessons
//========================================================================
const loadCategoryLessons = (id) => {
	showSpinner();
	//alert(id)

	const url = `https://openapi.programming-hero.com/api/level/${id}`;
	console.log(url);

	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			removeActiveClass();
			//no active class

			const clickedButton = document.getElementById(`btn-${id}`);
			console.log(clickedButton)
			clickedButton.classList.add("active");

			//console.log(data.data)
			displayWords(data.data);
		});
};


const displayWords = (words) => {
	const wordContainer = document.getElementById("word-container");

	wordContainer.innerHTML = "";

	if (words.length == 0) {
		showSpinner();
		wordContainer.innerHTML = `
				<div
				class="py-20 col-span-full flex flex-col justify-center items-center text-center">

				<img class="w-[120px]" src="./assets/alert-error.png" alt="" />
				<p class="text-sm font-hind">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
				<h2 class="text-[34px] font-hind">নেক্সট Lesson এ যান</h2>
			  </div>
	  `;
		hideSpinner();
		return;
	}


	for (const word of words) {
		//console.log(word.word);
		const wordCard = document.createElement("div");
		wordCard.innerHTML = `
		
				<!-- card -->
				<div class="bg-white  rounded-lg shadow-lg p-8 h-full min-h-[372px]">
					<div class="text-center space-y-6 my-8">
						<h1 class="text-3xl font-bold">${word.word}</h1>
						<p class="text-xl text-gray-500 mt-2">Meaning /Pronounciation</p>
						<h2 class="text-3xl">${word.meaning == null
				? "অর্থ পাওয়া যায়নি" : word.meaning} / 
							${word.pronunciation == null
				? "উচ্চারণ পাওয়া যায়নি" : word.pronunciation

			}</h2>
					</div>
					<!-- card buttons -->
					<div class="flex justify-between items-center">
					    <button onclick=loadWordDetails('${word.id}') class="btn bg-blue-100"><i class="fa-solid fa-circle-info text-3xl"></i></button>
						<button onclick=pronounceWord('${word.word}') class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i> </button>
					</div>
				</div>
		 `;

		wordContainer.append(wordCard);
	}



	hideSpinner();
};

//============================================================================================
//--------END: Load word by lessons
//============================================================================================






//========================================================================
//--------START: loadWordDetails
//========================================================================

const loadWordDetails = (wordId) => {
	//alert(wordId)
	console.log(wordId);
	const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => displayWordDetails(data.data));
};

//=====displayWordDetails======================================================
const displayWordDetails = (word) => {
	console.log(word);
	document.getElementById("word_details").showModal();
	const detailsContainer = document.getElementById("details-container");

	detailsContainer.innerHTML = `
				
			<div class="space-y-5">
				<!-- modal text -->
				<div class="border border-[#92f2ff] m-3 p-3 mb-20">
					
				<div class="flex">
				<h1 class="text-[36px] font-bold">${word.word == null
			? "শব্দ পাওয়া যায়নি" : word.word

		} (<i onclick=pronounceWord('${word.word}')  class="fa-solid fa-microphone"></i> :${word.pronunciation})</h1>				
				</div>
				
					
		
		<h1 class="text-[24px] font-semibold">Meaning</h1>
					<h1 class="text-[24px] font-medium">${word.meaning == null
			? "অর্থ পাওয়া যায়নি" : word.meaning
		}</h1>
					<br>
					<h1 class="text-[24px] font-semibold">Example</h1>
					<h1 class="text-[24px] font-medium">${word.sentence == null
			? "Example পাওয়া যায়নি" : word.sentence
		}</h1>
					<br>

					<h1 class="text-[24px] font-semibold mb-3">সমার্থক শব্দ গুলো</h1>
					<div id="syno-container" class="flex gap-2"> </div>

		<form method="dialog">
        	<button class="btn btn-primary absolute left-5 bottom-5 text-white text-xl">Complete Learning</button>
      	</form>

		</div>

	</div>
	`;

	const synoContainer = document.getElementById("syno-container");

	let synoArray = word.synonyms;

	console.log(`synonym qty:  ${synoArray.length}`)
	if (synoArray.length === 0) {
		const synoCard = document.createElement("div");
		synoCard.innerHTML = `
	<button class="btn btn-soft bg-[#EDF7FF] text-xl border border-[#D7E4EF]">সমার্থক শব্দ পাওয়া যায়নি</button>		
	`
		synoContainer.append(synoCard);
		return;
	}
	else {
		for (const syno of synoArray) {
			//console.log(word.word);
			const synoCard = document.createElement("div");
			synoCard.innerHTML = `


		<button class="btn btn-soft bg-[#EDF7FF] text-xl border border-[#D7E4EF]">${syno}</button>				
		 `;

			synoContainer.append(synoCard);
		}
	}

};

//========================================================================
//--------END: loadWordDetails
//========================================================================

loadLessons();



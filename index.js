document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#form");
  let posterContainer = document.querySelector("#poster-container");
  let galleryContainer = document.querySelector("#gallery-container");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fetches image from the first API
    fetch("https://shibe.online/api/shibes") // backup API https://dog.ceo/api/breeds/image/random
      .then(resp => resp.json())
      .then(imgData => {
          let image = imgData; //add .message if using backup API
          
          // Fetches image from the second API
          fetch(`https://api.kanye.rest/`)
          .then(resp => resp.json())
          .then(quoteData => {
            let words = quoteData.quote;

            // Create the poster
            let posterImage = document.createElement("img");
            posterImage.classList.add('img');
            posterImage.src = image;

            let posterQuote = document.createElement("h2");
            posterQuote.textContent = words;
            
            let posterCredit = document.createElement("h3");
            posterCredit.textContent = "- Kanye West";

            // add to gallery button (and change to clear to delete poster).
            let favBtn = document.createElement("button");
            favBtn.classList.add("btn");
            favBtn.id = "fav-btn";
            favBtn.textContent = "save to gallery";
            
            favBtn.addEventListener("click", () => {
                if (favBtn.textContent === "save to gallery") {
                    galleryContainer.appendChild(poster);
                    favBtn.textContent = "clear";
                  } else if (favBtn.textContent === "clear") {
                    poster.remove();
                  }
            })

            let poster = document.createElement("div");
            poster.classList.add('card');
            poster.appendChild(posterImage);
            poster.appendChild(posterQuote);
            poster.appendChild(posterCredit);
            poster.appendChild(favBtn);

            // Appends the poster to the container
            posterContainer.innerHTML = ""; // Clear previous content
            posterContainer.appendChild(poster);  
        })
        .catch(error => console.error("Error:", error));
      })
      .catch(error => console.error("Error:", error));
  });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "d"); {
        document.body.classList.toggle("dark-mode");
    }
})
            
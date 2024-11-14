// Check if user has already voted (using local storage for front-end purposes)
window.onload = function() {
    if (localStorage.getItem("hasVoted") === "true") {
        showThankYouSection("You have already voted.");
    }
}

// Submit the vote to the backend server
function submitVote(candidate) {
    fetch('http://localhost:3000/vote', {  // Use your deployed server URL here if hosted
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate: candidate })
    })
    .then(response => {
        if (response.status === 403) {
            // If the IP has already voted, show an "already voted" message
            showThankYouSection("You have already voted.");
        } else {
            // If the vote is successfully recorded, save to local storage and thank the user
            localStorage.setItem("hasVoted", "true");
            response.json().then(data => {
                showThankYouSection(data.message);
            });
        }
    })
    .catch(error => {
        console.error("Error:", error);
        showThankYouSection("An error occurred while submitting your vote. Please try again later.");
    });
}

// Display the thank-you message and hide voting options
function showThankYouSection(message) {
    document.getElementById("vote-section").style.display = "none";
    const thankYouSection = document.getElementById("thank-you-section");
    thankYouSection.style.display = "block";
    thankYouSection.innerText = message;

    // Clear the voting section to prevent further interactions
    document.body.innerHTML = thankYouSection.outerHTML;
}

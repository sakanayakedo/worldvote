// Check if user has already voted
window.onload = function() {
    if (localStorage.getItem("hasVoted") === "true") {
        showThankYouSection();
    }
}

function submitVote(candidate) {
    // Record the vote and store it in local storage
    localStorage.setItem("hasVoted", "true");
    localStorage.setItem("voteChoice", candidate);

    // Show thank you section
    showThankYouSection();
}

function showThankYouSection() {
    document.getElementById("vote-section").style.display = "none";
    document.getElementById("thank-you-section").style.display = "block";
}

// Check if user has already voted
window.onload = function() {
    if (localStorage.getItem("hasVoted") === "true") {
        showThankYouSection();
    }
}

function submitVote(candidate) {
    // Record the vote in local storage to prevent future votes
    localStorage.setItem("hasVoted", "true");
    localStorage.setItem("voteChoice", candidate);

    // Immediately hide the voting section and show the thank-you message
    document.getElementById("vote-section").style.display = "none";
    showThankYouSection();
}

function showThankYouSection() {
    document.getElementById("vote-section").style.display = "none";
    document.getElementById("thank-you-section").style.display = "block";

    // Disable further interaction with the page
    document.body.innerHTML = document.getElementById("thank-you-section").outerHTML;
}

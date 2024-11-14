function register() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!firstName || !lastName || !email || !phone) {
        document.getElementById("registrationMessage").innerText = "Please fill in all fields.";
        return;
    }

    // Check if the user has already voted
    if (localStorage.getItem("hasVoted") === "true") {
        showThankYouSection();
    } else {
        document.getElementById("registration-section").style.display = "none";
        document.getElementById("vote-section").style.display = "block";
        document.getElementById("registrationMessage").innerText = "";
    }
}

let selectedVote = "";

function confirmVote(candidate) {
    selectedVote = candidate;
    document.getElementById("vote-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "block";
    document.getElementById("selectedCandidate").innerText = `You selected: ${candidate}`;
}

function submitVote() {
    // Record the vote and prevent future votes
    localStorage.setItem("hasVoted", "true");
    localStorage.setItem("voteChoice", selectedVote);

    document.getElementById("confirmation-section").style.display = "none";
    showThankYouSection();
}

function cancelVote() {
    // Go back to the voting section
    document.getElementById("confirmation-section").style.display = "none";
    document.getElementById("vote-section").style.display = "block";
}

function showThankYouSection() {
    document.getElementById("thank-you-section").style.display = "block";
}

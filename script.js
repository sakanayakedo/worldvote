function register() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (!firstName || !lastName || !email || !phone) {
        document.getElementById("registrationMessage").innerText = "Please fill in all fields.";
        return;
    }

    // Mock registration success - switch to the voting section
    document.getElementById("registration-section").style.display = "none";
    document.getElementById("vote-section").style.display = "block";
    document.getElementById("registrationMessage").innerText = "";
}

function submitVote(option) {
    document.getElementById("response").innerText = `You voted for ${option}! Thank you!`;
}

const BASE_URL = "http://localhost:8080";

const mainPage = document.getElementById("mainpage");

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", userLogin);
const userForm = document.getElementById("userForm");
const loginBox = document.getElementById("loginBox");

const infoMessage = document.createElement("p");
infoMessage.setAttribute("id", "infoMessage");
infoMessage.setAttribute("class", "infoMessage");

async function userLogin(){
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("userpassInput").value;
    userData = {username: username, password: password};

    await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
        "Content-Type": "application/json",
        },
    })
    
    .then((res) => res.json())
    .then((res) => {        
        localStorage.setItem("accessToken", res.accessToken);
        showPollInput();
    })
    
    .catch((err) => {
        console.log(err);

        infoMessage.innerText = "El usuario o la contraseña son incorrectos";
        infoMessage.style.color = "red";
        infoMessage.style.display = "block";

        userForm.append(infoMessage);
        return;
    });
}

const showPollInput = () => {
    loginBox.innerHTML = "";

    const pollAccessForm = document.createElement("section");
    pollAccessForm.setAttribute("id", "pollAccessForm");
    pollAccessForm.setAttribute("class", "pollAccessForm");

    const pollInputHeader = document.createElement("h2");
    pollInputHeader.innerText = "Acceder a la encuesta";
    const pollIdInput = document.createElement("input");
    pollIdInput.setAttribute("type", "text");
    pollIdInput.setAttribute("id", "pollIdInput");
    pollIdInput.setAttribute("placeholder", "ID de la encuesta");

    const pollAccessBtn = document.createElement("button");
    pollAccessBtn.setAttribute("id", "pollAccessBtn");
    pollAccessBtn.setAttribute("class", "pollAccessBtn");
    pollAccessBtn.addEventListener("click", pollAccess);
    pollAccessBtn.innerText = "Acceder a la encuesta";

    pollAccessForm.append(pollInputHeader, pollIdInput, pollAccessBtn);
    loginBox.append(pollAccessForm);
}

async function pollAccess(){
    const pollId = document.getElementById("pollIdInput").value;

    if (pollId == ""){
        infoMessage.innerText = "No has introducido el ID de la encuesta";
        infoMessage.style.color = "red";
        infoMessage.style.display = "block";

        pollAccessForm.append(infoMessage);
        return;
    }

    await fetch(`${BASE_URL}/polls/${pollId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("accessToken")}`,
        },
    })
    
    .then((res) => res.json())
    .then((res) => {
        mainPage.innerHTML = "";
        showPollData(res);
    })
    
    .catch((error) =>{
        console.log(error);

        infoMessage.innerText = "No existe una encuesta con ese ID";
        infoMessage.style.color = "red";
        infoMessage.style.display = "block";

        pollAccessForm.append(infoMessage);
        return;
    });
}

const showPollData = (poll) => {
    const pollDataBox = document.createElement("section");
    pollDataBox.setAttribute("class", "pollDataBox");

    const pollHeader = document.createElement("h2");
    pollHeader.innerText = poll.question;
    const pollDescription = document.createElement("p");
    pollDescription.innerText = poll.description;

    console.log(poll.options);

    const pollOptions = document.createElement("form");
    pollOptions.setAttribute("id", "pollOptionsForm");
    pollOptions.setAttribute("class", "pollOptionsForm");

    poll.options.forEach((option) => {
        const pollOption = document.createElement("div");
        pollOption.setAttribute("class", "pollOption");

        const pollOptionLabel = document.createElement("label");
        pollOptionLabel.setAttribute("for", option.id);
        pollOptionLabel.innerText = option.value;

        const pollOptionInput = document.createElement("input");
        pollOptionInput.setAttribute("type", "radio");
        pollOptionInput.setAttribute("id", option.id);
        pollOptionInput.setAttribute("name", "pollOption");
        pollOptionInput.setAttribute("value", option.id);
        pollOption.append(pollOptionInput, pollOptionLabel);
        pollOptions.append(pollOption);
    });

    const pollVotesBtn = document.createElement("button");
    pollVotesBtn.setAttribute("id", "pollResultsBtn");
    pollVotesBtn.setAttribute("class", "pollResultsBtn");
    pollVotesBtn.addEventListener("click", () => userVoteRegister(poll));
    pollVotesBtn.innerText = "Votar";

    pollDataBox.append(pollHeader, pollDescription, pollOptions, pollVotesBtn);
    mainPage.append(pollDataBox);
}


function userVoteRegister(poll) {
     
}

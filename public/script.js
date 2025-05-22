const BASE_URL = "http://localhost:8080";

const mainPage = document.getElementById("mainpage");

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", userLogin);
const userForm = document.getElementById("userForm");
const loginBox = document.getElementById("loginBox");


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
        if(res.accessToken){
            localStorage.setItem("accessToken", res.accessToken);
            showPollInput();
        }
        else{
            const alertUserLogin = document.createElement("p");
            alertUserLogin.innerText = "El usuario o la contraseña son incorrectos";
            alertUserLogin.style.color = "red";

            userForm.appendChild(alertUserLogin);
        }
    })
    
    .catch((err) => console.log(err));
}

const showPollInput = () => {
    loginBox.innerHTML = "";

    const pollAccessForm = document.createElement("section");
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
    console.log("Accediendo a la encuesta");
    const pollId = document.getElementById("pollIdInput").value;

    await fetch(`${BASE_URL}/polls/${pollId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("accessToken")}`,
        },
    })
    
    .then((res) => res.json())
    .then((poll) => {
        mainPage.innerHTML = "";
        showPollData(poll);
    })
    
    .catch((err) => console.log(err));
}

const showPollData = (poll) => {
    const pollData = document.createElement("section");
    pollData.setAttribute("class", "pollData");

    const pollHeader = document.createElement("h2");
    pollHeader.innerText = poll.question;

    const pollDescription = document.createElement("p");
    pollDescription.innerText = poll.description;

    const pollOptions = document.createElement("ul");
    poll.options.forEach((option) => {
        const pollOption = document.createElement("li");
        pollOption.innerText = option;
        pollOptions.appendChild(pollOption);
    });

    const pollResultsBtn = document.createElement("button");
    pollResultsBtn.setAttribute("id", "pollResultsBtn");
    pollResultsBtn.setAttribute("class", "pollResultsBtn");
    pollResultsBtn.addEventListener("click", () => getPollResults(poll));
    pollResultsBtn.innerText = "Ver resultados";

    pollData.append(pollHeader, pollDescription, pollOptions, pollResultsBtn);
    mainPage.append(pollData);
}
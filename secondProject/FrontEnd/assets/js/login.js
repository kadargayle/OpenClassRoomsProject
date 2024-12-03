//#region - /* ===== FETCH VERIFICATION ===== */
if (!window.fetch) {
    alert("Your browser does not support fetch API");
}
//

//#region - /*===== VARIABLES =====*/
const emailInput = document.querySelector("form #email");
const passwordInput = document.querySelector("form #password");
const loginForm = document.querySelector("form");
const messageError = document.querySelector("#messageError");
//



//#region - /*===== PROCESS LOGIN =====*/
/* Add an event listener for the login form */
loginForm.addEventListener("submit", (e) => {

    /* Prevent the login form from reloading the page */
    e.preventDefault();

    /* Retrieve the values entered by the user in the email and password fields */
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    // Clear any previous error messages
    //messageError.textContent = "";

    /* Check if the fields are empty. Display an error message 
    if any of the fields are empty and stop execution */
    if (!userEmail || !userPassword) {
        messageError.textContent = "Error in the username or password";
        messageError.style.color = "red"; // Optional: Style the error message
        return; // Stop further
    }

    /* Prepare the data to be sent to the server as a JSON object */
    const login = {
        email: userEmail,
        password: userPassword,
    };

    /* Convert the login object into a JSON string */
    const user = JSON.stringify(login);

    /* Send a POST request to the server for user authentication */
    fetch("http://localhost:5678/api/users/login", {
        method: "POST", /* HTTP request method */
        mode: "cors", /* Cross-Origin Resource Sharing mode to allow requests from another domain */
        credentials: "same-origin", /* Use the same credentials as the calling resource */
        headers: { "Content-Type": "application/json" }, /* Request headers specifying JSON content */
        body: user, /* Request body containing user data in JSON format */
    })

        /* Process the server's response to the request */
        .then((response) => {
            if (!response.ok) {
                /* Handle errors if the server response is unsuccessful */
                return response.json().then((error) => {
                    throw new Error(`Request error: ${error.message}`);
                });
            }
            return response.json(); /* Parse the successful HTTP response into JSON */
        })

        /* Handle the data returned by the server after successful authentication */
        .then((data) => {
            /* Extract the token and user ID from the JSON response */
            const { userId, token: userToken } = data;

            /* Store the token and user ID in the browser's sessionStorage */
            window.sessionStorage.setItem("token", userToken, "userId", userId);
            window.sessionStorage.setItem("logged", "true"); /* Add a login indicator */

            /* Redirect the user to the index.html page after successful authentication */
            window.location.href = "./index.html";
        })

        /* Handle errors during the request or data processing */
        .catch((error) => {
            console.error("An error occurred while fetching data", error);
        });
});

//#endregion

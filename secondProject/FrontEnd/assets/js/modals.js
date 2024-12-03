//#region - /* ===== FETCH VERIFICATION ===== */
if (!window.fetch) {
    alert("Your browser does not support fetch API");
}
//

//#region - /*===== MODALS =====*/
/* DOM element for modal 1 */
const containerModals = document.querySelector(".container-modals");
const closeModals = document.querySelector(".container-modals .fa-xmark");
const projectModal = document.querySelector(".project-modal");

/* Create modal 1 to manage projects */
function modal() {
    if (logged === "true") {
        logout.addEventListener("click", () => {
            /* Logout: Update sessionStorage */
            window.sessionStorage.removeItem("logged");
        });
    }
    /* On clicking "Edit," display the modal to manage projects */
    divEdit.addEventListener("click", () => {
        containerModals.style.display = "flex";
    });
    /* On clicking the "X" in the modal, close the modal for managing projects */
    closeModals.addEventListener("click", () => {
        containerModals.style.display = "none";
    });
    /* Allow closing the modal by clicking outside the modal (not using the "X") */
    containerModals.addEventListener("click", (e) => {
        if (e.target.className === "container-modals") {
            containerModals.style.display = "none";
        }
    });
    /* Allow closing the modal by pressing the "Escape" key */
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            containerModals.style.display = "none";
        }
    });
}
modal()

/* Display and manage the image gallery in modal 1 */
async function displayWorkModal() {
    projectModal.innerHTML = "";
    const imageWork = await getWorks();
    imageWork.forEach(project => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = project.id;

        /* Add an event listener for clicking the trash icon */
        trash.addEventListener("click", () => {
            /* Retrieve the authentication token from sessionStorage */
            const token = window.sessionStorage.getItem("token");
            /* Send a DELETE request to the server to delete the project */
            fetch(`http://localhost:5678/api/works/${project.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                /* Remove the image from the gallery */
                figure.remove();
                /* Refresh the image gallery */
                displayWorks();
            })
            .catch(error => {
                console.error(error);
            });
        });

        img.src = project.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        projectModal.appendChild(figure);
    });
}
displayWorkModal();


/* DOM element for modal 2 */
const btnAddWorkModal = document.querySelector(".modal-project button");
const btnValidModal = document.querySelector(".container-button-addworks .button-modal-2");
const modalAddWork = document.querySelector(".modal-addworks");
const modalProjet = document.querySelector(".modal-project");
const arrowleft = document.querySelector(".modal-addworks .fa-arrow-left");
const markAdd = document.querySelector(".modal-addworks .fa-xmark");

/* Function to display modal 2 */
function displayAddWorkModal() {
    /* When the button in modal 1 is clicked, show modal 2 to add an image */
    btnAddWorkModal.addEventListener("click", () => {
        modalAddWork.style.display = "flex"; /* Show modal 2 */
        modalProjet.style.display = "none"; /* Hide modal 1 */
    });
    /* When the back arrow is clicked, return to modal 1 */
    arrowleft.addEventListener("click", () => {
        modalAddWork.style.display = "none"; /* Hide modal 2 */
        modalProjet.style.display = "flex"; /* Show modal 1 */
    });
    /* When the close icon in modal 2 is clicked, close the window and return to the index */
    markAdd.addEventListener("click", () => {
        containerModals.style.display = "none";
    });
}
displayAddWorkModal();



/* DOM elements for modal 2 for previewing the uploaded image */
const previewImg = document.querySelector(".container-file img");
const inputFile = document.querySelector(".container-file input");
const labelFile = document.querySelector(".container-file label");
const iconFile = document.querySelector(".container-file .fa-image");
const pFile = document.querySelector(".container-file p");

/* Function to handle image preview */
function imagePreview() {
    /* Retrieve the selected file from the file input */
    const file = inputFile.files[0];
    console.log(file);

    /* Check if the file exists and is an image */
    if (file && file.type.startsWith("image/")) {
        /* Create a FileReader object to read the file's content */
        const reader = new FileReader();

        /* Function executed when file reading is complete */
        reader.onload = function (e) {
            try {
                /* Set the preview image source to the file's data URL */
                previewImg.src = e.target.result;

                /* Update styles to display the image and hide other elements */
                previewImg.style.display = "flex";
                labelFile.style.display = "none";
                iconFile.style.display = "none";
                pFile.style.display = "none";
            } catch (error) {
                /* Handle errors during UI updates */
                console.error("An error occurred while reading the file:", error);
            }
        };

        /* Read the file content as a data URL */
        reader.readAsDataURL(file);
    } else {
        /* Log a message if the file is not a valid image */
        console.log("Please select a valid image.");
    }
}

/* Function to update the CSS style of the "Validate" button and make it functional 
   when the fields "image, title & category" are filled */
   function formCompleted() {
    const title = document.querySelector("#title");
    const category = document.querySelector("#category-input");
    const buttonValidForm = document.querySelector(".container-button-addworks button");
    
    if (title.value !== "" && inputFile.files[0] !== undefined && category.value !== "") {
        buttonValidForm.classList.remove("button-modal-2");
        buttonValidForm.classList.add("button-modal-2-active");
        buttonValidForm.disabled = false; /* Enable the "Validate" button if inputs are filled */
        
        buttonValidForm.addEventListener("click", () => {
            containerModals.style.display = "none";
        });

    } else {
        buttonValidForm.classList.remove("button-modal-2-active");
        buttonValidForm.classList.add("button-modal-2");
        buttonValidForm.disabled = true; /* Disable the "Validate" button if inputs are not filled */
    }
}


/* Wait for the DOM to be fully loaded before attaching event listeners */
document.addEventListener("DOMContentLoaded", function () {
    /* Select the form in the DOM */
    const form = document.querySelector("form");
    const title = document.querySelector("#title");
    const category = document.querySelector("#category-input");

    /* Add event listeners for changes in the file input, title, and category fields */
    inputFile.addEventListener("change", imagePreview);
    title.addEventListener("change", formCompleted);
    category.addEventListener("change", formCompleted);

    /* Add an event listener for form submission */
    form.addEventListener("submit", async (e) => {
        /* Prevent the default form submission behavior */
        e.preventDefault();

        const payload = new FormData();

        /* Log the values of title, category, and file to the console */
        console.log(title.value);
        console.log(category.value);
        console.log(inputFile.files[0]);

        /* Add form data to the FormData object for the HTTP request */
        payload.append("title", title.value);
        payload.append("category", category.value);
        payload.append("image", inputFile.files[0]);

        try {
            /* Retrieve the token from session storage */
            const token = window.sessionStorage.getItem("token");
            /* Send a POST request to the server with the form data */
            const response = await fetch("http://localhost:5678/api/works/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: payload,
            });

            /* Check if the server response is OK */
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            /* Parse the JSON data from the response */
            const data = await response.json();
            /* Log a success message to the console */
            console.log("New image successfully uploaded!" + data);
            /* Refresh the image gallery and the modal for deleting an image */
            displayWorks();
            displayWorkModal();

        } catch (error) {
            /* Handle errors during the request */
            console.log("An error occurred while uploading the image:", error.message);
        }
    });
});
//




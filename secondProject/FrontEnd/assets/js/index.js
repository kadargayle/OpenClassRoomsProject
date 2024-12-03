//#region - /* ===== FETCH VERIFICATION ===== */
if (!window.fetch) {
    alert("Your browser does not support fetch API");
}
//#endregion

//#region - /*===== "WORKS & BUTTONS" VARIABLES =====*/
/* DOM element for the gallery and category buttons */
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".container-filters");
//#endregion

//#region - /*===== WORKS (display works) =====*/
/* Asynchronous function that makes an HTTP request to retrieve data from the API */
async function getWorks() {
    try {
        /* Make an HTTP request to the specified URL */
        const response = await fetch("http://localhost:5678/api/works");

        /* Check if the HTTP response indicates success */
        if (!response.ok) {
            throw new Error('Error retrieving works from the API connection.');
        }

        /* If the response is OK, convert it to JSON and return it */
        return await response.json();
    } catch (error) {
        /* In case of an error, display the error in the console */
        console.error(error.message);
        /* Return an empty array to indicate that no works were retrieved */
        return [];
    }
}

/* Asynchronous function to display the works */
async function displayWorks() {
    /* Fetch works from the API asynchronously */
    const works = await getWorks();

    /* Clear the image gallery */
    gallery.innerHTML = "";

    /* For each work in the array, call the createWorks function with the work as an argument */
    works.forEach((work) => {
        createWorks(work);
    });
}
/* Call the function to display the works */
displayWorks();

/* Function to create DOM elements associated with a work */
function createWorks(work) {
    /* Create a <figure> element for each work */
    const figure = document.createElement("figure");

    /* Create an <img> element to display the work's image */
    const img = document.createElement("img");

    /* Create a <figcaption> element to display the work's title */
    const figcaption = document.createElement("figcaption");

    /* Set the src attribute of the img element with the URL of the work's image */
    img.src = work.imageUrl;

    /* Set the text content of the figcaption element with the work's title */
    figcaption.textContent = work.title;

    /* Append the img element as a child of the figure element */
    figure.appendChild(img);

    /* Append the figcaption element as a child of the figure element */
    figure.appendChild(figcaption);

    /* Append the figure element as a child of the element with the "gallery" class */
    gallery.appendChild(figure);
}
//#endregion


//#region - /*===== CATEGORY BUTTONS =====*/
/* Fetch categories from the array */
async function getCategories() {
    try {
        /* Makes an HTTP request to the API to retrieve categories */
        const response = await fetch("http://localhost:5678/api/categories");

        /* Checks if the HTTP response indicates success */
        if (!response.ok) {
            throw new Error('Error retrieving categories from the API connection.');
        }

        /* If the response is OK, parse it as JSON and return it */
        return await response.json();
    } catch (error) {
        /* In case of an error, log the error to the console */
        console.error(error.message);

        /* Returns an empty array to indicate that no categories were retrieved */
        return [];
    }
}

/** 
/* Display the categories from the array */
async function displayCategoriesButtons() {

    /* Call the getCategories function to retrieve categories from the API */
    const categories = await getCategories();

    /* For each retrieved category, create a button and append it to an element with the class "container-filters" */
    categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);
    });
}
/* Call the displayCategoriesButtons function to display the category buttons in the DOM */
displayCategoriesButtons();





/* Filtering category buttons */
async function filterCategories() {
    /* Fetch works asynchronously */
    const images = await getWorks();

    /* Select all buttons within the element with the class "container-filters" */
    const buttons = document.querySelectorAll(".container-filters button");

    /* Add a "click" event listener to each button */
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            /* Remove the "active" class from all buttons */
            buttons.forEach((btn) => {
                btn.classList.remove("active");
            });

            /* Add the "active" class only to the clicked button */
            button.classList.add("active");

            /* Get the ID of the clicked button */
            const btnId = e.target.id;

            /* Clear the image gallery */
            gallery.innerHTML = "";

            /* Filter images based on the button's ID */
            const filteredImages = images.filter((work) => {
                /* If the button's ID matches the work's category ID
                or the button's ID is "0", display the work in the gallery */
                return btnId == work.categoryId || btnId == "0";
            });

            /* Create the filtered works in the gallery */
            filteredImages.forEach((work) => {
                createWorks(work);
            });
        });
    });
}
/* Call the function to filter categories on page load */
filterCategories();

//#region - /*===== ADMIN MODE =====*/
    /* If the user is logged in, getItem retrieves the value from window.sessionStorage */
    const logged = window.sessionStorage.getItem("logged");

    /* DOM element for admin mode */
    const logout = document.querySelector("header nav .logout");

    /* DOM element for the navbar in admin mode */
    const portfolio = document.querySelector("#portfolio");
    const portfolioTitle = document.querySelector("#portfolio h2");
    const adminTitle = " Edit Mode";
    const LogoAdminMod = `<i class="fa-regular fa-pen-to-square"></i>`;
    const adminLog = `<div class="admin-mod"><p>${LogoAdminMod}${adminTitle}</p></div>`;
    const divEdit = document.createElement("div");
    const spanEdit = document.createElement("span");
    const adminConnectionDown = `${LogoAdminMod}  ${adminTitle} `;

    function successfulAuthentication() {
        /* If the user's authentication with the API is successful */
        window.sessionStorage.setItem("logged", true);
        /* Call the administrator function */
        administrator();
    }

    function administrator() {
        if (logged) {
            logout.textContent = "logout";
            document.body.insertAdjacentHTML("afterbegin", adminLog);
            spanEdit.innerHTML = LogoAdminMod + " Edit";
            divEdit.classList.add("div-edit");
            divEdit.appendChild(portfolioTitle);
            divEdit.appendChild(spanEdit);
            portfolio.prepend(divEdit);
            filters.style.display = "none";
        }
    }
    /* Call the successfulAuthentication function to trigger DOM changes */
    successfulAuthentication();
    //#endregion
    
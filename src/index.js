// NEXT STEPS:
    // Update to-do object
        // Add due date prop and priority prop
        // Add a completed check
            // When clicked, task display does something to indicate it has been completed
        // Add remove button
            // When clicked, removes task from display/array
    // Update to-do form
        // Update form to have required to-do properties ✅
        // Create form submit button ✅
        // Create form cancel button ✅
    // Create function to take form input and create to-do object
        // when to-do form button is clicked, pass form input into to-do object
        // push into to-do list array
    // Create add to-do button functionality
        // When add to-do button is clicked, display the to-do form overlay
        // Once the to-do form submit button is clicked or the cancel button is clicked, remove overlay


import "./style.css";

const content = document.querySelector(".content");
const mainContent = document.querySelector(".main-content");

// This will handle our form to add to-do items
function handleForm() { 
    const overlayContainer = document.createElement("div");
    overlayContainer.classList.add("overlay-container");
    document.body.insertBefore(overlayContainer, content);

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content")
    overlayContainer.appendChild(overlayContent);

    // When add to-do button is clicked, add to-do overlay form is displayed 
    const handleOverlay = () => {
        const overlayBtn = document.querySelector("#btn-add-todo");

        overlayBtn.addEventListener('click', () => {
            overlayContainer.classList.add("overlay-container-show");
        })

    }

    const Form = () => {
        // Create form
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "#");
        form.setAttribute("id", "frm-add-todo");
        overlayContent.appendChild(form);

        // Create label for form element
        const createLabel = (labelFor, labelText) => {
            // Create label
            const label = document.createElement("label");
            label.setAttribute("for", labelFor);
            label.textContent = `${labelText}: `;
            form.appendChild(label);
        }

        // Create form element
        const createFormItem = (element, name, type) => {
            const el = document.createElement(element);
            if (type !== undefined) {
                el.setAttribute("type", type);
            }
            el.setAttribute("name", name);
            createLabel(name, `${name}`)
            form.appendChild(el);
        }

        // Create overlay container for buttons
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-overlay-container");
        overlayContent.appendChild(btnContainer);
        
        // Create button for add to-do overlay
        const createFormBtn = (text) => {
            const btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.setAttribute("id", `btn-overlay-${text.toLowerCase()}`);
            btn.classList.add("btn-overlay");
            btn.textContent = text;
            btnContainer.appendChild(btn);
        }

        return { createFormItem, createFormBtn };
    }

    function createToDoOverlay() {
        handleOverlay();
        const addToDoForm = Form();
        addToDoForm.createFormItem("input", "Title", "input");
        addToDoForm.createFormItem("textarea", "Description");
        addToDoForm.createFormItem("input", "date", "date");
        addToDoForm.createFormBtn("Cancel");
        addToDoForm.createFormBtn("Add");

        const handleBtns = () => {
            const cancelBtn = document.querySelector("#btn-overlay-cancel");
            // When cancel is clicked, remove overlay-container-show class
            cancelBtn.addEventListener('click', () => {
                if (overlayContainer.classList.contains("overlay-container-show")) {
                    overlayContainer.classList.remove("overlay-container-show");
                }
            })
        }

        handleBtns();
    }

    createToDoOverlay();
    
}

// This will handle our to-do items
function handleToDo() {

    const toDoList = [];    // Store our to-do

    const ToDo = (title, description) => {  // Create to do object           
        const getTitle = () => title;
        const getDescription = () => description;

        const displayToDo = (id) => {
            const todoContainer = document.createElement("div");
            const ti = document.createElement("p");
            const desc = document.createElement("p");

            todoContainer.classList.add("todo");
            todoContainer.setAttribute("id", `todo-${id}`);

            ti.innerText = title;
            desc.innerText = description;

            todoContainer.appendChild(ti);
            todoContainer.appendChild(desc);
            mainContent.appendChild(todoContainer);
        }
        return { getTitle, getDescription, displayToDo };
    };

    const item = ToDo('Call mom', 'I need to call mother');
    const item2 = ToDo('Get groceries', 'Pick up at 2:00');
    const item3 = ToDo('Pick up brother', 'Pick up at 5:00');
    toDoList.push(item, item2, item3);
    console.log(toDoList);

    for (let i = 0; i < toDoList.length; i++) { // Loops through to do list array and displays each to do
        toDoList[i].displayToDo(i);
    }
}

handleForm();
handleToDo();
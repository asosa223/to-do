// NEXT STEPS:
    // Update to-do object
        // Add due date prop and priority prop ✅
        // Add a completed check
            // When clicked, task display does something to indicate it has been completed
        // Add remove button ✅
            // When clicked, removes task from display ✅
            // When clicked, remove object from todoList array
    // Update to-do form
        // Update form to have required to-do properties ✅
        // Create form submit button ✅
        // Create form cancel button ✅
    // Create function to take form input and create to-do object
        // when to-do form button is clicked, pass form input into to-do object ✅
        // push into to-do list array ✅
    // Create add to-do button functionality
        // When add to-do button is clicked, display the to-do form overlay ✅
        // Once the to-do form add button is clicked or the cancel button is clicked, remove overlay ✅
    // Clean code up a bit 
    // Need to add form validation
        // if no inputs, respond with error message
        // adjust inputs so they are consistent
    // Filter to-dos by date
        // Home should show all to-dos
        // Today should show to-dos with same day date
        // Week should show to-dos within week of due date M-Sun


import "./style.css";

const content = document.querySelector(".content");
const mainContent = document.querySelector(".main-content");

const todos = [];

// This will handle our to-do items
function handleToDo() {

    const ToDo = (id, title, description, due, urgent) => {  // Create to do object      
        const getTitle = () => title;
        const getDescription = () => description;
        const getDue = () => due;

        todos.push({ id, title, description, due, urgent });

        const displayToDo = () => {
            const todoContainer = document.createElement("div");
            const ti = document.createElement("p");
            const desc = document.createElement("p");
            const du = document.createElement("p");
            const removeButton = document.createElement("button");

            todoContainer.classList.add("todo");
            todoContainer.setAttribute("id", `todo-${id}`);

            ti.innerText = title;
            desc.innerText = description;
            du.innerText = due;
            removeButton.innerText = "Del";

            todoContainer.appendChild(ti);
            todoContainer.appendChild(desc);
            todoContainer.appendChild(du);
            todoContainer.appendChild(removeButton);
            mainContent.appendChild(todoContainer);
            
            if (urgent === true) {
                todoContainer.classList.add("todo-urgent");
            }

            removeButton.addEventListener('click', () => {
                todoContainer.remove(`todo-${id}`);

                // iterate through todos array backwards and splice item with matching id
                for (let i = todos.length - 1; i >= 0; --i) {
                    if (todos[i].id === id) {
                        todos.splice(i,1);
                    }
                }
                console.log(todos);
            })
        }

        return { getTitle, getDescription, getDue, displayToDo };
    };

    return { ToDo };
}    

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
        const formCreate = document.createElement("form");
        formCreate.setAttribute("method", "post");
        formCreate.setAttribute("action", "#");
        formCreate.setAttribute("id", "frm-add-todo");
        overlayContent.appendChild(formCreate);

        // Create label for form element
        const createLabel = (labelFor, labelText) => {
            // Create label
            const label = document.createElement("label");
            label.setAttribute("for", labelFor);
            label.textContent = `${labelText}: `;
            formCreate.appendChild(label);

            return label;
        }

        // Create form element
        const createFormItem = (element, name, type) => {
            const el = document.createElement(element);
            if (type !== undefined) {
                el.setAttribute("type", type);
            }
            el.setAttribute("name", name);
            el.setAttribute("id", `add-todo-${name.toLowerCase()}`);

            // if checkbox, append inside label
            if (type === "checkbox") {
                createLabel(name, `${name}`).appendChild(el);
            } else {
                createLabel(name, `${name}`)
                formCreate.appendChild(el);
            }
        }

        // Create overlay container for buttons
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-overlay-container");
        overlayContent.appendChild(btnContainer);
        
        // Create button for add to-do overlay
        const createFormBtn = (text, type) => {
            const btn = document.createElement("button");
            if (type !== undefined) {
                btn.setAttribute("type", type.toLowerCase());
            } else {
                btn.setAttribute("type", "button");
            }
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
        addToDoForm.createFormItem("input", "Date", "date");
        addToDoForm.createFormItem("input", "Urgent", "checkbox");
        addToDoForm.createFormBtn("Cancel");
        addToDoForm.createFormBtn("Add");

        const handleBtns = () => {
            const cancelBtn = document.querySelector("#btn-overlay-cancel");
            const addBtn = document.querySelector("#btn-overlay-add");

            // When cancel is clicked, remove overlay-container-show class
            cancelBtn.addEventListener('click', () => {
                if (overlayContainer.classList.contains("overlay-container-show")) {
                    overlayContainer.classList.remove("overlay-container-show");
                }
            })

            // will hold count of added items
            let count = 0;
            // When add button is clicked: 
                // pass information and create to-do object
                // display to-do object
            addBtn.addEventListener('click', () => {
                // select form
                const form = document.querySelector("#frm-add-todo");

                // pass form data
                const title = form.elements['add-todo-title'];
                const description = form.elements['add-todo-description'];
                const dueDate = form.elements['add-todo-date'];
                const urgent = form.elements['add-todo-urgent'];
                const date = new Date(dueDate.value).toLocaleDateString('en-US');

                // Pass values to create todo
                handleToDo().ToDo(count, title.value, description.value, date, urgent.checked).displayToDo();

                // clear form input
                title.value = "";
                description.value = "";
                dueDate.value = "";
                urgent.checked = false;

                count++;
        
                // remove overlay-container-show class to remove overlay
                if (overlayContainer.classList.contains("overlay-container-show")) {
                    overlayContainer.classList.remove("overlay-container-show");
                }
            })
        }

        handleBtns();
    }

    createToDoOverlay();
    
}

handleForm();
handleToDo();
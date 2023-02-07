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
        // Home should show all to-dos and allow ability to add to-do ✅
            // if on today or week tab, disable add to-do button
            // when clicking home, display all to-dos ✅
        // Today should show to-dos with same day date ✅
            // If Today clicked, show to-dos with todays date ✅
        // Week should show to-dos within week of due date M-Sun
            // If Week clicked, show to-dos within same week of current day ✅


import "./style.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import { format, parseISO, endOfWeek, isSameDay } from 'date-fns';

const content = document.querySelector(".content");
const mainContent = document.querySelector(".main-content");

const todos = [];

export { content, mainContent, todos };

// This will handle our to-do items
function handleToDo() {
    
    const ToDo = (id, title, description, due, urgent) => {  // Create to do object      

        // Create our todo parts and append to the main container
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
            du.innerText = format(due, "M/d/yyyy");
            removeButton.innerText = "Del";

            todoContainer.appendChild(ti);
            todoContainer.appendChild(desc);
            todoContainer.appendChild(du);
            todoContainer.appendChild(removeButton);
            mainContent.appendChild(todoContainer);
            
            // if urgent is checks, add our urgent class
            if (urgent === true) {
                todoContainer.classList.add("todo-urgent");
            }

            // When remove button is clicked, remove same todo element
            removeButton.addEventListener('click', () => {
                todoContainer.remove(`todo-${id}`);

                // iterate through todos array backwards and splice item with matching id
                for (let i = todos.length - 1; i >= 0; --i) {
                    if (todos[i].id === id) {
                        todos.splice(i, 1);
                    }
                }
                
            });
        }

        // Push our todo object/properties into our todos array
        todos.push({ id, title, description, due, urgent, displayToDo });
        return { displayToDo };
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
            el.setAttribute("maxlength", "40");

            // if checkbox, append inside label
            if (type === "checkbox") {
                createLabel(name, `${name}`).appendChild(el);
            }
            else if (element === "textarea") {
                createLabel(name, `${name}`)
                el.setAttribute("rows", "3");
                el.setAttribute("cols", "32");
                el.setAttribute("maxlength", "50");
                formCreate.appendChild(el);
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
                const d = form.elements['add-todo-date'];
                const urgent = form.elements['add-todo-urgent'];
                const date = parseISO(d.value); // Change user input into ISO midnight time

                // Pass values to create todo
                handleToDo().ToDo(count, title.value, description.value, date, urgent.checked).displayToDo();
            

                // clear form input
                title.value = "";
                description.value = "";
                d.value = "";
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

// Handle todays to-dos display
function handleTabs() {
    // Select add todo button
    const addTodoBtn = document.querySelector(".btn-add-todo");

    // Get current day and set time to midnight
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Get end of current week and set time to midnight
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
    endOfCurrentWeek.setHours(0, 0, 0, 0);

    (function homeTab() {
        // Select home tab
        const navHome = document.querySelector("#nav-item-home");

        // When home tab is clicked, display all todos
        navHome.addEventListener('click', () => {

            // If add todo button is hidden, remove the hiding class
            if (addTodoBtn.classList.contains("btn-add-todo-hide")) {
                addTodoBtn.classList.remove("btn-add-todo-hide");
            }

            // Remove all todos displayed
            while (mainContent.firstChild) {
                mainContent.removeChild(mainContent.lastChild);
            }


            todos.forEach((todo) => {
                todo.displayToDo();
            })

        })
    })();

    (function todayTab() {
        // Select today tab
        const navToday = document.querySelector("#nav-item-today");

        // When today tab is clicked, filter todos into their own array and display them
        navToday.addEventListener('click', () => {
            const todayTodos = todos.filter((el) => isSameDay(el.due, currentDate));

            // Hide add todo button
            addTodoBtn.classList.add("btn-add-todo-hide");

            // Remove all todos displayed
            while (mainContent.firstChild) {
                mainContent.removeChild(mainContent.lastChild);
            }

            todayTodos.forEach((todo) => {
                todo.displayToDo();
            })

        })
    })();

    (function weekTab() {
        // Select week tab
        const navWeek = document.querySelector("#nav-item-week");

        // When week tab is clicked, filter todos into their own array and display them
        navWeek.addEventListener('click', () => {
            const weekTodos = todos.filter((el) => el.due <= endOfCurrentWeek);

            // Hide add todo button
            addTodoBtn.classList.add("btn-add-todo-hide");
            
            // Remove all todos displayed
            while (mainContent.firstChild) {
                mainContent.removeChild(mainContent.lastChild);
            }

            weekTodos.forEach((todo) => {
                todo.displayToDo();
            })

        })
    })();

};

handleTabs();
handleForm();
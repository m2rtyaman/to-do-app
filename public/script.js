
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
document.getElementById("addTaskButton").addEventListener("click", () => {
    if (inputBox.value === '') {
        alert("Birsey yazman gerek!");
    }
    else {
        data = {
            todoContent: inputBox.value,
        };
        fetch("http://localhost:3000/to-do-app/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(err => {
            console.log(err);
        })
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        li.appendChild(span);
        span.classList.add("deleteButton");
        clickDeleteButton();
    }
    inputBox.value = "";
});

(function(){
    Object.keys(document.getElementsByClassName("deleteButton")).forEach(e => (
        document.getElementsByClassName("deleteButton")[e].addEventListener("click", async (a) => {
    
            data = {
                deleteTask: await a.target.parentElement.innerText,
            };
            console.log(typeof a.target.parentElement.innerText);
            fetch("http://localhost:3000/to-do-app/delete", await {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).catch(err => {
                console.log(err);
            })
    
            await a.target.parentElement.remove();
    
        })
    
    ))
}())
function clickDeleteButton ()  {
    Object.keys(document.getElementsByClassName("deleteButton")).forEach(e => (
        document.getElementsByClassName("deleteButton")[e].addEventListener("click", async (a) => {

            data = {
                deleteTask: await a.target.parentElement.innerText,
            };
            console.log(typeof a.target.parentElement.innerText);
            fetch("http://localhost:3000/to-do-app/delete", await {
                method: "Post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).catch(err => {
                console.log(err);
            })

            await a.target.parentElement.remove();

        })

    ))
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
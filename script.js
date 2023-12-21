const cardDates = document.querySelectorAll('.card__date');

cardDates.forEach((cardDate, index) => {
    const input = cardDate.querySelector('.card__date-input');
    const paragraph = cardDate.querySelector('.card__date-paragraph');

    const savedDate = localStorage.getItem(`savedDate_${index}`);
    if (savedDate) {
        input.value = savedDate;
        paragraph.textContent = `${savedDate}`;
    }

    input.addEventListener('change', () => {
        const selectedDate = input.value;
        paragraph.textContent = `${selectedDate}`;

        localStorage.setItem(`savedDate_${index}`, selectedDate);
    });
});

const weeklyChoice = document.querySelectorAll('.weekly__choice');
const weeklyParagraphChoice = document.querySelectorAll('.weekly__month-choice');

function addMonth() {
    weeklyChoice.forEach((choice, index) => {
        const savedMonth = localStorage.getItem(`selectedValue_${index}`);
        if (savedMonth) {
            choice.value = savedMonth;
            weeklyParagraphChoice[index].textContent = savedMonth;
        }

        choice.addEventListener('change', () => {
            const selectedMonth = choice.value;
            weeklyParagraphChoice[index].textContent = selectedMonth;

            localStorage.setItem(`selectedValue_${index}`, selectedMonth);
        });
    });
}

addMonth();


const inputValues = document.querySelector(".priorities__input");
const addButton = document.querySelector(".priorities__button");
const taskList = document.querySelector(".priorities__task-list");


function addTask() {
    const inputValue = inputValues.value;
    
    if (inputValue === "") {
        alert("You must write something!");
    } else {
        const newTask = document.createElement("input");
        newTask.type = "checkbox";
        newTask.value = inputValue;

        const label = document.createElement("label");
        label.appendChild(newTask);
        label.appendChild(document.createTextNode(inputValue));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "×";
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            updateLocalStorage();
        });

        const listItem = document.createElement("p");
        listItem.appendChild(label);
        listItem.appendChild(deleteButton); 

        taskList.appendChild(listItem);
        
        inputValues.value = "";
        updateLocalStorage();
    }
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".priorities__task-list p").forEach(task => {
        const taskText = task.querySelector("label").innerText;
        tasks.push(taskText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", addTask);

document.addEventListener("DOMContentLoaded", function() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(taskText => {
        const newTask = document.createElement("input");
        newTask.type = "checkbox";
        newTask.value = taskText;

        const label = document.createElement("label");
        label.appendChild(newTask);
        label.appendChild(document.createTextNode(taskText));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "×";
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            updateLocalStorage();
        });

        const listItem = document.createElement("p");
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
});


const addButtons = document.querySelectorAll(".card-button");
const taskInputs = document.querySelectorAll(".card-input");
const taskLists = document.querySelectorAll(".card__task-list");

function addTaskToCard(event, index) {
    const inputValues = taskInputs[index];
    const taskList = taskLists[index];

    const inputValue = inputValues.value;

    if (inputValue === "") {
        alert("You must write something!");
    } else {
        const newTask = document.createElement("input");
        newTask.type = "checkbox";
        newTask.value = inputValue;

        const label = document.createElement("label");
        label.appendChild(newTask);
        label.appendChild(document.createTextNode(inputValue));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "×";
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            updateLocalStorageForCard(index);
        });

        const listItem = document.createElement("p");
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);

        inputValues.value = "";
        updateLocalStorageForCard(index);
    }
}

function updateLocalStorageForCard(index) {
    const taskList = taskLists[index];
    const tasks = [];
    taskList.querySelectorAll("p").forEach(task => {
        const taskText = task.querySelector("label").innerText;
        tasks.push(taskText);
    });
    localStorage.setItem(`tasks_${index}`, JSON.stringify(tasks));
}

addButtons.forEach((button, index) => {
    button.addEventListener("click", function(event) {
        addTaskToCard(event, index);
    });

    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${index}`)) || [];
    const taskList = taskLists[index];

    storedTasks.forEach(taskText => {
        const newTask = document.createElement("input");
        newTask.type = "checkbox";
        newTask.value = taskText;

        const label = document.createElement("label");
        label.appendChild(newTask);
        label.appendChild(document.createTextNode(taskText));

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "×";
        deleteButton.addEventListener("click", function() {
            listItem.remove();
            updateLocalStorageForCard(index);
        });

        const listItem = document.createElement("p");
        listItem.appendChild(label);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('notes__input');
    const addNoteButton = document.getElementById('notes__button');
    const notesList = document.getElementById('notes__list');
  
    addNoteButton.addEventListener('click', addNote);
  
    function addNote() {
      const noteText = noteInput.value.trim();
  
      if (noteText !== '') {
        const noteElement = document.createElement('div'); // Заміна <p> на <div>
        noteElement.classList.add('note-item');
        noteElement.textContent = '📔 ' + noteText;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          noteElement.remove();
          saveNotes();
        });
  
        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
        noteInput.value = '';
  
        saveNotes();
      } else {
        alert('Please enter a note before adding!');
      }
    }
  
    function saveNotes() {
      const notes = [];
      document.querySelectorAll('.note-item').forEach(note => {
        notes.push(note.textContent);
      });
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    function loadNotes() {
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      savedNotes.forEach(savedNote => {
        const noteElement = document.createElement('div'); // Заміна <p> на <div>
        noteElement.classList.add('note-item');
        noteElement.textContent = savedNote;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
          noteElement.remove();
          saveNotes();
        });
  
        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
      });
    }
  
    loadNotes();
  });
  
  
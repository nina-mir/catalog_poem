let left_col = ['every mouth',
    'every hand',
    'every chest',
    'every body',
    'every step',
    'every knee',
    'every thigh',
    'every finger',
    'every eye',
    'every smile',
    'every kiss',
    'every ear',
    'every nose',
    'every back',
    'every brain',
    'every hip',
    'every soul',
    'every heartbeat',
    'every breath']

let right_col = ['an oubliette',
    'a promise',
    'a sack of cats',
    'a river',
    'an exit',
    'the shape of prayer',
    'a pantry of lust',
    'a name',
    'a sin',
    'a scythe',
    'a nesting doll',
    'a glutton',
    'a wolf',
    'a beast of burden',
    'a whip',
    'a thirst for touch',
    'a currency',
    'a stumble',
    'a pearly gate']

let left_list = document.getElementById("left")
let right_list = document.getElementById("right")

left_col.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerHTML = item;
    li.setAttribute("draggable", "true");
    li.setAttribute("id", "l" + i);
    left_list.appendChild(li);
})

var original_list = []

right_col.forEach((item, i) => {
    let li = document.createElement("li");
    li.innerHTML = item;
    li.setAttribute("draggable", "true");
    li.setAttribute("id", "r" + i);
    original_list.push(li);
})

randomize(original_list);

original_list.forEach(item => {
    right_list.appendChild(item);
})

// Fisher–Yates shuffle Algorithm| source: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ 
function randomize(arr) {

    // Start from the last element and swap
    // one by one. We don't need to run for
    // the first element that's why i > 0
    for (let i = arr.length - 1; i > 0; i--) {

        // Pick a random index from 0 to i inclusive
        let j = Math.floor(Math.random() * (i + 1));

        // Swap arr[i] with the element
        // at random index
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}


// Coding the drag behavior 
const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');

//current phrase beng dragged
let selectedId;

//target phrase
let dropTargetId;

// counter for correct phrases
let matchingCounter = 0;


function dragStart() {
    selectedId = this.id;
    console.log(selectedId);
}

function dragEnter() {
    this.classList.add("over");
}

function dragLeave() {
    this.classList.remove("over");
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragDrop() {
    dropTargetId = this.id;
    console.log(dropTargetId);
    this.classList.remove("over");
    if (checkForMatch(selectedId, dropTargetId)) {
        document.getElementById(selectedId).style.display = 'none';
        document.getElementById(dropTargetId).style.display = 'none';
        matchingCounter++;
    }

    if (matchingCounter === right_col.length) {
        endMessage.style.display = "block";
    }

}

function checkForMatch(selected, dropTarget) {
    // check if the id of selected is equl to dropTarget
    // extract the numerical part of the selected/target ids
    if (selected[0] != dropTarget[0]) {
        selected_num_id = selected.slice(1);
        drop_num_id = dropTarget.slice(1);

        return selected_num_id == drop_num_id ? true : false;

    }
}

addEventListeners();

function playAgain() {
    matchingCounter = 0;
    endMessage.style.display = 'none';
    draggableListItems.forEach(item => {
        document.getElementById(item.id).style.display = 'block';
    })

}


function addEventListeners() {
    draggableListItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
    });
}
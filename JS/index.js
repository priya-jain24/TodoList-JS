//blur effect
var maincontainer = document.querySelector(".main-container");
function blurEffect(){
    maincontainer.classList.add("blur");
}
// document.querySelector("#close-btn").addEventListener("click",removeBlurEffect('#addlist'))

// document.querySelector("#close-itembtn").addEventListener("click",removeBlurEffect('#additemlist'))

function removeBlurEffect(id){
    maincontainer.classList.remove("blur");
    $(id).modal('hide');
}
//initialise
var allItems = [];
var main_item_index = 0;
var count_items = 0;
function Item(data,id){
    this.data = data;
    this.subtask = [];
    this.id = id;

}
function SubItem(data,id,complete){
    this.data = data;
    this.id = id;
    this.complete = complete;
}
//add item click function
document.querySelector("#add-btn").addEventListener('click',addItems);
function addItems(){
    var input_data = document.getElementById("add-input").value;
    var parent_elem = document.getElementsByClassName("all-cards");
    const node = document.createElement("div");
    node.className = "todocard_" + count_items;
    node.innerHTML = `<div class="card-heading">
                        <p>${input_data}</p>
                    </div>
                    <div class="allcard-body">
                    <hr>
                    <ul class="allcard-list">
                    </ul>
                    </div>
                    <div class="allcard-footer">
                        <button class="btn" id="delete-btn" onclick="deleteItem(${count_items})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button class="btn" id="additem-btn" data-target="#additemlist" data-toggle="modal" data-backdrop="static" data-keyboard="false" onclick="getTaskID(${count_items})">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>`
    parent_elem[0].append(node);
    var newitem = new Item(input_data,node.className);
    allItems.push(newitem);
    count_items += 1;
    document.querySelector('.no_item').style.display = "none";
    removeBlurEffect('#addlist');
}
// function getSingleData(id){
//     var elem = document.getElementById(id);
//     var parent_elem = document.getElementsByClassName(single-cards);
//     parent_elem.appendChild(elem);
//     document.querySelector(".single-cards").style.display = "block";
//     document.querySelector(".all-cards").style.display = "none";
// }

function deleteItem(index){
    allItems.splice(index,1);
    $(".todocard_"+index).remove();
    allItems.length == 0?document.querySelector('.no_item').style.display = "block":document.querySelector('.no_item').style.display = "none";
}

function getTaskID(index){
    main_item_index = index;
    blurEffect();
}

// add subtask
document.querySelector("#add-itembtn").addEventListener('click',addSubTask);
function addSubTask(){
    var input_data = document.getElementById("add-iteminput").value;
    var parent_elem = document.querySelector(".todocard_"+main_item_index + " ul");
    const node = document.createElement("li");
    var len = parent_elem.children.length;
    var node_id = "todocard_"+main_item_index+"_"+len;
    node.id = node_id;
    node.innerHTML = `${input_data}<button class="mark-btn" id="btn_${node_id}" onclick="markComplete('${node_id}')">Mark Done</button>`;
    parent_elem.append(node);
    var data = allItems.filter(x => x.id == "todocard_"+main_item_index)[0];
    var new_subtask = new SubItem(input_data, node_id, false);
    data.subtask.push(new_subtask);
    removeBlurEffect('#additemlist');

}

function markComplete(index){
    document.querySelector("#"+index).classList.add("mark-heading");
    document.querySelector("#btn_"+index).style.visibility = "hidden";
    var main_id_arr = index.split("_");
    var main_id = main_id_arr[0] + "_" + main_id_arr[1];
    var data = allItems.filter(x => x.id == main_id)[0];
    var subtask = data.subtask.filter(x => x.id == index)[0];
    subtask.complete = true;
}
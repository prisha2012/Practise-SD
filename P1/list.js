let selectedIndex = -1; 

    const list = document.getElementById("list");
    const count = document.getElementById("count");
    

    let items = JSON.parse(localStorage.getItem("items")) || [];
    items = items.map(item => {
    if (typeof item === "string") {
        return { text: item, done: false,children:[]};
    }
    if(!item.children)item.children=[];
    return item;
});
function render(){
    list.innerHTML="";
    let total=items.length
    let done=items.filter(item=>item.done).length;
    let pending=total-done;

    count.innerText = `Total: ${total} | Done: ${done} | Pending: ${pending}`;
    items.forEach((item,index)=>{
        const li = document.createElement("li");
        li.className = "bg-zinc-700 p-2 rounded ";
        li.dataset.index=index;

        li.innerHTML=`
        <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
        <input type="checkbox" ${item.done?"checked":""}/>
        <span class="${item.done?"line-through text-gray-400":""}">
        ${item.text}
        </span>
        </div>
         <div>
                    <button data-action="add-child">➕</button>
                    <button data-action="edit">✏️</button>
                    <button data-action="delete">❌</button>
                </div>
                </div>
        <ul class="ml-5 mt-2 space-y-1">
        ${item.children.map((child,i)=> `
    <li data-child="${i}" class="bg-zinc-600 p-1 rounded">
        ${child}
    </li>
`).join("")}
        </ul>
        `;
        list.appendChild(li);


    });
}
render();
list.addEventListener("click", (e) => {

    const li = e.target.closest("li[data-index]");
    if (!li) return;

    const index = li.dataset.index;
selectedIndex = index;
    list.querySelectorAll("li").forEach(el => el.classList.remove("bg-zinc-600"));
    li.classList.add("bg-zinc-600");
    if (e.target.type === "checkbox") {
        items[index].done = e.target.checked;
        save();
    }
    if (e.target.dataset.action === "delete") {
        if (!confirm("Delete item?")) return;
        items.splice(index, 1);
        save();
    }
   if (e.target.dataset.action === "edit") {
        const val = prompt("Edit item:", items[index].text);
        if (val && val.trim() !== "") {
            items[index].text = val.trim();
            save();
        }
    }
  if (e.target.dataset.action === "add-child") {
        const val = prompt("Child item:");
        if (val && val.trim() !== "") {
            items[index].children.push(val.trim());
            save();
        }
    }

    if (e.target.dataset.child !== undefined) {
        li.classList.add("bg-blue-500");
        setTimeout(() => li.classList.remove("bg-blue-500"), 400);
    }
});
function save(){
    localStorage.setItem("items", JSON.stringify(items));
    render();
}

function loadItems(){
    const list=document.getElementById("list");
    list.innerHTML="";
    let items=JSON.parse(localStorage.getItem("items"))||[];
    items.forEach((item,index)=>{
        const li=document.createElement("li");
        li.className="flex justify-between bg-zinc-700 p-2 rounded";

        const span=document.createElement("span");
        span.innerText=item;

        const div=document.createElement("div");

        const editBtn=document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.onclick=()=>{
            const newValue=prompt("Edit item:", item);
            if(newValue&&newValue.trim()!=""){
                items[index]=newValue;
                localStorage.setItem("items", JSON.stringify(items));
                loadItems();
            }
        };
        const deleteBtn=document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.onclick=()=>{
            items.splice(index,1);
            localStorage.setItem("items", JSON.stringify(items));
            loadItems();
        };
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(div);
        list.appendChild(li);

    });
}

loadItems();
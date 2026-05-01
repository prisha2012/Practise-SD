document.getElementById("addBtn").addEventListener("click", addItem);

function addItem() {
    const input=document.getElementById("input");
    const value=input.value.trim();
    if(!value)return;

    let items=JSON.parse(localStorage.getItem("items"))||[];
    items.push(value);

    localStorage.setItem("items", JSON.stringify(items));
    input.value="";
    alert("Item added successfully!");
}
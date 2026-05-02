const input=document.getElementById("input");
const preview=document.getElementById("preview");

input.addEventListener("input",()=>{
    preview.innerText=input.value?"Typing: "+input.value: "";
});
input.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        addItem();
    }
});
function addItem() {
    const value=input.value.trim();
    if(!value)return;
 
    let items=JSON.parse(localStorage.getItem("items"))||[];
    items.push(value);

    localStorage.setItem("items",JSON.stringify(items));
    input.value="";
    preview.innerText="";
    alert("Item added successfully!");
}
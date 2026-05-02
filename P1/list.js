let selectedIndex = -1; 
function loadItems(){
    const list=document.getElementById("list");
    list.innerHTML="";
    let items=JSON.parse(localStorage.getItem("items"))||[];
    items.forEach((item,index)=>{
        const li=document.createElement("li");
        li.className="flex justify-between bg-zinc-700 p-2 rounded";
         li.innerText=item;

        li.addEventListener("click",()=>{
            selectedIndex=index;
            document.querySelectorAll("li").forEach((el)=>{
                el.classList.remove("bg-blue-500");
            });
            
            li.classList.add("bg-blue-500");
            });
        //     const confirmDelete=confirm("Do you want to delete this item?");
        //     if(!confirmDelete)return;
        //     items.splice(index,1);
        //     localStorage.setItem("items", JSON.stringify(items));
        //     loadItems();
           
        // });
        li.addEventListener("dblclick",(e)=>{
            e.stopPropagation(); 
                const newValue=prompt("Edit item:", item);
                if(newValue&&newValue.trim()!==""){
                    items[index]=newValue;
                    localStorage.setItem("items", JSON.stringify(items));
                    loadItems();
                }
        });
        list.appendChild(li);

    });
        document.onkeydown=function(e){
            if(e.key==="Delete" && selectedIndex!==-1){
                let confirmDelete=confirm("Do you want to delete this item?");
                if(!confirmDelete)return;
                items.splice(selectedIndex,1);
                localStorage.setItem("items", JSON.stringify(items));
                selectedIndex=-1;
                loadItems();
            }
        }
    
        
}

loadItems();
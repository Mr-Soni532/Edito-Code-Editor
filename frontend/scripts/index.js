let newID = document.getElementById("createNewID").addEventListener("click",fun);

async function fun(e){
    e.preventDefault();
    let res = await fetch("http://localhost:3000/generateUUID");
    let data = await res.json();
    document.getElementById("editoID").value=data.id;
}
let newID = document.getElementById("createNewID").addEventListener("click",fun);

async function fun(e){
    e.preventDefault();
    let res = await fetch("https://edito-backend.onrender.com/generateUUID");
    let data = await res.json();
    document.getElementById("editoID").value=data.id;
}
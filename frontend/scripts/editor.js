
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});



// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}




// CodeMirror Code ==========>>>>>>>>>>>>>>>>
var editorHTML = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
    mode: 'xml',
    theme: "ayu-dark",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    scrollbarStyle: 'native',
    undoDepth: 100,
    extraKeys: { "Ctrl-Space": "autocomplete" }
})


var editorCSS = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
    mode: 'css',
    theme: "ayu-dark",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    scrollbarStyle: 'native',
    undoDepth: 100,
    extraKeys: { "Ctrl-Space": "autocomplete" }
})

var editorJS = CodeMirror.fromTextArea(document.getElementById('javascriptCode'), {
    mode: 'javascript',
    theme: "ayu-dark",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    scrollbarStyle: 'native',
    undoDepth: 100,
    extraKeys: { "Ctrl-Space": "autocomplete" }
})



let htmlEditor = "";
let cssEditor = "";
let jsEditor = "";

editorHTML.on("keyup", (editor) => {
    htmlEditor = editor.doc.getValue();
    codeEmithtml(htmlEditor);
    update();
});
editorCSS.on("keyup", (editor) => {
    cssEditor = editor.doc.getValue();
    codeEmitcss(cssEditor);
    update();
});
editorJS.on("keyup", (editor) => {
    jsEditor = editor.doc.getValue();
    codeEmitjs(jsEditor);
    update();
});


function update() {
    let text = htmlEditor + "<style>" + cssEditor + "</style>" + "<scri" + "pt>" + jsEditor + "</scri" + "pt>";
    console.log(htmlEditor, cssEditor, jsEditor)
    let iframe = document.getElementById('viewer').contentWindow.document;
    iframe.open();
    iframe.write(`${text}`);
    iframe.close();
    let srcDoc;


    iframe.srcdoc = srcDoc;
}

//------------ Socket.io --------------
// const urlParams = new URLSearchParams(window.location.search);

// const username = urlParams.get("username");
// const room_id = urlParams.get("editoID");
// const socket = io("http://localhost:3000/", { transports: ["websocket"] });


// document.getElementById("currentRoom").innerText = room_id;
// document.getElementById("currentUser").innerText = username;

// console.log(username, room_id);

// socket.emit("join", { username, room_id });

// function codeEmithtml(code) {
//     socket.emit("code_change_html", { room_id, code });
// }
// function codeEmitcss(code) {
//     socket.emit("code_change_css", { room_id, code });
// }
// function codeEmitjs(code) {
//     socket.emit("code_change_js", { room_id, code });
// }

// socket.on("code_change_html", ({ code }) => {
//     console.log("html" + code);
//     editorHTML.getDoc().setValue(code);
//     htmlEditor = code;
//     update();
// });
// socket.on("code_change_css", ({ code }) => {
//     console.log("css" + code);
//     editorCSS.getDoc().setValue(code);
//     cssEditor = code;
//     update();
// });
// socket.on("code_change_js", ({ code }) => {
//     console.log("js" + code);
//     editorJS.getDoc().setValue(code);
//     jsEditor = code;
//     update();
// });

// socket.on("join", ({ username, clients }) => {
//     console.log(username);
//     console.log(clients)
//     let doc = document.getElementById("appendItems");
//     clients.forEach((el) => {
//         const newClient = document.createElement("li");
//         newClient.innerHTML = `<a href="#">
//                     <i class='bx bx-user'></i>
//                     <span class="links_name">${el.username}</span>
//                 </a>`;
//         doc.append(newClient)
//     })
//     Swal.fire({
//         position: "top-end",
//         title: `${username} has joined`,
//         showConfirmButton: false,
//         timer: 3000,
//     });
// });

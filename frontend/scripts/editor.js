import { resizerFunction } from "./resizer.js";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const roomId = urlParams.get("editoID");
const roomId_btn = document.querySelector('#roomid_section')
const saveOnClick = document.querySelector('#saveOnClick')
const HOST = 'http://localhost:3000'
// =========== Storage Variable ========
let liveFlag = localStorage.getItem('live_Flag') || true;
let htmlCode = "";
let cssCode = "";
let jsCode = "";
let editorHTML;
let editorCSS;
let editorJS;

// ===============================
resizerFunction()
// ===============================


// Side menu toggler
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#sidebar-controller");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});


// Code Execution funcitonality
let runOnClick = document.getElementById('runOnClick')
let runLive = document.getElementById('runLive')

runOnClick.addEventListener('click', () => {
    update();
    // style
})
runLive.addEventListener('click', () => {
    liveFlag = liveFlag ? false : true;
    localStorage.setItem('liveFlag', liveFlag)
    // style
    if (liveFlag) {
        runLive.classList.remove('btn-light')
        runLive.classList.add('btn-danger')
    } else {
        runLive.classList.remove('btn-danger')
        runLive.classList.add('btn-light')

    }
})

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}


// CodeMirror Code ==========>>>>>>>>>>>>>>>>

codeMirror_config();

function codeMirror_config() {
    editorHTML = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
        mode: 'xml',
        theme: "ayu-dark",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        scrollbarStyle: 'native',
        undoDepth: 100,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        autoRefresh: true
    })
    // editorHTML.refresh()

    editorCSS = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
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

    editorJS = CodeMirror.fromTextArea(document.getElementById('javascriptCode'), {
        mode: 'javascript',
        theme: "ayu-dark",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        scrollbarStyle: 'native',
        undoDepth: 100,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        lint: true,
        gutters: ["CodeMirror-lint-markers"],
        hintOptions: {
            completeSingle: true
        }
    })

    editorHTML.on("keyup", (editor) => {
        htmlCode = editor.doc.getValue();
        emitHtmlCode(htmlCode);
        if (liveFlag) update();
    });
    editorCSS.on("keyup", (editor) => {
        cssCode = editor.doc.getValue();
        emitCssCode(cssCode);
        if (liveFlag) update();
    });
    editorJS.on("keyup", (editor) => {
        jsCode = editor.doc.getValue();
        emitJsCode(jsCode);
        if (liveFlag) update();
    });
}



function update() {
    let text = htmlCode + "<style>" + cssCode + "</style>" + "<script>" + jsCode + "<\/script>";
    // console.log(htmlCode, cssCode, jsCode)
    let iframe = document.getElementById('viewer').contentWindow.document;
    iframe.open();
    iframe.write(`${text}`);
    iframe.close();
    let srcDoc;
    iframe.srcdoc = srcDoc;
}
function setLocalValue() {
    editorHTML.getDoc().setValue(htmlCode);
    editorCSS.getDoc().setValue(cssCode);
    editorJS.getDoc().setValue(jsCode);
}

//------------ Socket.io --------------

const socket = io("http://localhost:3000/", { transports: ["websocket"] });

// document.getElementById("currentRoom").innerText = roomId;
// document.getElementById("currentUser").innerText = username;


// console.log(username, roomId);

socket.emit("joinRoom", { username, roomId });

socket.on('wlcm-message', (val) => console.log(val))

// run on every new connection
socket.on('renderCurrentCode', async () => {
    let res = await fetch(`${HOST}/fetchCode/${roomId}`)
    let { roomCode } = await res.json();
    editorHTML.getDoc().setValue(roomCode.htmlCode)
    editorCSS.getDoc().setValue(roomCode.cssCode)
    editorJS.getDoc().setValue(roomCode.jsCode)
    htmlCode = roomCode.htmlCode;
    cssCode = roomCode.cssCode;
    jsCode = roomCode.jsCode;
    update()
})

socket.on('newUserAlert', (username) => {
    document.querySelector('#liveToast').classList.add('show')
    document.querySelector('#toast-msg').innerText = `${username} has joined this workspace.`
    setTimeout(() => {
        document.querySelector('#liveToast').classList.remove('show')
    }, 2000);
})


function emitHtmlCode(code) {
    socket.emit("code_change_html", { roomId, code });
}
function emitCssCode(code) {
    socket.emit("code_change_css", { roomId, code });
}
function emitJsCode(code) {
    socket.emit("code_change_js", { roomId, code });
}

socket.on("code_change_html", ({ code }) => {

    editorHTML.getDoc().setValue(code);
    htmlCode = code;
    update();
});
socket.on("code_change_css", ({ code }) => {
    console.log("css" + code);
    editorCSS.getDoc().setValue(code);
    cssCode = code;
    update();
});
socket.on("code_change_js", ({ code }) => {
    console.log("js" + code);
    editorJS.getDoc().setValue(code);
    jsCode = code;
    update();
});

socket.on("roomUsers", ({ users }) => {

    let doc = document.getElementById("appendItems");
    document.getElementById("userCount").innerText = users.length
    doc.innerHTML = "";
    users.forEach((el) => {
        const newClient = document.createElement("li");
        newClient.innerHTML = `<a href="#">
        <i class="fa-regular fa-user"></i>
                    <span class="links_name">${el.username}</span>
                </a>`;
        doc.append(newClient)
    })

});


//============> Toast activity
roomId_btn.addEventListener('click', () => {
    navigator.clipboard.writeText(roomId)
    document.querySelector('#liveToast').classList.add('show')
    document.querySelector('#toast-msg').innerText = 'Room Id copied in clipboard!'
    setTimeout(() => {
        document.querySelector('#liveToast').classList.remove('show')
    }, 2000);
})

//============> Save Code Handler
saveOnClick.addEventListener('click', async () => {
    document.querySelector(`#saveOnClick>i`).style.display = 'none';
    document.querySelector(`#saveOnClick>span`).style.display = 'inline-block';
    let res = await fetch(`${HOST}/saveCode`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId, htmlCode, cssCode, jsCode
        })
    }).finally(()=>{
        document.querySelector(`#saveOnClick>i`).style.display = 'inline-block';
        document.querySelector(`#saveOnClick>span`).style.display = 'none';
    })
})




export { codeMirror_config, setLocalValue }
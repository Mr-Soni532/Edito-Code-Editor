import { resizerFunction } from "./resizer.js";

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const roomId = urlParams.get("editoID");
// const HOST = 'http://localhost:3000'
const HOST = 'https://edito-backend.onrender.com'
let THEME_STYLE = localStorage.getItem('theme')||'ayu-dark'
//===> Socket setup
const socket = io(`${HOST}/`, { transports: ["websocket"] });

// =========== Variable Declaration ========
const roomId_btn = document.querySelector('#roomid_section')
const saveOnClick = document.querySelector('#saveOnClick')
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#sidebar-controller");
let runOnClick = document.getElementById('runOnClick')
let runLive = document.getElementById('runLive')
let autoSaveOnClick = document.getElementById('autoSaveOnClick')

// =========== Active Flags ========
let liveFlag = JSON.parse(localStorage.getItem('live_Flag') || true);
let autoSaveFlag = JSON.parse(localStorage.getItem('autoSaveFlag')) || false;
// =========== Storage Variable ========
let htmlCode = "";
let cssCode = "";
let jsCode = "";
let editorHTML;
let editorCSS;
let editorJS;



// =========>>>>>>>>>> Inital Calls
codeMirror_config();
addThemeLinkToHead(THEME_STYLE)
resizerFunction()

//!=====================> Event Listeners

// ====================>  Theme handler
setTimeout(() => {
    let allThemes = document.querySelectorAll('.themeDropDownItem');
    allThemes.forEach(item => {
        item.addEventListener('click', () => {
            //Adding theme link in head
            addThemeLinkToHead(item.innerText)

            // Change theme 
            THEME_STYLE = item.innerText;
            localStorage.setItem('theme', THEME_STYLE)
            codeMirror_config();
            setLocalValue()
        })
    })
}, 500);



//===> Side menu toggler
closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

//===> Code execute on click run
runOnClick.addEventListener('click', update)

//===> Save On Click
saveOnClick.addEventListener('click', saveCode)

//===> Live code execution with live active
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

//===> Auto Save flag toggler
autoSaveOnClick.addEventListener('click', () => {
    autoSaveFlag = autoSaveFlag ? false : true;

    localStorage.setItem('autoSaveFlag', autoSaveFlag)
    //=> style
    autoSaveBtnStatus()

    //=> Emit autoSave Event
    socket.emit('autoSave', { roomId, autoSaveFlag })
})

//============> Toast activity
roomId_btn.addEventListener('click', () => {
    navigator.clipboard.writeText(roomId)
    document.querySelector('#liveToast').classList.add('show')
    document.querySelector('#toast-msg').innerText = 'Room Id copied in clipboard!'
    setTimeout(() => {
        document.querySelector('#liveToast').classList.remove('show')
    }, 2000);
})

//!=========>>>>>>>> CodeMirror Configuration
function codeMirror_config() {
    editorHTML = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
        mode: 'xml',
        theme: THEME_STYLE,
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        scrollbarStyle: 'native',
        undoDepth: 100,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        autoRefresh: true
    })

    editorCSS = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
        mode: 'css',
        theme: THEME_STYLE,
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
        theme: THEME_STYLE,
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
        if (autoSaveFlag) codeChange()
    });
    editorCSS.on("keyup", (editor) => {
        cssCode = editor.doc.getValue();
        emitCssCode(cssCode);
        if (liveFlag) update();
        if (autoSaveFlag) codeChange()
    });
    editorJS.on("keyup", (editor) => {
        jsCode = editor.doc.getValue();
        emitJsCode(jsCode);
        if (liveFlag) update();
        if (autoSaveFlag) codeChange()
    });
}


//! =============>>>>>>>> Utility Functions
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

function autoSaveBtnStatus() {
    if (autoSaveFlag) {
        document.querySelector(`#autoSaveOnClick>i`).style.display = 'none';
        document.querySelector(`#autoSaveOnClick>span`).style.display = 'inline-block';
    } else {
        document.querySelector(`#autoSaveOnClick>i`).style.display = 'inline-block';
        document.querySelector(`#autoSaveOnClick>span`).style.display = 'none';
    }
}

function emitHtmlCode(code) {
    socket.emit("code_change_html", { roomId, code });
}

function emitCssCode(code) {
    socket.emit("code_change_css", { roomId, code });
}

function emitJsCode(code) {
    socket.emit("code_change_js", { roomId, code });
}

//==> Add Theme link to head
function addThemeLinkToHead(theme){
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = `./codemirror/theme/${theme}.css`;
    document.head.appendChild(link)
}

//============> Save Code Handler
async function saveCode() {
    document.querySelector(`#saveOnClick>i`).style.display = 'none';
    document.querySelector(`#saveOnClick>span`).style.display = 'inline-block';
    let res = await fetch(`${HOST}/saveCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId, htmlCode, cssCode, jsCode
        })
    }).finally(() => {
        document.querySelector(`#saveOnClick>i`).style.display = 'inline-block';
        document.querySelector(`#saveOnClick>span`).style.display = 'none';
    })
}

// ===============>>>>> Debounce Auto Saving
function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
function saveInput() {
    saveCode()
}
const codeChange = debounce((e) => saveInput(e));
// ===========================<<<<<


//!================>>>>>>>>> Socket Emiters

socket.emit("joinRoom", { username, roomId });


//!================>>>>>>>>> Socket Listeners

//===> Welcome Listner
socket.on('wlcm-message', (val) => console.log(val))

//===> Execute on new Connection or Reconnection
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

//===> New Connection BroadCast Alert
socket.on('newUserAlert', (username) => {
    document.querySelector('#liveToast').classList.add('show')
    document.querySelector('#toast-msg').innerText = `${username} has joined this workspace.`
    setTimeout(() => {
        document.querySelector('#liveToast').classList.remove('show')
    }, 2000);
})

//===> Code Change Listner for HTML
socket.on("code_change_html", ({ code }) => {
    editorHTML.getDoc().setValue(code);
    htmlCode = code;
    update();
});

//===> Code Change Listner for CSS
socket.on("code_change_css", ({ code }) => {
    editorCSS.getDoc().setValue(code);
    cssCode = code;
    update();
});

//===> Code Change Listner for JavaScript
socket.on("code_change_js", ({ code }) => {
    editorJS.getDoc().setValue(code);
    jsCode = code;
    update();
});

//==============> Update Current Room Users
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

//==============> Auto Save 
socket.on('autoSave', (val) => {
    autoSaveFlag = val.autoSaveFlag;
    localStorage.setItem('autoSaveFlag', autoSaveFlag)
    autoSaveBtnStatus()
})










export { codeMirror_config, setLocalValue, update }
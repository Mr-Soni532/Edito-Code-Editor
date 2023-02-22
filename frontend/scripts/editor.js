import codemirror from "codemirror";
import 'codemirror/mode/javascript/javascript';
import {EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"
let codeArea = document.getElementById("realtimeEditor");

async function init(){
    codemirror.fromTextArea(codeArea,{
        mode:{name:'javascript',json:true}
    })
}

init();
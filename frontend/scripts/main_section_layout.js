import { codeMirror_config, setLocalValue } from "./editor.js";
import { layout_1, layout_2, layout_3 } from "./layout.js";
import { resizerFunction, resizerFunction_layout_3 } from "./resizer.js";

let main_section = document.getElementById('main_section');
let nav_layout_1 = document.getElementById('nav_layout-1');
let nav_layout_2 = document.getElementById('nav_layout-2');
let nav_layout_3 = document.getElementById('nav_layout-3');

// console.log(head)
nav_layout_1.addEventListener('click', () => {
    main_section.innerHTML = layout_1;
    codeMirror_config();
    setLocalValue()
    resizerFunction()
})
nav_layout_2.addEventListener('click', () => {
    main_section.innerHTML = layout_2
    codeMirror_config()
    codeMirror_config();
    setLocalValue()
    resizerFunction()
    
})
nav_layout_3.addEventListener('click', () => {
    main_section.innerHTML = layout_3
    codeMirror_config()
    codeMirror_config();
    setLocalValue()
    resizerFunction_layout_3()
})


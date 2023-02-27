export const layout_1 = `
<div class="resizable-x" style="flex-direction: row-reverse;">
    <div class="output_iframe_section" style="flex: 50%;">
        <iframe id="viewer"></iframe>
    </div>
    <div class="resizer-x"></div>
    <div class="resizable-y" style="flex: 50%;">
        <div class="html_editor" style="height: 33.33%;min-height: 50px;">
            <div class="resizer-y html">HTML</div>
            <textarea id="htmlCode" placeholder="Type HTML code here"></textarea>
        </div>
        <div class="css_editor" style="height: 33.33%;min-height: 50px;">
            <div class="resizer-y resizer-y-1 css">CSS</div>
            <textarea id="cssCode" placeholder="Type CSS code here"></textarea>
        </div>
        <div class="js_editor" style="height: 33.33%;min-height: 50px;">
            <div class="resizer-y resizer-y-2 js">JS</div>
            <textarea id="javascriptCode" placeholder="Type JavaScript code here"></textarea>
        </div>
    </div>
</div>
`
export const layout_2 = `
        <div class="resizable-x">
            <div class="output_iframe_section" style="flex: 50%;">
                <iframe id="viewer"></iframe>
            </div>
            <div class="resizer-x"></div>
            <div class="resizable-y" style="flex: 50%;">
                <div class="html_editor" style="height: 33.33%;min-height: 50px;">
                    <div class="resizer-y html">HTML</div>
                    <textarea id="htmlCode" placeholder="Type HTML code here"></textarea>
                </div>
                <div class="css_editor" style="height: 33.33%;min-height: 50px;">
                    <div class="resizer-y resizer-y-1 css">CSS</div>
                    <textarea id="cssCode" placeholder="Type CSS code here"></textarea>
                </div>
                <div class="js_editor" style="height: 33.33%;min-height: 50px;">
                    <div class="resizer-y resizer-y-2 js">JS</div>
                    <textarea id="javascriptCode" placeholder="Type JavaScript code here"></textarea>
                </div>
            </div>
        </div>
`
export const layout_3 = `
<div class="resizable-y l-3">
            <div class="output_iframe_section l-3" style="flex: 50%;">
                <iframe id="viewer"></iframe>
            </div>
            <div class="resizer-y l-3"></div>
            <div class="resizable-x l-3" style="flex: 50%; flex-direction: row;">
                <div class="html_editor editor_l-3" style="height: 100%;min-height: 50px;width: 33.33%;">
                    <div>
                        <div class="resizer-x l-3 html">HTML</div>
                        <textarea id="htmlCode" placeholder="Type HTML code here"></textarea>
                    </div>
                    <span></span>
                </div>
                <div class="css_editor editor_l-3" style="height: 100%;min-height: 50px;width: 33.33%;">
                    <div>
                        <div class="resizer-x l-3 resizer-y_l-3_1 css ">CSS</div>
                        <textarea id="cssCode" placeholder="Type CSS code here"></textarea>
                    </div>
                    <span></span>
                </div>
                <div class="js_editor editor_l-3" style="height: 100%;min-height: 50px;width: 33.33%;">
                    <div style="width: 100%;">
                        <div class="resizer-x l-3 resizer-y_l-3_2 js">JS</div>
                        <textarea id="javascriptCode" placeholder="Type JavaScript code here"></textarea>
                    </div>
                </div>
            </div>
        </div>
`


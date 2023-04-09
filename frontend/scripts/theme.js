const themeDropDown = document.querySelector('#themeDropDownMenu')

function fetchAllTheme() {
    fetch('./codemirror/theme')
        .then(response => response.text())
        .then(text => {

            //  regular expressions to extract the path of the CSS files
            const cssFilesPaths = text.match(/href="([^"]+\.css)"/g)
                .map(match => match.slice(6, -1));

            //  regular expressions to extract the name of the CSS files
            let regex = '(?<=theme\/)[^\/]+(?=\.css)'
            const cssFiles = cssFilesPaths.map(path => {
                let res = path.match(regex)
                return res[0]
            })
            injectThemeInDropDown(cssFiles); // Array of CSS file names
        })
}
fetchAllTheme()


function injectThemeInDropDown(themes) {
    themeDropDown.innerHTML = "";
    let DropDownThemes = themes.map((theme) => {
        return `<li><a class="dropdown-item themeDropDownItem">${theme}</a></li>`
    }).join("")
    themeDropDown.innerHTML = DropDownThemes
}




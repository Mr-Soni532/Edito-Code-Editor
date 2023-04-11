const themeDropDown = document.querySelector('#themeDropDownMenu')
import data from '../util/themeData.js'

function fetchAllTheme() {
            const cssFiles = data.map(fileName => {
              return  fileName.replace('.css',"")   
            })
            injectThemeInDropDown(cssFiles)
}
fetchAllTheme()


function injectThemeInDropDown(themes) {
    themeDropDown.innerHTML = "";
    let DropDownThemes = themes.map((theme) => {
        return `<li><a class="dropdown-item themeDropDownItem">${theme}</a></li>`
    }).join("")
    themeDropDown.innerHTML = DropDownThemes
}




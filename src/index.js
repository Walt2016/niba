// import  "./sample/shape"

// import double from "./sample/double"
// import './sample/roundrect'
// import './sample/text'
// import "./sample/svg"
// import './route'
let hash = location.hash

switch (hash) {
    case "svg":
        require("./sample/svg")
        break;
    case "canvas":
        require("./sample/canvas")
        break;
    default:
        require("./sample/svg")
}

// import "./sample/canvas"

import Colors from './colors'
let c = new Colors()
console.log(c)
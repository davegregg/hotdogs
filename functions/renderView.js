const fs = require("fs")
const initView = require("./MainView")
const {GOOGLE_MAP_KEY} = process.env

module.exports = function renderView (coords, path = "../index1.html") {
    const mapOptions = new URLSearchParams({
        key: GOOGLE_MAP_KEY,
        q: coords,
    })
    const view = initView({ mapOptions })

    fs.writeFileSync(path, view, { encoding: "utf8" })
}

module.exports = {

    html (strings, ...values) {
        const { flatZip } = require("flat-zip")
        return flatZip([strings, values]).join("")
    },

    html2 (templateSubstrings, ...entries) {
        const callIfFunction = functionOrOther => (functionOrOther.constructor === Function)
            ? functionOrOther()
            : functionOrOther
    
        const interleave = (string, index) => (index in entries)
            ? [string, callIfFunction(entries[index])]
            : [string]
    
        return templateSubstrings.flatMap(interleave).join("")
    }
}

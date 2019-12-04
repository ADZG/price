var fs = require("fs")
fs.readFile("../xx/index.html", function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data.toString())
    }
})

// fs.writeFile("../xx/index.html", "继续挣扎", function (err, data) {
//     if (err) {
//         console.log("失败")
//     } else {
//         console.log(data)
//     }
// })
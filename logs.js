const fs = require("fs")

const Logger = (exports.Logger = {})

const infoStream = fs.createWriteStream("logs/info.txt")
const errorStream = fs.createWriteStream("logs/error.txt")
const debugStream = fs.createWriteStream("logs/debug.txt")

Logger.info = function(msg) {
    const message = new Date().toISOString() + ": " + msg + "\n"
    infoStream.write(message)
}

Logger.debug = function(msg) {
    const message = new Date().toISOString() + ": " + msg + "\n"
    debugStream.write(message)
}

Logger.error = function(msg) {
    const message = new Date().toISOString() + ": " + msg + "\n"
    errorStream.write(message)
}
let reload = document.getElementById('reload')
reload.addEventListener("click", reloadFunc)

const logs = document.getElementsByClassName('logs')
logs[0].scrollTop = logs[0].scrollHeight

function reloadFunc() {
    window.location.reload()
}
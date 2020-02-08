const { remote } = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({name: 'Settings'})
const $ = (selector) => {
  const result = document.querySelectorAll(selector)
  return result.length > 1 ? result : result[0]
}
document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation')
  if (savedLocation) {
    $('#savedFileLocation').value = savedLocation
  }
  $('#select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件存储路径',
    }, (path) => {
      if (Array.isArray(path)) {
        $('#savedFileLocation').value = path[0]
        savedLocation = path[0]
      }
    })
  })
  $('#settings-form').addEventListener('submit', () => {
    settingsStore.set('savedFileLocation', savedLocation)
    remote.getCurrentWindow().close()
  })
  $('.nav-tabs').addEventListener('click', (e) => {
    e.preventDefault();
    $('.nav-link').forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    $('.config-area').forEach(element => {
      element.style.display = 'none'
    })
    $(e.target.dataset.tab).style.display = 'block'
  })
})
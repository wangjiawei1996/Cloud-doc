const { remote } = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({name: 'Settings'})
const $ = (id) => {
  return document.getElementById(id)
}
document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation')
  if (savedLocation) {
    $('savedFileLocation').value = savedLocation
  }
  $('select-new-location').addEventListener('click', () => {
    remote.dialog.showOpenDialog({
      properties: ['openDirectory'],
      message: '选择文件存储路径',
    }, (path) => {
      if (Array.isArray(path)) {
        $('savedFileLocation').value = path[0]
        savedLocation = path[0]
      }
    })
  })
  $('settings-form').addEventListener('submit', () => {
    settingsStore.set('savedFileLocation', savedLocation)
    remote.getCurrentWindow().close()
  })
})
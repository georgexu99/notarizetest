// The ipcMain and ipcRenderer modules allow communication between the main
// process and the renderer processes.
//
// For more info, see:
// https://electronjs.org/docs/api/ipc-main
// https://electronjs.org/docs/api/ipc-renderer
const { setTimeout } = require('timers/promises');
const { app, BrowserWindow, ipcMain, systemPreferences } = require('electron/main')
const { utilityProcess } = require('electron')
const path = require('node:path')

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
/*
change the timeout to 45 seconds
call getMediaAccess('screen') and expect FALSE
setTimeout(45)
in those 45 seconds, we add the prefs from the apple settings menu. This should grant perms even if the UI doesn't visually reflect the changes (tested this just now)
call getMediaAccess('screen')via main process, expect FALSE
call etMediaAccess('screen')via child process, expect TRUE
*/

  const screenStatus = systemPreferences.getMediaAccessStatus('screen');
    const micStatus = systemPreferences.getMediaAccessStatus('microphone');
      const camStatus = systemPreferences.getMediaAccessStatus('camera');
  const status = {
    screenStatus,
    micStatus,
    camStatus
  }

  console.log('MAIN PROCESS CALL #1. Current Value: ', status )

  console.log('awaiting for 30 seconds. Change app perms now.')
  await setTimeout(30000);
  console.log('done awaiting.')
  console.log('Main process should not be updated.');


  console.log('done awaiting. Utility process should update accordingly')
  const child = utilityProcess.fork(path.join(__dirname, 'test.js'))
  child.postMessage({ message: 'hello' })
  child.on('message', (data) => {
    console.log(data) // status!
  })

  child.kill();
  console.log('Main process should not be updated.');
    const screenStatus2 = systemPreferences.getMediaAccessStatus('screen');
    const micStatus2 = systemPreferences.getMediaAccessStatus('microphone');
      const camStatus2 = systemPreferences.getMediaAccessStatus('camera');
  const status2 = {
    screenStatus2,
    micStatus2,
    camStatus2
  }
  console.log("MAIN PROCESS CAll 3. Still should not be updated", status2);

  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
  })

  ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
  })

  ipcMain.handle('invoke-handle-message', (event, arg) => {
    console.log(arg)
    return 'pong'
  })

  mainWindow.loadFile('index.html')
})

const { systemPreferences } = require('electron')
console.log("hello from utility")

const screenStatus = systemPreferences.getMediaAccessStatus('screen');
const micStatus = systemPreferences.getMediaAccessStatus('microphone');
const camStatus = systemPreferences.getMediaAccessStatus('camera');
  const status = {
    screenStatus,
    micStatus,
    camStatus
  }
const utilityStatus = 'Utility Process Call: ' + 'cam: ' + status.camStatus + 'mic: ' + status.micStatus + 'screen:' + status.screenStatus;
process.parentPort.on('message', () => {
    process.parentPort.postMessage(utilityStatus)
})

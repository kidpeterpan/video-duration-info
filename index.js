const electron  = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app , BrowserWindow, ipcMain } = electron;
let mainWindow;

app.on('ready',()=>{
    console.log('App is now ready');
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    }); // main window
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit',(event, path) => {
    ffmpeg.ffprobe(path,(err, metadata)=>{ // add callback
        console.log('Video duration is: ' ,metadata.format.duration);
        mainWindow.webContents.send(
            'video:metadata', 
                metadata.format.duration
            );
    });
});
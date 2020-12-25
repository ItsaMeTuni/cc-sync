const chokidar = require('chokidar')
const WebSocket = require('ws')
const fs = require('fs')

const wss = new WebSocket.Server({ port: 5544 });

wss.on('connection', (ws) =>
{
    console.log('connected')

    function onFileChange(path)
    {
        const data = fs.readFileSync(path)
        const str = data.toString()

        const fileName = path
            .replace(process.cwd(), "")
            .replace('\\', '/')

        ws.send(`!!@@__${fileName}__@@!!\n${str}`)
    }

    chokidar.watch(process.cwd())
        .on('add', onFileChange)
        .on('change', onFileChange)
});

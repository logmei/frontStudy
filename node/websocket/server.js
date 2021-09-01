var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        console.log('message',message);
    });
    const param = {payload:{
      deviceSerial:'G00287022',equipmentId:'2',id:'871',locationId:'1',
      locationName:'大门A',streamToken:'at.2hnuke9bbkd6o3wt37om85am96g5fbof-9nyicekco7-0idzh3i-zlbkrsdkc',warningStatus:'INIT'},type:'WARNING',userId:3}
    ws.send(JSON.stringify({type: 'REGISTER', userId: 3}))
    // setInterval(()=>{
    //   ws.send(JSON.stringify(param))
    // },10000)
});
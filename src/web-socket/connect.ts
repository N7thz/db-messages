// import * as BlipSdk from 'blip-sdk';
// import WebSocketTransport from 'lime-transport-websocket'

// const IDENTIFIER = process.env.BLIP_IDENTIFIER || "";
// const ACCESS_KEY = process.env.BLIP_ACCESS_KEY || "";

// // Create a client instance passing the identifier and access key of your chatbot
// let client = new BlipSdk.ClientBuilder()
//     .withIdentifier(IDENTIFIER)
//     .withAccessKey(ACCESS_KEY)
//     .withTransportFactory(() => new WebSocketTransport())
//     .build();

// client.connect() // This method returns a 'promise'
//     .then((session) => {
//             console.log('Connected with session id: ' + session.id);
//         })
//     .catch((err) => { 
//         console.log('Error connecting: ' + err);
//      });

// client.close()
//     .then((session) => {
//             console.log('Desconnect with session id: ' + session.id);
//         })
//     .catch((err) => { 
//         console.log('Error connecting: ' + err);
//      });
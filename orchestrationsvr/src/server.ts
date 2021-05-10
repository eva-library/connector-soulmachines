import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as WebSocket from 'ws';
import app from './app';
import config from './config';
import bodyParser = require('body-parser');
import { response } from 'express';
import { options } from '../src/config/configEva';
const request = require('request');
//eva
var httpServer = null;

if (config.production == false) {
    //Local host development, use HTTPS
    var privateKey = fs.readFileSync(process.env.SSL_KEY, 'utf8');
    var certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    httpServer = https.createServer(credentials, app);
}
else {
    //Create HTTP only equivalents in a GCP deploy
    httpServer = http.createServer(app);
}

const wsServer = new WebSocket.Server({ server: httpServer });

httpServer.listen(config.express.port, () => {
    console.log(`Express http server listening on port ${config.express.port}`);
});

wsServer.on('connection', async (ws: WebSocket) => {
    var welcomeHasBeenSpoken = false;

    //connection is up, let's add a simple simple event
    ws.on('message', async (message: string) => {
        var messageObject = JSON.parse(message);
        //Uncomment this line to see all messages from the persona server.
        //console.log(message);
        //Speak a welcome once connected
        if (messageObject?.name == "state" && messageObject?.kind == "event" && messageObject?.body?.session?.state === "connected" && welcomeHasBeenSpoken === false) {
            var speakThisWelcome = "Hola, Este es un saludo de bienvenida";
            var welcomeVariables = {};
            setTimeout(function () {
                welcomeHasBeenSpoken = true;
                ws.send(JSON.stringify(fnGetSpeechResponse(speakThisWelcome, welcomeVariables)));
            }, 2000);
        }

        //Handle spoken or written text queries
        if (messageObject?.kind == "event" && messageObject?.name == "conversationRequest") {
            //Send textQuery to your NLP
            var textQuery = messageObject?.body?.input?.text?.toLowerCase();

            var spokenReturn = textQuery;
            // console.log(textQuery);
            console.log(options)
            var newText;
            var updateOption = addJsonBody(options, textQuery);
            var variables = {};

            request(updateOption, function (error, response) {
                if (error) throw new Error(error);

                //console.log(JSON.parse(response.body));

                newText = JSON.parse(response.body);

                //Mostramos el contenido de la primera respuesta
                //console.log(newText.answers[0].content);

                var arrayLength = (newText.answers).length;
                if (arrayLength > 1) {
                    for(var i = 0; i <arrayLength; i++){
                        sendResponse(spokenReturn, newText.answers[i].content, variables, ws);
                    }
                } else {
                    sendResponse(spokenReturn, newText.answers[0].content, variables, ws);
                }
            });

        }
    });
});

function sendResponse(spokenReturn : string, content : string, variables : object , ws : WebSocket) : void {
    spokenReturn = content;
    console.log(content);
    //Optionally, set some custom variables which you may use in your frontend for supplementary data from the NLP or other sources            
    variables["public-simonsays"] = "first query";
    ws.send(JSON.stringify(fnGetSpeechResponse(spokenReturn, variables)));
}

function addJsonBody(option: object, textQuery: string) : object{
    var addedBody;
    addedBody = option;
    addedBody.body = '{"text" : " ' + textQuery + ' "}';
    //console.log(addedBody)
    return addedBody;
}

function fnGetSpeechResponse(speakThis, variables) {
    const conversationResponse = {
        "category": "scene",
        "kind": "request",
        "name": "conversationResponse",
        "transaction": null,
        "body": {
            "personaId": 1,
            "output": {
                "text": speakThis
            },
            "variables": variables
        }
    };
    return conversationResponse;
}
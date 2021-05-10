 JWT_PUBLIC_KEY: Set this according to the 'Config Config' - 'Key Name' from DDNAS for your Digital Person
 JWT_PRIVATE_KEY: Set this according to the 'Config Config' - 'Private Key' from DDNAS for your Digital Person
 ORCHESTRATION_SERVER: Set to the hostname and port for the address of the orchestration server you wish to connect to 
    i.e. localhost:5566 or myremoteorchestrationserver.com
 UI_SERVER: Set to the hostname and port for the address of the react UI server you wish to allow connetions to this token server from
    i.e. localhost:8000 or myremoteuiserver.com
SSL_CERT: The relative path to the .crt file for localhost SSL
SSL_KEY: The relative path to the .key file for localhost SSL
EXPRESS_PORT: The port number for the token server when performing localhost development.
    Note if this is changed, your React template .ENV needs to be updated also
EXPRESS_SERVER: The IP address to bind the token server to when performing localhost development.
PRODUCTION_PERSONA: Leave as false unless you are doing a final production remote deployment
CONTROL_VIA_BROWSER: Leave as true unless you are doing a remote deployment where it should be set to true
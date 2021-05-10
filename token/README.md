# Express Token Server
This Express application provides an endpoint where a front-end application may request a JWT token for use with a Soul Machines websocket connection. 
One token server should be deployed for each environment.

# Local Development
You will need to set environment variables for each environment where the Token Server is deployed. These variables determine how the JWT tokens are signed, and which domains have permission to request tokens.

 1. Edit the .env file and set the variables as per README_env.md
 2. Generate local ssl certificates as per README_ssl.md
 3. Ensure NodeJs latest is installed on the system
 4. Run `npm install` from the project root to install project dependencies
 5. To run the dev server, run the `npm run dev` command 
 6. Navigate to https://localhost:5577/ping in Google Chrome. 
  - You will be prompted to proceed to an unsafe site, select Yes / Proceed to trust the self-signed cert fromstep 2
  - Chrome forgets this every couple of weeks and this step must be periodically performed. If you have issues connecting to the token server via the UI, repeat this step.
7. Verify the server is serving up a token by opening https://localhost:5577/auth/authorize in your browser

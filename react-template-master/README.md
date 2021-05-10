# Soul Machines React Template
This React app can be used as a starting point for building your own Digital Person UI.

The app demonstrates how to connect to a Digital Person, speak with them, chat with them by typing, and receive visual content cards from your conversation provider.

# Requirements
- Soul Machines JWT Token Server (express-token-server) is configured and running
- Webpack
- NPM

# Local Development
 1. Edit the .env file and set the variables as per README_env.md
 2. Run `npm install` from the project root to install project dependencies
 3. To run the dev server, run the `npm run dev` command 
 4. Ensure your orchestration server is running
 5. Navigate to https://localhost:8000 to view the application 
    - if you are prompted to trust certificates you must select yes / proceed.

# Production builds
You can build a production version of the UI by running;
`npm run prod`

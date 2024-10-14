# The Ideal Enigma

This Slack app is designed to help teams capture and share insights. Built with `@slack/bolt` in TypeScript, the app integrates with Slack's API to handle user and team management, deliver scheduled reminders, and generate weekly insights reports based on employee submissions. We've leveraged OpenAI’s API to create detailed summaries, helping teams align their efforts with company objectives. Deployed on Heroku and using TypeORM for database management, this app is scalable and easy to maintain.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Slack Setup](#slack-setup)
5. [Running the Application](#running-the-application)
6. [Tunneling with ngrok](#tunneling-with-ngrok)
7. [Running Tests](#running-tests)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: This project uses npm (Node Package Manager). npm comes bundled with Node.js.
- **Slack Developer Program**: You need to sign up for the Slack Developer Program and create a Slack app. Details are provided in the [Slack Setup](#slack-setup) section.
- **ngrok**: You'll need ngrok installed to tunnel your local environment to the web. You can download it from [ngrok.com](https://ngrok.com/).

Check the installed versions on node by running:

```bash
node -v
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/logankimbs/ideal-enigma.git
   cd ideal-enigma
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables**:

   Create a `.env` file in the root directory of the project, and add the necessary environment variables. A sample `.env.sample` file is provided for reference:

   ```bash
   cp .env.sample .env
   ```

   The `.env` file will include variables that you will get from the Slack app setup. Make sure you follow the steps in the [Slack Setup](#slack-setup) section.

2. **Database Setup**:

   ...

## Slack Setup

To set up the Slack integration, follow these steps:

1. **Sign up for the Slack Developer Program**:

   Visit the [Slack API](https://api.slack.com/) website and sign up for the Slack Developer Program if you haven't already.

2. **Create a Slack App**:

   - Go to the [Your Apps](https://api.slack.com/apps) page on Slack and click "Create New App."
   - Choose "From an App Manifest."
   - Use the provided app manifest file as a reference.

3. **Get the necessary environment variables**:

   After creating the Slack app, you will need to get certain credentials and add them to your `.env` file:

   - `SLACK_SIGNING_SECRET`
   - `SLACK_CLIENT_ID`
   - `SLACK_CLIENT_SECRET`
   - `SLACK_APP_TOKEN`
   - `SLACK_BOT_TOKEN`

   You can find these values under the "OAuth & Permissions" and "Basic Information" sections of your Slack app settings.

4. **Update the `.env` file**:

   Open the `.env` file and update it with the values from your Slack app:

   ```bash
   SLACK_SIGNING_SECRET="YOUR_SLACK_SIGNING_SECRET"
   SLACK_CLIENT_ID="YOUR_SLACK_CLIENT_ID"
   SLACK_CLIENT_SECRET="YOUR_SLACK_CLIENT_SECRET"
   SLACK_APP_TOKEN="YOUR_SLACK_APP_TOKEN"
   SLACK_BOT_TOKEN="YOUR_SLACK_BOT_TOKEN"
   ```

## Running the Application

To start the application in development mode, use:

```bash
npm run start:dev:slack
```

## Tunneling with ngrok

After starting the application, you'll need to expose your local server to the internet so that Slack can send requests to your local environment. This can be done using ngrok.

1. **Open a new terminal window**.

2. **Start ngrok**:

   Run the following command to start an HTTP tunnel to your local server.

   ```bash
   ngrok http 8080
   ```

3. **Copy the ngrok URL**:

   Once ngrok is running, it will display a forwarding URL (e.g., `https://<random-id>.ngrok.io`). This is the public URL that Slack will use to communicate with your local server.

4. **Update your Slack app settings**:

   Go back to your Slack app settings and update any URLs that require public access with the ngrok URL. For example, under "Event Subscriptions", "OAuth & Permissions", and "Interactivity & Shortcuts" replace `http://localhost:3000` with your ngrok URL.

   Example:

   ```bash
   https://<random-id>.ngrok.io/slack/events
   ```

## Running Tests

To run tests, use:

```bash
npm test
```

# Rock Paper Scissors Alexa Skill

This project implements an Alexa skill for the classic game Rock Paper Scissors. It allows users to play against Alexa, tracking wins, losses, and ties, and provides a simple conversational interface for gameplay on Amazon Echo devices.

## Architecture

The skill follows a standard Alexa skill architecture built upon a custom base class. The core logic is structured around handling various Alexa request types (Launch, Intent, Session Ended) and mapping specific user intents to corresponding functions.

1.  **`AlexaSkill.js`**: Serves as a foundational, reusable class for building Alexa skills. It defines the basic request handlers and response builders, abstracting common boilerplate for interacting with the Alexa service.
2.  **`index.js`**: Extends the `AlexaSkill` class and contains the application-specific logic for the Rock Paper Scissors game. This includes game state management, intent handling for user choices (rock, paper, scissors), game statistics, and responses.
3.  **`speechAssets/`**: Contains the necessary configuration files (`IntentSchema.json` and `SampleUtterances.txt`) that define the skill's interaction model for Alexa's Natural Language Understanding (NLU) service.
4.  **AWS Lambda**: The `index.js` `exports.handler` function is the entry point for an AWS Lambda function, which is invoked by the Alexa service upon user interaction.

## Key files

*   **`src/AlexaSkill.js`**: This file provides a base JavaScript class (`AlexaSkill`) designed to simplify the development of Alexa skills. It includes methods for handling `LaunchRequest`, `IntentRequest`, and `SessionEndedRequest` from Alexa, as well as utility functions for constructing speech and card responses (`tell`, `ask`, `tellWithCard`, `askWithCard`). It acts as a framework for managing the Alexa request/response lifecycle.
*   **`src/index.js`**: This is the main application file for the Rock Paper Scissors skill. It extends `AlexaSkill` and implements the specific game logic. It defines the skill's custom `intentHandlers` (e.g., `StartGameIntent`, `RockIntent`, `PaperIntent`, `ScissorsIntent`, `GamesPlayedIntent`) and also includes logic for Alexa's weapon choice, tracking game statistics (wins, losses, ties), and generating appropriate speech outputs based on game outcomes.
*   **`speechAssets/IntentSchema.json`**: This JSON file defines the custom intents and any associated slots that the Rock Paper Scissors skill understands. It outlines the structure of user requests that the Alexa service will route to the skill.
*   **`speechAssets/SampleUtterances.txt`**: This file contains example phrases that users might say to invoke the skill's intents. These sample utterances are crucial for training the Alexa NLU model, allowing it to accurately map various user expressions to the defined intents.

## How to run

To run and deploy this Alexa skill, you will need an AWS account and an Alexa Developer account.

1.  **Create an AWS Lambda Function**:
    *   Navigate to the AWS Lambda console.
    *   Create a new function.
    *   Choose Node.js as the runtime (e.g., Node.js 18.x).
    *   Upload the contents of the `src/` directory (specifically `AlexaSkill.js` and `index.js`) as a ZIP file to your Lambda function code.
    *   Set the handler to `index.handler`.
2.  **Configure Alexa Skill**:
    *   Log in to the Alexa Developer Console.
    *   Create a new custom skill.
    *   Under "Interaction Model" -> "JSON Editor", copy the content of `speechAssets/IntentSchema.json`.
    *   Under "Interaction Model" -> "Sample Utterances", copy the content of `speechAssets/SampleUtterances.txt`.
    *   Build the interaction model.
    *   Under "Endpoint", select "AWS Lambda ARN" and paste the ARN of your Lambda function from step 1.
3.  **Update Application ID**:
    *   Obtain your Skill ID (Application ID) from the Alexa Developer Console.
    *   Update `var APP_ID = undefined;` in `src/index.js` with your actual Skill ID (e.g., `var APP_ID = "amzn1.echo-sdk-ams.app.[your-unique-value-here]";`). This is critical for security, ensuring only requests from your skill are processed.
    *   Re-upload the updated `index.js` to your Lambda function.

## Environment variables

The `APP_ID` variable needs to be configured.

*   `APP_ID`: Defined within `src/index.js`. This variable should be set to the unique Application ID provided by the Alexa Developer Console for your skill. It is used to validate that incoming requests originate from the authorized Alexa skill. It is currently set to `undefined` and must be replaced with your skill's actual ID before deployment.

## How to test

Testing can be performed using the Alexa Developer Console or an Alexa-enabled device.

1.  **Alexa Developer Console**:
    *   Navigate to the "Test" tab for your skill in the Alexa Developer Console.
    *   You can type or speak sample utterances (e.g., "start a new game", "rock", "how many games have we played") to simulate user interactions.
    *   Observe the JSON request and response to verify that the skill is behaving as expected.
2.  **Alexa-enabled Device**:
    *   Once deployed and configured, you can interact with the skill on an actual Alexa-enabled device (e.g., Amazon Echo, Echo Dot).
    *   Invoke the skill by saying its invocation name, for example: "Alexa, ask rock paper scissors to start a new game."
    *   Follow the prompts and play the game to ensure the conversational flow and game logic work correctly.
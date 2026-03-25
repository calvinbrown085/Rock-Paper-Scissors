# Developer Guide: Rock Paper Scissors Alexa Skill

This repository contains the source code for an Alexa Skill that implements the classic game of Rock Paper Scissors. Users interact with the skill using voice commands, playing against Alexa, which keeps track of game statistics.

## Architecture

The Rock Paper Scissors Alexa Skill is built upon a custom `AlexaSkill` base class (`src/AlexaSkill.js`). This class provides a foundational framework for handling different Alexa request types (e.g., `LaunchRequest`, `IntentRequest`) and routing them to specific event and intent handlers.

The core application logic (`src/index.js`) extends this `AlexaSkill` base class, overriding default event handlers and defining specific intent handlers for game-related commands (e.g., "RockIntent", "StartGameIntent"). It encapsulates the game logic, including Alexa's random weapon selection, outcome determination, and the management of game statistics (user wins, Alexa wins, ties).

The voice interaction model is defined in the `speechAssets/` directory. `speechAssets/IntentSchema.json` specifies all supported intents and any associated slots, while `speechAssets/SampleUtterances.txt` provides example phrases that train Alexa to map user speech to these intents.

## Key Files

*   **`src/index.js`**: This is the main application file for the Rock Paper Scissors skill. It extends the `AlexaSkill` framework, initializes game state variables (scores, total games), defines specific handlers for all custom intents (e.g., `StartGameIntent`, `RockIntent`), and includes the core game logic functions (`handleRock`, `handlePaper`, `handleScissors`, `chooseWeapon`, `win`, `lose`, `tied`). It also acts as the entry point for the AWS Lambda function (`exports.handler`).
*   **`src/AlexaSkill.js`**: A reusable, generic Node.js module that provides a boilerplate structure for building Alexa Skills. It defines the `AlexaSkill` constructor, request handling mechanisms, and a `Response` object with methods (`tell`, `ask`, `tellWithCard`, `askWithCard`) for formatting responses back to Alexa.
*   **`speechAssets/IntentSchema.json`**: Defines the intent schema, which is the contract between the user's spoken language and the skill's functionality. It lists all intents (custom and built-in Amazon intents) that the skill is designed to handle.
*   **`speechAssets/SampleUtterances.txt`**: Contains example utterances for each intent defined in `IntentSchema.json`. These examples are crucial for training Alexa's natural language understanding (NLU) model to accurately map user phrases to the correct intent.

## How to Run

To deploy and run this Alexa Skill, you will need an Amazon Developer account and an AWS account.

1.  **AWS Lambda Deployment**:
    *   Create a new AWS Lambda function.
    *   Choose Node.js as the runtime.
    *   Package the contents of the `src/` directory (`index.js` and `AlexaSkill.js`) into a ZIP file.
    *   Upload this ZIP file to your Lambda function.
    *   Set the handler to `index.handler`.

2.  **Alexa Skill Configuration**:
    *   Log in to the Amazon Developer Console.
    *   Create a new custom Alexa Skill.
    *   **Interaction Model**:
        *   Under "JSON Editor," paste the content of `speechAssets/IntentSchema.json`.
        *   Under "Sample Utterances," paste the content of `speechAssets/SampleUtterances.txt`.
    *   **Endpoint**:
        *   Select "AWS Lambda ARN" as the service endpoint type.
        *   Copy the ARN (Amazon Resource Name) of your deployed AWS Lambda function and paste it into the "Default Region" field.
    *   **Skill ID**: Note down your Alexa Skill ID (starts with `amzn1.echo-sdk-ams.app.`). This is required for the next step.

3.  **Configure `APP_ID` in `src/index.js`**:
    *   Before deploying, update the `APP_ID` variable in `src/index.js` with your actual Alexa Skill ID:
        ```javascript
        var APP_ID = "amzn1.echo-sdk-ams.app.[your-unique-value-here]"; // Replace with your skill ID
        ```
    *   Re-package and re-upload the updated code to your AWS Lambda function.

Once configured, the skill can be invoked on any Alexa-enabled device linked to your developer account.

## Environment Variables

*   **`APP_ID`**: This variable, defined directly within `src/index.js`, holds the unique Application ID assigned to your Alexa Skill by Amazon. It is essential for validating that incoming requests to your Lambda function originate from your authorized Alexa Skill, preventing unauthorized interactions. It must be updated from `undefined` to your actual skill ID before deployment.

## How to Test

*   **Alexa Developer Console**: Utilize the "Test" tab within the Amazon Developer Console to simulate voice interactions. You can type in utterances or use the microphone icon to speak commands. The console will display the JSON request sent to your Lambda function and the JSON response received, along with the spoken output.
*   **Alexa-enabled Device**: Once the skill is successfully deployed and configured, and enabled on your account, you can interact with it directly on an Amazon Echo or any other Alexa-enabled device by using the defined invocation name (e.g., "Alexa, open rock paper scissors").
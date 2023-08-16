/*
*
*
Reference:
  Amazon Web Services, Inc., “Getting started in Node.js,” Amazon Web Services, Inc., 2023. [Online]. Available:https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html. [Accessed 19 05 2023].
*
*
*/

// Import required AWS SDK clients and commands
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";



// Create a DynamoDB client using DynamoDBClient from AWS SDK
const CLIENT = new DynamoDBClient({});
// Create a DynamoDB DocumentClient for simplified interactions with DynamoDB
const DYNAMO = DynamoDBDocumentClient.from(CLIENT);

// Handler function that will be executed when the Lambda function is triggered
export const handler = async (event) => {
  // Define a constant variable to check if admin exists
  const adminExist = "adminExist";

  // Call getPlayerScore function to handle the incoming event and get player scores
  let responseBody = await getPlayerScore(event, adminExist);

  // Prepare and return the response with player scores
  const response = {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
  return response;
};

// Function to get player scores or check if admin exists based on the resource value
async function getPlayerScore(event, adminExist) {
  let responseBody;

  // Check the resource value to determine the action to be performed
  if (event.queryStringParameters.resource == "playerScore") {
    // Fetch player scores data from DynamoDB using ScanCommand
    const body = await DYNAMO.send(
      new ScanCommand({
        TableName: "playersScore",
      })
    );

    responseBody = body.Items;
  } else if (event.queryStringParameters.resource == "checkAdminExist") {
    // Check if admin exists for a specific quiz
    let returnAdminCheckResponse;
    // Parse the incoming event body to get required parameters
    const inputBody = JSON.parse(event.body);

    /*
    *
    [1]Amazon Web Services, Inc., “Getting started with DynamoDB and the AWS SDKs,” Amazon Web Services, Inc., 2023. 
    [Online]. Available: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html. 
    [Accessed 14 06 2023].
    *
    */
    // Query the DynamoDB table to check if an admin exists for the given quiz
    const adminExistValue = await DYNAMO.send(
      new ScanCommand({
        TableName: adminExist,
        FilterExpression: "#quizName = :quizNameValue",
        ExpressionAttributeNames: {
          "#quizName": "quizName",
        },
        ExpressionAttributeValues: {
          ":quizNameValue": inputBody.quizName,
        },
      })
    );
    let checkAdminExist = adminExistValue.Items;

    // If no admin exists, create a new entry with admin status
    if (checkAdminExist.length == 0) {
      returnAdminCheckResponse = true;
      await DYNAMO.send(
        new PutCommand({
          TableName: adminExist,
          Item: {
            quizName: inputBody.quizName,
            playerEmail: inputBody.email,
            adminStatus: true,
          },
        })
      );
    } else {
      // If admin exists, set the response accordingly
      returnAdminCheckResponse = false;
    }
    // Prepare the response body with email, quizName, and admin access status
    responseBody = {
      email: inputBody.email,
      quizName: inputBody.quizName,
      adminAccess: returnAdminCheckResponse,
    };
  } else {
    // Handle the case when the resource is not recognized
    responseBody = "Error in fetching playerscore data";
  }
  return responseBody;
}

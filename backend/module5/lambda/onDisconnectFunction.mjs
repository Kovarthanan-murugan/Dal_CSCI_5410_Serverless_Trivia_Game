/*
*
*
Reference:
  Amazon Web Services, Inc., “Getting started in Node.js,” Amazon Web Services, Inc., 2023. [Online]. Available:https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html. [Accessed 19 05 2023].
*
*
*/

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

// Create a DynamoDB client
const CLIENT = new DynamoDBClient({});

// Create a DynamoDB Document Client from the client
const DYNAMO = DynamoDBDocumentClient.from(CLIENT);

// Use the environment variable for the table name
const PLAYER_CONNECTED_TABLE = process.env.Player_Connected;

export const handler = async (event, context) => {
  // Fetch player information based on the connectionId from the players connected table
  /*
*
[1]Amazon Web Services, Inc., “Getting started with DynamoDB and the AWS SDKs,” Amazon Web Services, Inc., 2023. 
[Online]. Available: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html. 
[Accessed 01 07 2023].
*
*/
  const body = await DYNAMO.send(
    new ScanCommand({
      TableName: PLAYER_CONNECTED_TABLE,
      FilterExpression: "#connectionId = :connectionIdValue",
      ExpressionAttributeNames: {
        "#connectionId": "connectionId",
      },
      ExpressionAttributeValues: {
        ":connectionIdValue": event.requestContext.connectionId,
      },
    })
  );

  // Extract the id of the player to be deleted from the table
  let deleteId = body.Items[0].id;

  // Create a DeleteCommand to remove the player information from the DynamoDB table
  const command = new DeleteCommand({
    TableName: PLAYER_CONNECTED_TABLE,
    Key: {
      id: deleteId,
    },
  });

  // Execute the DeleteCommand to remove the player information
  const response = await DYNAMO.send(command);

  // Return a success response
  return { statusCode: 200 };
};

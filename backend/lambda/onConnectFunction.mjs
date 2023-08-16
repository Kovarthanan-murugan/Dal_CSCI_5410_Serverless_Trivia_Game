/*
*
*
Reference:
  Amazon Web Services, Inc., “Getting started in Node.js,” Amazon Web Services, Inc., 2023. [Online]. Available:https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html. [Accessed 19 05 2023].
*
*
*/

// Import required AWS SDK components
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

// Create a DynamoDB client
const CLIENT = new DynamoDBClient({});

// Create a DynamoDB Document Client from the client
const DYNAMO = DynamoDBDocumentClient.from(CLIENT);

// Use the environment variable for the table name
const CONNECTED_PLAYER_TABLE = process.env.Player_Connected;

export const handler = async (event, context) => {
  // Fetch data from the players connected table to get the count of players already joined
  let fetchDataFromPlayerConnected = await DYNAMO.send(
    new ScanCommand({
      TableName: CONNECTED_PLAYER_TABLE,
      Select: "COUNT", // Get only the count of items in the table
    })
  );
  const playersJoinedCount = fetchDataFromPlayerConnected.Count;
  const currentPlayersJoined = playersJoinedCount + 1;

  // Extract player email from the query string parameters
  const playerEmail = event["queryStringParameters"]["playerEmail"];

  // Extract connectionId from the requestContext
  const connectId = event["requestContext"]["connectionId"];

/*
*
[1]Amazon Web Services, Inc., “Getting started with DynamoDB and the AWS SDKs,” Amazon Web Services, Inc., 2023. 
[Online]. Available: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html. 
[Accessed 14 05 2023].
*
*/
  // Store the player's information in the players connected table
  await DYNAMO.send(
    new PutCommand({
      TableName: CONNECTED_PLAYER_TABLE,
      Item: {
        id: currentPlayersJoined,
        connectionId: connectId,
        playerEmail: playerEmail,
      },
    })
  );

  // Return a success response
  return { statusCode: 200 };
};

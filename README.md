# Serverless-Trivia-Game

Trivia Titans is an online quiz game that enables multiple players to engage in various quizzes, either individually or as part of teams. To access the games, users can register through three methods: email, Google, or Facebook accounts. Users using Google/Facebook accounts bypass Multi-Factor Authentication (MFA) as third-party verification is already done. For those registering via email, MFA questions are mandatory during sign-up, with these questions serving as random prompts during login.

Once logged in, users can discover a range of quizzes crafted by the game's administrators. They can employ diverse filters to narrow down game options and can also invite teammates to participate collectively. During gameplay, users can submit answers and view correct responses afterward.

Furthermore, users have the capability to oversee their team affiliations. They can invite others to join their teams and remove members if needed. The inclusion of a chatbot assists users throughout the application, offering guidance and delivering scores. The application boasts a user-friendly interface and is entirely serverless. It's constructed utilizing various cloud services provided by AWS and GCP.

**Module5 In-Game Experience**

**Features Implemented**
**1. WebSocket Connection and Connection Management:** I have integrated AWS 
API Gateway WebSocket to establish a connection between the client and the 
backend (AWS Lambda) for real-time communication during the quiz. Lambda 
functions handle backend operations, and the API Gateway WebSocket effectively 
manages connections by storing connection IDs in DynamoDB.

**2. Quiz Question Delivery**: Trivia multiple-choice questions are now seamlessly 
pushed to connected clients at set timer intervals through the WebSocket 
connection. Players receive questions and can answer them promptly.
Answer Evaluation and Score Update: The player's answers are sent to AWS 
Lambda through the API Gateway. Lambda evaluates the answers against the correct 
answers stored in the database. If the player answers correctly, their score is instantly 
increased in DynamoDB. Additionally, the updated score is stored in Firestore, 
which is used by Module 2 for other functionalities.

**3. Real-time Player Online List and Scores:** Clients receive real-time updates on the 
online list of players and their scores. This information is constantly updated as 
players join, leave, or score changes.

**4. Game Administration Logic:** The game administration logic has been successfully 
implemented to control the quiz's start. Only the admin has the privilege to start the 
quiz. In the case of a single team, the admin exclusively initiates the game. For
multiple teams, the first admin to join takes charge of starting the game. 
Furthermore, correct answers are displayed to players between each question.

**AWS Services Used:**

1) Aws Lambda
2) Aws Gateway
3) Aws DynamoDB
4) Aws SNS

**Architecture**

![image](https://github.com/Kovarthanan-murugan/Serverless-Trivia-Game/assets/90558927/7e22d5c8-d157-42ff-b158-c6c1866520bf)

Aws Api-gateway service offers mulitple options to create a api, in that websocket is one of it, which enables option to establish bi-directional communications between client and server until the connection is disconnected. Lambda functions to implement the serverless backend operations and dynamodb to store the data.

![image](https://github.com/Kovarthanan-murugan/Serverless-Trivia-Game/assets/90558927/7e00fb0f-9e64-4ecd-afb7-70362150e376)

**Lambda Explanation:**

**1. onConnectFunction:**

**Path:** backend/lambda/onConnectFunction.mjs

**2. getRequestFunction:**

**Path:** backend/lambda/getRequestFunction.mjs

**3. sendQuestionToClient:**

**Path:** backend/lambda/sendQuestionToClient.mjs

**4. getResponseFunction:**

**Path:** backend/lambda/getResponseFunction.mjs

**5. onDisconnectFunction:**

**Path:** backend/lambda/onDisconnectFunction.mjs

**6. reponseToEndPoint:**

**Path:** backend/lambda/reponseToEndPoint.mjs


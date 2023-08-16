# Serverless-Trivia-Game

Trivia Titans is an online quiz game that enables multiple players to engage in various quizzes, either individually or as part of teams. To access the games, users can register through three methods: email, Google, or Facebook accounts. Users using Google/Facebook accounts bypass Multi-Factor Authentication (MFA) as third-party verification is already done. For those registering via email, MFA questions are mandatory during sign-up, with these questions serving as random prompts during login.

Once logged in, users can discover a range of quizzes crafted by the game's administrators. They can employ diverse filters to narrow down game options and can also invite teammates to participate collectively. During gameplay, users can submit answers and view correct responses afterward.

Furthermore, users have the capability to oversee their team affiliations. They can invite others to join their teams and remove members if needed. The inclusion of a chatbot assists users throughout the application, offering guidance and delivering scores. The application boasts a user-friendly interface and is entirely serverless. It's constructed utilizing various cloud services provided by AWS and GCP.

**Module5 In-Game Experience**

**AWS Services Used:**

1) Aws Lambda
2) Aws Gateway
3) Aws DynamoDB

**Architecture**

![image](https://github.com/Kovarthanan-murugan/Serverless-Trivia-Game/assets/90558927/7e22d5c8-d157-42ff-b158-c6c1866520bf)

Aws Api-gateway service offers mulitple options to create a api, in that websocket is one of it, which enables option to establish bi-directional communications between client and server until the connection is disconnected. Lambda functions to implement the serverless backend operations and dynamodb to store the data.

![image](https://github.com/Kovarthanan-murugan/Serverless-Trivia-Game/assets/90558927/7e00fb0f-9e64-4ecd-afb7-70362150e376)

**Lambda Explanation:**

**onConnectFunction:**

**Path:** backend/lambda/onConnectFunction.mjs

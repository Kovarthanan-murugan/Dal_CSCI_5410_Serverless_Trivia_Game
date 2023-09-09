# Serverless-Trivia-Game

Trivia Titans is an online quiz game that enables multiple players to engage in various quizzes, either individually or as part of teams. To access the games, users can register through three methods: email, Google, or Facebook accounts. Users using Google/Facebook accounts bypass Multi-Factor Authentication (MFA) as third-party verification is already done. For those registering via email, MFA questions are mandatory during sign-up, with these questions serving as random prompts during login.

Once logged in, users can discover a range of quizzes crafted by the game's administrators. They can employ diverse filters to narrow down game options and can also invite teammates to participate collectively. During gameplay, users can submit answers and view correct responses afterward.

Furthermore, users have the capability to oversee their team affiliations. They can invite others to join their teams and remove members if needed. The inclusion of a chatbot assists users throughout the application, offering guidance and delivering scores. The application boasts a user-friendly interface and is entirely serverless. It's constructed utilizing various cloud services provided by AWS and GCP.

 **Architecture**

 ![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/afa5ef5d-9665-4db2-9b7f-bd4a7e480c83)

# Module5 In-Game Experience

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

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/c1e71ea4-88df-4ea9-bf51-d035f79e0698)

Aws Api-gateway service offers mulitple options to create a api, in that websocket is one of it, which enables option to establish bi-directional communications between client and server until the connection is disconnected. Lambda functions to implement the serverless backend operations and dynamodb to store the data.

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/d441be18-75dc-48c8-819f-fb937bf4e275)

**Lambda Explanation:**

**1. onConnectFunction:**

**Path:** backend/lambda/onConnectFunction.mjs

When the client request for new connection, Aws websocket  will create new connection for that client and lambda which as been get as a target for $connect route will get trigged and in this lambda the connection id and other details sent by the client as a request parameters when making the connection request will be stored in a database.



**2. getRequestFunction:**

**Path:** backend/lambda/getRequestFunction.mjs
This Lambda will get triggerd if the request body of the connection as the route **getRepsonseFromClient** which will trigger the lambda getRequestFunction to process the request by fetching the requested source, in this case the quiz requested by the users and other details like team members and players currently ready the play the same game.

And this data will be sent to another lambda **sendQuestionToClient** to send data to the client in the define interval mentioned for that particular requested quiz.

**3. sendQuestionToClient:**

**Path:** backend/lambda/sendQuestionToClient.mjs

It will send the data(quiz question)to all the connected client for that particular quiz at the time in the regular interval defined for that particular quiz.

**4. getResponseFunction:**

**Path:** backend/lambda/getResponseFunction.mjs

Each connected client will get the data from the server and will be provided with option to send response to the server, in this case each player will be displayed with the questions with they can answer individually and send resposne.

Each response from each client will be evaluated and scores will be update in a database which will later be used to calculate the performance of the player individually.


**5. onDisconnectFunction:**

**Path:** backend/lambda/onDisconnectFunction.mjs

When a client exits the game lobby, there connection will be disconnected and they will no longer get the data from the server.

**6. reponseToEndPoint:**

**Path:** backend/lambda/reponseToEndPoint.mjs
It provides options to other module done in different cloud services to access and modify content in the databases.

**Output:**


![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/1cb704a5-5026-4fe8-b3f6-0c1c88bd86db)
![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/736344d5-0d85-4165-b501-167ea32cc7fb)
![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/c832b1a8-2751-41d9-bcab-34ea67c7e08b)
![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/eec391b5-a344-4bd0-ade7-7f86f018d57e)
![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/feb7ae88-0540-49b4-b1b7-2769f2284f11)
![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/c849e648-532a-4b62-adbb-10a4b7566861)

# Module2 User Profile Management

The application provides users with a comprehensive view of their profile details, including first 
name, last name, email, and age. Additionally, it offers insights into the user's game history 
performance. Users can not only view this information but also make changes to their existing 
profile values, which are then updated in the database and seamlessly propagated to all the 
relevant locations where these operations are executed.

**Features Implemented**

**1. User Details Display:** I have created a React frontend component that makes API calls to the 
Node.js backend hosted on GCP Cloud Functions. The backend interacts with Google Firestore 
to fetch and display user details on the frontend.

**2. User Details Editing:** The React frontend includes an editable form that allows users to modify 
their details. When users submit the form, it sends a request to the Node.js backend. The backend 
processes the request and updates the relevant user details in Google Firestore.
Game History Performance: I integrated Module 5 In-game Experience to track the player's 
performance. Module 5 sends events to the Node.js backend hosted on Cloud Functions 
whenever there is a change in the player's score. The backend processes these events and updates 
the game history performance data in Google Firestore.

**Services Used:**

**1. GCP Cloud Functions:** The Node.js backend is successfully hosted on GCP 
Cloud Functions. This choice of a serverless solution enables efficient handling of 
HTTP requests and automatic scaling based on demand. The implementation of 
Cloud Functions allows the application to optimize resource usage and costeffectively manage serverless computing. Integrating this backend with other GCP 
services ensures smooth communication and interoperability among different 
modules.
20

**2. Google Firestore :** The implementation of Google Firestore as the NoSQL 
document database has been successfully completed. This choice facilitates 
performing various operations related to user details in GCP. Firestore's flexible 
structure enables the storage of user profile information and game history 
performance data in a scalable and organized manner. Its integration with the 
backend has been effectively established, allowing seamless data flow and retrieval 
for the application's requirements. The utilization of Firestore provides a robust and 
efficient database solution within the GCP environment

**Architecture**

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/47d66d84-3508-4a2e-b574-c9465c786068)

The GCP-hosted Node.js backend has been seamlessly deployed onto Cloud Functions. This strategic decision to opt for a serverless approach ensures efficient management of HTTP requests and automatic scaling in response to demand fluctuations. By utilizing Cloud Functions, the application maximizes resource utilization and adeptly manages serverless computing, all while optimizing costs. Integrating this backend with other GCP services fosters smooth inter-module communication, promoting seamless functionality across various components.

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/13dd5e6d-0072-43b4-9e2b-58a9eeef629f)

The integration of Google Firestore as the chosen NoSQL document database has been successfully executed. This selection greatly facilitates a range of operations concerning user details within the GCP ecosystem. Leveraging Firestore's adaptable structure, the application securely stores user profile information and game-related historical performance data in an organized and scalable manner. The backend's tight integration with Firestore ensures the uninterrupted flow of data, enabling efficient retrieval to fulfill the application's needs. The utilization of Firestore presents a resilient and effective database solution within the broader GCP environment.

**Output:**

**Retrieving User Profile Details**

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/4549aaed-ce7a-4db7-a75c-71c1a6003c53)

**Editing User Profile Details**

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/7b4dac95-0f0e-4c31-8eef-ffef45a5dee4)

**Game History Update**

![image](https://github.com/Kovarthanan-murugan/Dal_CSCI_5410_Serverless_Trivia_Game/assets/90558927/5b145161-647d-47c7-a72a-d6bae61ad38d)


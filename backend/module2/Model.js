const Firestore = require("@google-cloud/firestore");

class UserModel {
  constructor() {
    this.db = new Firestore({
      projectId: "trivia-titans-392121",
      keyFilename: "./serverless-kova-1d0a58907240.json",
    });
  }

  async updateUserData(docName, profileDetails) {
    const docRef = this.db.collection("user-data").doc(docName);
    await docRef.update(profileDetails);
  }

  async setUserData(docName, wholeData) {
    const docRef = this.db.collection("user-data").doc(docName);
    await docRef.set(wholeData);
  }

  async getUserData(queryUser) {
    const docRef = this.db.collection("user-data").doc(queryUser);
    const data = await docRef.get();
    if (!data.exists) {
      return null;
    } else {
      return data.data();
    }
  }
}

module.exports = UserModel;

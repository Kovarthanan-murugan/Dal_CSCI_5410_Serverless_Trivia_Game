const UserModel = require("./Model");

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  async updateUserData(req, res) {
    const { docName, profileDetails } = req.body;
    await this.userModel.updateUserData(docName, profileDetails);
    res.end();
  }

  async setUserData(req, res) {
    const { docName, wholeData } = req.body;
    await this.userModel.setUserData(docName, wholeData);
    res.end();
  }

  async getUserData(req, res) {
    const queryUser = req.query.user;
    const userData = await this.userModel.getUserData(queryUser);
    if (userData === null) {
      console.log("No such document!");
    } else {
      res.send(userData);
      console.log("document data:", userData);
    }
  }
}

module.exports = UserController;

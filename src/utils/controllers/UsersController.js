import server from "../server";

class UsersController {
  async Register(data) {
    try {
      const Reponse = await server.post("/users", data);
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
  async getSelectList() {
    try {
      const Reponse = await server.get("/members/selectlist");
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
}
export default UsersController;

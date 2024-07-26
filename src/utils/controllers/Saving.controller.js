import server from "../server";

class SavingController {
  async Register(data) {
    try {
      const Reponse = await server.post("/saving", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
}
export default SavingController;

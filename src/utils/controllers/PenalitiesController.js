import server from "../server";

class PenalityController {
  async Register(data) {
    try {
      const Reponse = await server.post("/penalities", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
  async pay(p_id) {
    try {
      const Reponse = await server.put("/penalities/pay/" + p_id, {
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
export default PenalityController;

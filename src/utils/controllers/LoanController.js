import server from "../server";

class LoanController {
  async Register(data) {
    try {
      const Reponse = await server.post("/loans", data);
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
  async getLoans() {
    try {
      const Reponse = await server.get("/loans");
      return Reponse;
    } catch (error) {
      console.log(error);
    }
  }
}
export default LoanController;

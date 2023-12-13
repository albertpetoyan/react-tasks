import { NextFunction } from "express";
import { IReq, IRes } from "../../constants/misc";
import HttpStatusCodes from "../../constants/HttpStatusCodes";
import { users } from "../../repos/database.json";

class UserService {
  static findUser = async (req: IReq, res: IRes, next: NextFunction) => {
    try {
      const { email: req_email, number: req_number } = req.query;
      const result = users.filter(
        ({ email, number }) =>
          req_email &&
          email === req_email &&
          (!req_number || number === req_number),
      );
      let currentTimeout;
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
      currentTimeout = setTimeout(() => {
        res.send({
          status: HttpStatusCodes.OK,
          result: result || [],
        });
      }, 5000);
    } catch (e) {
      next(e);
    }
  };
}

export default UserService;

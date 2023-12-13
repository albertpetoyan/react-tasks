import { NextFunction } from "express";
import { IReq, IRes } from "../constants/misc";

const validate =
  (schema: any) => async (req: IReq, res: IRes, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      return res.status(500).json({ type: e.name, message: e.message });
    }
  };
export default validate;

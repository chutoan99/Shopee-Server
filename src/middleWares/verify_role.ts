import { Request, Response, NextFunction } from "express";
import { notAuth } from "./handle_errors";

// cac role la shop_Admin thi next
const isShopAdmin = (req: any, res: Response, next: NextFunction) => {
  const { role } = req.user;
  if (role !== "shop_Admin") return notAuth("Require role shop_Admin", res);
  req.shop = req.user;
  next();
};
export default isShopAdmin;

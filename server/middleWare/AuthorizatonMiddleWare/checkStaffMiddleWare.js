export function checkStaffMiddleWare(req, res, next) {
  let { role } = req.user;
  if (role !="staff") {
    return res.status(401).send({ error: "you are not authorized " });
  }
  next();
  
}

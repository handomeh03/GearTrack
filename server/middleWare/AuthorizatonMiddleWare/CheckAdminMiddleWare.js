export function CheckAdminMiddleware(req, res, next) {
  let { role } = req.user;
  if (role != "admin") {
    return res.status(401).send({ error: "you are not authorized " });
  }
  next();
  
}

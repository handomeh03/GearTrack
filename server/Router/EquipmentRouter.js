import express from "express";
import { addEquipment, checkin, checkout, DeleteEquipment, editEquipment, getAllEquipment, getAllReversationForOneStaff, searchEquipment } from "../Controller/EquipmentController.js";
import { Authorization } from "../middleWare/AuthorizatonMiddleWare/AuthMiddleWare.js";
import { CheckAdminMiddleware } from "../middleWare/AuthorizatonMiddleWare/CheckAdminMiddleWare.js";
import { addEquipmentSchema, addEquipmentValid } from "../middleWare/JoiValidation/addEquipment.js";
import { checkStaffMiddleWare } from "../middleWare/AuthorizatonMiddleWare/checkStaffMiddleWare.js";

export const EquipmentRouter=express.Router();

EquipmentRouter.post("/addEquipment",Authorization,CheckAdminMiddleware,addEquipmentValid(addEquipmentSchema),addEquipment)
EquipmentRouter.delete("/deleteEquipment/:id",Authorization,CheckAdminMiddleware,DeleteEquipment);
EquipmentRouter.get("/getAllEquipment",getAllEquipment);
EquipmentRouter.patch("/editEquipment/:id",Authorization,CheckAdminMiddleware,editEquipment)
EquipmentRouter.get("/searchEquipment",Authorization,CheckAdminMiddleware,searchEquipment)

EquipmentRouter.post("/:id/checkout",Authorization,checkStaffMiddleWare,checkout)
EquipmentRouter.patch("/:id/checkin",Authorization,checkStaffMiddleWare,checkin)
EquipmentRouter.get("/getAllReversationForOneStaff",Authorization,checkStaffMiddleWare,getAllReversationForOneStaff)
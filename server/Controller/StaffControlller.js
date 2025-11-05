import { staffReversation } from "../models/StaffReversationModel.js";
import { User } from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";
export async function getAllUserAvaible() {
  let { id: StaffId } = req.user;
  try {
    //get all user is avaible
    let users = await User.find({ status: true });
    if (users.length == 0) {
      return res.status(400).send({ error: "no user is avaible" });
    }


    //fliters users without me
    let userWithoutSelfUser = users.filter((e) => {
      return e._id != StaffId;
    });


   //send data as respone
    return res.status(201).send({ avaibleUser: userWithoutSelfUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
export async function SendReversationStaff(req, res) {
  const { id: senderStaffId, email: senderEmail } = req.user; // sender staff
  const { reciverStaffId, date } = req.body; // receiver staff

  try {
    // check if recive staff is exist
    const user = await User.findById(reciverStaffId);
    if (!user) {
      return res.status(400).json({ error: "Staff does not exist" });
    }

    // create new Staff Reversation 
    const newStaffReversation = {
      date,
      senderStaffId,
      reciverStaffId
    };

    // store reversation to recive user
    const staffReservation = await staffReversation.create(newStaffReversation);

    // send email to reciver
    const isSend = await sendEmail(senderEmail, user.email, user.fullName, date);

    if (!isSend) {
      throw new Error("Email could not be sent");
    }

    //send data as respone
    return res.status(200).json({
      staffReservation,
      message: "success",
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


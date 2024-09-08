const express = require("express");//นำเข้าโมดูล Express เพื่อสร้างเราเตอร์ Express
const router = express.Router();//Express เราเตอร์นี้จะใช้เพื่อกำหนดเส้นทางต่างๆ ที่เกี่ยวข้องกับการดำเนินการผลิตภัณฑ์
const authenticateToken = require("../middlewares/auth");/*นำเข้าฟังก์ชันมิดเดิลแวร์authenticateTokenจากไฟล์ที่อยู่ที่
../middlewares/authมิดเดิลแวร์นี้ใช้เพื่อตรวจสอบคำขอโดยยืนยันโทเค็น เพื่อให้แน่ใจว่าผู้ใช้ที่ได้รับอนุญาตเท่านั้นที่สามารถเข้าถึงเส้นทางได้*/
const { getParticipate, getParticipateID, postParticipate, updateParticipate, deleteParticipate,} = require("../controller/SchoolController");

 router.get("/", authenticateToken, getParticipate);
 router.get("/:id", authenticateToken, getParticipateID);
 router.post("/", authenticateToken, postParticipate);
 router.put("/:id", authenticateToken, updateParticipate);
 router.delete("/:id", authenticateToken, deleteParticipate);



module.exports = router;

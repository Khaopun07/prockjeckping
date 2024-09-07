const jwt = require("jsonwebtoken");//นำเข้าjsonwebtokenไลบรารีซึ่งใช้ในการสร้างและตรวจสอบโทเค็นเว็บ JSON

function authenticateToken(req, res, next) {//นำเข้าjsonwebtokenไลบรารีซึ่งใช้ในการสร้างและตรวจสอบโทเค็นเว็บ JSON
    const authHeader = req.headers["authorization"];//มีการส่งHeaderมา
    //นำเข้าjsonwebtokenไลบรารีซึ่งใช้ในการสร้างและตรวจสอบโทเค็นเว็บ JSON
    const token = authHeader && authHeader.split(" ")[1];
//รวจสอบว่าAuthorizationส่วนหัวมีอยู่หรือไม่ หากมี ระบบจะแยกค่าส่วนหัวในอักขระช่องว่างและดึงส่วนที่สอง 


    if (!token) return res.sendStatus(401);
//หากไม่มีโทเค็น ระบบจะแสดงรหัสสถานะ 401 ที่ไม่ได้รับอนุญาต ซึ่งระบุว่าจำเป็นต้องมีการตรวจสอบสิทธิ์ แต่ไม่มีโทเค็น

    jwt.verify(token, process.env.ACCESS_TOKEN_SELECT, (err, admin) => {//ตรวจสอบโทเค็น
        if (err) return res.status(403).send("Access token expired");
        //หากมีข้อผิดพลาดระหว่างการตรวจสอบโทเค็นระบบจะแสดงรหัสสถานะ 403 ห้ามพร้อมข้อความ "โทเค็นการเข้าถึงหมดอายุ"

        req.admin = admin;//หากโทเค็นถูกต้อง จะทำให้ตัวจัดการเส้นทางที่ตามมาสามารถเข้าถึงข้อมูลผู้ใช้ได้
        next();//nextฟังก์ชันเพื่อส่งการควบคุมไปยังมิดเดิลแวร์ถัดไป
        
    });
}

module.exports = adminticateToken;
//ส่งออกauthenticateTokenฟังก์ชันเพื่อให้สามารถใช้เป็นมิดเดิลแวร์ในส่วนอื่น ๆ ของแอปพลิเคชันได้

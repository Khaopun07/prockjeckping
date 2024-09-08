const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());

dotenv.config();//บรรทัดนี้โหลดตัวแปรสภาพแวดล้อมจาก.envไฟล์ลงใน ไฟล์
mongoose.connect(process.env.MONGO_DB_URL, {}).then(() => {
    /*บรรทัดนี้พยายามเชื่อมต่อกับฐานข้อมูลMongoDB โดยใช้ Mongoose ซึ่งเป็นไลบรารี ODM  */
    console.log('MongoDB connected');
}).catch(err => console.log(err));

const  participateRoutes = require("./routes/participate");
app.use("/api/participate", participateRoutes);

const  schoolRoutes = require("./routes/school");
app.use("/api/school", schoolRoutes);

const authRoutes = require ("./routes/auth");
app.use("/api/auth", authRoutes);

const adminRoutes = require ("./routes/admin");
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const Participate = require("../models/participate");

// Get all products
//ฟังก์ชัน getProduct ถูกส่งออกจากโมดูลนี้เพื่อให้สามารถเข้าถึงจากที่อื่นในแอปพลิเคชัน. ฟังก์ชันนี้เป็นแบบ async ซึ่งหมายความว่าสามารถใช้ await ภายในได้.
exports.getParticipate = async (req, res) => {
    try {
        // Fetch all products from the database
        const participates = await Participate.find();
        //Product.find() คือคำสั่ง Mongoose ที่ใช้เพื่อดึงข้อมูลทั้งหมดจากคอลเลกชัน Product ในฐานข้อมูล MongoDB.

        // Send the products as JSON with a 200 status
        res.status(200).json(participates);
    } catch (error) {
        // Send error message with a 500 status
        res.status(500).json({ message: error.message });
        //res.status(500) ตั้งสถานะของการตอบกลับ HTTP เป็น 500 (Internal Server Error), ซึ่งบ่งบอกว่ามีข้อผิดพลาดภายในเซิร์ฟเวอร์.
    }
};

// Get a product by ID
exports.getParticipateID = async (req, res) => {
    try {
        const { id } = req.params;//req.params เป็นอ็อบเจกต์ที่เก็บพารามิเตอร์ที่ถูกส่งมาจาก URL ของการร้องขอ.
        const participate = await Participate.findById(id);//Product.findById(id) คือคำสั่ง Mongoose ที่ใช้ค้นหาผลิตภัณฑ์ในฐานข้อมูล MongoDB โดยใช้ ID ที่ระบุ.
        if (participate) {
            res.status(200).json(participate);
            //ตั้งสถานะการตอบกลับ HTTP เป็น 200 (OK) เพื่อแสดงว่าการร้องขอประสบความสำเร็จ.
        } else {
            res.status(404).json({ message: 'Participate not found' });
            //ตั้งสถานะการตอบกลับ HTTP เป็น 404 (Not Found) เพื่อแสดงว่าข้อมูลที่ร้องขอไม่สามารถพบได้.
        }
    } catch (error) {//ใช้ catch เพื่อจับข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการค้นหาผลิตภัณฑ์.
        res.status(500).json({ message: error.message });
    }
};

// Create a new product
exports.postParticipate = async (req, res) => {
    try {
        //ข้อมูลผลิตภัณฑ์ (product_name, product_type, price, และ unit) ถูกดึงมาจาก req.body ซึ่งเป็นเนื้อหาของคำขอ HTTP POST.
        const {name,surname,course,Boarding_point } = req.body;

        //สร้างอ็อบเจกต์ใหม่ของ Product โดยใช้ข้อมูลที่ได้รับจาก req.body.
        const participate = new Participate({name,surname,course,Boarding_point });

        //ใช้ product.save() เพื่อบันทึกผลิตภัณฑ์ใหม่ลงในฐานข้อมูล.
        const savedParticipate = await participate.save();

        //ถ้าการบันทึกสำเร็จ, ข้อมูลผลิตภัณฑ์ที่ถูกบันทึก (savedProduct) จะถูกส่งกลับไปยังผู้ใช้ในรูปแบบ JSON.
        res.status(201).json(savedParticipate);
    } catch (error) {
        //ใช้ catch เพื่อจับข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการบันทึกผลิตภัณฑ์.
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
exports.updateParticipate = async (req, res) => {
    //บรรทัดนี้จะส่งออกupdateProductฟังก์ชัน ทำให้สามารถใช้งานเป็นตัวจัดการเส้นทางในแอปพลิเคชัน Express.js ได้
    try {//tryบล็อกนี้ใช้เพื่อตรวจจับข้อผิดพลาดใดๆ ที่
        const { id } = req.params;//บรรทัดนี้จะแยกรหัสผลิตภัณฑ์จากพารามิเตอร์คำขอ ( req.params) ใน Express.js 
        const participate = await Participate.findById(id);//awaitคำสำคัญนี้ใช้เพื่อรอให้การดำเนินการแบบอะซิงโครนัสนี้เสร็จสิ้นก่อนดำเนินการต่อ
        if (!participate) return res.status(404).json({ message: 'Participate not found' });
        //หากไม่พบผลิตภัณฑ์ที่มี ID ที่กำหนด ฟังก์ชันจะตอบสนองด้วยรหัสสถานะ 404 และวัตถุ JSON ที่มีข้อความ "ไม่พบผลิตภัณฑ์"
        
        const update = req.body;//บรรทัดนี้จะดึงข้อมูลอัปเดตจากเนื้อหาคำขอ ( req.body)
        Object.assign(participate, update);//อ็อบเจ็กต์ผลิตภัณฑ์จะได้รับการอัปเดตด้วยค่าใหม่ที่ระบุไว้req.bodyใน
        const updatedParticipate = await participate.save();//บรรทัดนี้จะบันทึกผลิตภัณฑ์ที่แก้ไขแล้วกลับไปยังฐานข้อมูล
        res.status(200).json(updatedParticipate);// หากการบันทึกเสร็จสมบูรณ์ ฟังก์ชันจะตอบกลับด้วยรหัสสถานะ 200
    } catch (error) {
        res.status(500).json({ message: error.message });
        //หากเกิดข้อผิดพลาดใดๆ ระหว่างการดำเนินการtryบล็อกบล็อกจะcatchตรวจจับข้อผิดพลาดและตอบสนองด้วยรหัสสถานะ 500 และข้อความแสดงข้อผิดพลาด
    }
};

// Delete a product
exports.deleteParticipate = async (req, res) => {
    //บรรทัดนี้จะส่งออกdeleteProductฟังก์ชันเพื่อให้สามารถใช้เป็นตัวจัดการเส้นทางในแอปพลิเคชัน Express.js ของคุณได้
    try {//tryบล็อกนี้ใช้เพื่อตรวจจับข้อผิดพลาดใดๆ ที่อาจเกิดขึ้นระหว่างการเรียกใช้โค้ดภายในบล็อก
        const { id } = req.params;//บรรทัดนี้จะแยกรหัสผลิตภัณฑ์จากพารามิเตอร์คำขอ ( req.params) ตัวอย่างเช่น หาก URL /products/123เป็นidจะ123เป็น
        const participate = await Participate.findById(id); //ช้เมธอดของ Mongoose findByIdเพื่อค้นหาผลิตภัณฑ์ในฐานข้อมูลตาม ID ของสินค้า
        if (!participate) return res.status(404).json({ message: 'Participate not found' });
        //หากไม่พบผลิตภัณฑ์ฟังก์ชันจะตอบสนองด้วยรหัสสถานะ 404 และวัตถุ JSON ที่มีข้อความ "ไม่พบผลิตภัณฑ์"ฟังก์ชันจะตอบสนองด้วยรหัสสถานะ 404 และวัตถุ JSON ที่มีข้อความ "ไม่พบผลิตภัณฑ์"
        
        await Participate.findByIdAndDelete(id);//บรรทัดนี้ใช้เมธอดของ Mongoose findByIdAndDeleteเพื่อลบผลิตภัณฑ์ที่มี ID ที่ระบุจากฐานข้อมูล
        res.status(200).json({ message: 'Participate deleted' });//หากการลบสำเร็จ ฟังก์ชันจะตอบกลับด้วยรหัสสถานะ 200
    } catch (error) {
        res.status(500).json({ message: error.message });
        // หากเกิดข้อผิดพลาดใดๆ ระหว่างการดำเนินการtryบล็อก (เช่น ข้อผิดพลาดของฐานข้อมูล) catchบล็อกจะจับข้อผิดพลาดและตอบสนองด้วยรหัสสถานะ 500 และข้อความแสดงข้อผิดพลาด
    }
};

const mongoose = require('mongoose');

const schoolsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    school_name: { type: String, required: true },
    district: { type: String, required: true },
    provinc: { type: String, required: true },
    student_count: { type:Number, required: true },
    teacher_name: { type: String, required: true },
    phone_teacher: { type: String, required: true },
    faculty: { type: String, required: true }
}, 
{ timestamps: true, versionKey: false });

module.exports = mongoose.model('School', schoolsSchema);

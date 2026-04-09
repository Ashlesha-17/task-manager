const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ["Pending", "Done"],
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

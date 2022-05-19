const mongoose = require("mongoose");

const BeginnerSchema = new mongoose.Schema(
    {
        name: { type: String},
        videoLink:{ type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Beginner", BeginnerSchema);

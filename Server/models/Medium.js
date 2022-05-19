const mongoose = require("mongoose");

const MediumSchema = new mongoose.Schema(
    {
        name: { type: String},
        videoLink:{ type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Medium", MediumSchema);

const mongoose = require("mongoose");

const AdvancedSchema = new mongoose.Schema(
    {
        name: { type: String},
        videoLink:{ type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Advanced", AdvancedSchema);

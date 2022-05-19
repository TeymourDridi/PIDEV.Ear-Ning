const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = new mongoose.Schema(
    {
        name: { type: String},
        imgLink: { type: String},
        prix:{type: String},
        description: { type: String},
        beginner: [
            { type: Schema.Types.ObjectId, ref: "Beginner" }
        ],
        medium: [
            { type: Schema.Types.ObjectId, ref: "Medium" }
        ],
        advanced: [
            { type: Schema.Types.ObjectId, ref: "Advanced" }
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

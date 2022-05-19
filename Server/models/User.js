const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        img: { type: String },
        //Teymour
        karaoke: [{ type: Schema.Types.ObjectId, ref: "Karaoke" }],
        favouriteEvent: [{ type: Schema.Types.ObjectId, ref: "evenement" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

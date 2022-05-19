const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const karaokeRoute = require("./routes/Karaoke/karaoke");
const authRoute = require("./routes/auth");
const courseRoute = require("./routes/Course/course");
//const eventRoute=require("./routes/event/evenement")
//const http = require("http")
const cors = require("cors");
var server = require('http').Server(app);

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ]
    }
})
let x=true;
io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
        x=false;
    })

    socket.on("callUser", (data) => {

        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})

    })

    socket.on("answerCall", (data) => {

        io.to(data.to).emit("callAccepted", data.signal)


    })
})
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/Karaoke", karaokeRoute);
app.use("/api/course", courseRoute);
app.use('/api/event', require('./routes/event/evenement'));

server.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});

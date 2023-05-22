import express from "express";
import sendEmail from "./controllers/mail.js";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hostelsRoute from "./routes/hostels.js";
import roomsRoute from "./routes/rooms.js";
import messageRoute from "./routes/message.route.js";
import conversationsRoute from "./routes/conversation.route.js";
import cookieParser from "cookie-parser";

import Conversation from "./models/conversation.model.js";

import cors from "cors";

const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8800;
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors({ origin: "http://localhost:5174", credentials: true }));
// app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hostels", hostelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messageRoute);

app.post("/send-email", sendEmail);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(PORT, () => {
  connect();
  console.log("Connected to backend.");
});

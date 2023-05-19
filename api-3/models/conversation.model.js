import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    // sellerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   // required: true,
    // },
    // buyerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   // required: true,
    // },
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);

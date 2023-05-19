import { createError } from "../utils/error.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.user.id,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.user.isSeller,
          readByBuyer: !req.user.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    console.log(req.user.isSeller);

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id })
    .populate("userId", "username");
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};

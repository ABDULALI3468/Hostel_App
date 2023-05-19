import User from "../models/User.js";
import Hostel from "../models/Hostel.js";

export const updateUser = async (req, res, next) => {
  const { username, email } = req.body;
  const { id } = req.params;

  // Check if username is already taken
  const existingUser = await User.findOne({ _id: id });

  if (existingUser && username !== existingUser.username) {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) return res.status(409).json({ message: "Username is already taken" });
    } catch (err) {
      // next(err)
    }
  }

  if (existingUser && email !== existingUser.email) {
    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) return res.status(409).json({ message: "Email is already taken" });
    } catch (err) {
      // next(err);
    }
  }

  try {``
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// export const getHostelsByOwner = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const hostels = await Hostel.find({ createdBy: userId }).populate("managerId").populate("rooms");

//     res.json(hostels);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error });
//   }
// };

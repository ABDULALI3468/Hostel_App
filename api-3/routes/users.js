import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/getHostelsByOwner", verifyToken, getHostelsByOwner);

//UPDATE
// router.put("/:id", verifyUser, updateUser);
router.put("/:id", updateUser);

//DELETE
// router.delete("/:id", verifyUser, deleteUser);
router.delete("/:id", deleteUser);

//GET
// router.get("/:id", verifyUser, getUser);
router.get("/:id", getUser);

//GET ALL
// router.get("/", verifyAdmin, getUsers);
router.get("/", getUsers);

export default router;

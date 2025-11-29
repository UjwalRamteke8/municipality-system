// Public portal announcements
// backend/src/controllers/announcementController.js
import Announcement from "../models/Announcement.js";
import asyncHandler from "express-async-handler";

/**
 * @route POST /api/announcements
 * Admin creates announcement
 */
export const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, body, pinned = false } = req.body;
  const image = req.file ? req.file.path : undefined;

  if (!title || !body)
    return res.status(400).json({ message: "Title and body required." });

  const ann = await Announcement.create({
    title,
    body,
    image,
    pinned,
    author: req.userId,
  });

  res.status(201).json({ announcement: ann });
});

/**
 * @route GET /api/announcements
 * Query: page, limit, pinned
 */
export const listAnnouncements = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.pinned) filter.pinned = req.query.pinned === "true";

  const [total, items] = await Promise.all([
    Announcement.countDocuments(filter),
    Announcement.find(filter)
      .sort({ pinned: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name"),
  ]);

  res.json({ page, totalPages: Math.ceil(total / limit), total, items });
});

/**
 * @route GET /api/announcements/:id
 */
export const getAnnouncement = asyncHandler(async (req, res) => {
  const ann = await Announcement.findById(req.params.id).populate(
    "author",
    "name email"
  );
  if (!ann) return res.status(404).json({ message: "Announcement not found." });
  res.json({ announcement: ann });
});

import express from "express";
import { Application, statuses } from "../models/Application.js";

const router = express.Router();

function buildQuery({ status, search }) {
  const query = {};

  if (status && status !== "All") {
    query.status = status;
  }

  if (search) {
    const value = new RegExp(search.trim(), "i");
    query.$or = [{ company: value }, { role: value }, { notes: value }];
  }

  return query;
}

router.get("/", async (req, res, next) => {
  try {
    const applications = await Application.find(buildQuery(req.query)).sort({
      createdAt: -1
    });

    res.json({ applications, statuses });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;

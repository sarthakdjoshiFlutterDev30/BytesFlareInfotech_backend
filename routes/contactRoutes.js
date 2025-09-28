import express from "express";
import Contact from "../models/Contact.js";
import Joi from "joi";

const router = express.Router();

// Joi Validation Schema
const contactValidator = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  projectType: Joi.string().required(),
  budget: Joi.string().required(),
  message: Joi.string().max(500).required(),
});

// @desc Create a new contact
router.post("/", async (req, res) => {
  try {
    const { error } = contactValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().select("-__v"); // hide __v field
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select("-__v");
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update contact
router.put("/:id", async (req, res) => {
  try {
    const { error } = contactValidator.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-__v");

    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

const Visit = require('../models/Visit');

// Create a new visit
const createVisit = async (req, res) => {
    try {
        const { name, email, phone, date, time } = req.body;

        if (!name || !phone || !date || !time) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const visit = new Visit({ name, email, phone, date, time });
        await visit.save();

        res.status(201).json({ message: "Visit scheduled successfully", visit });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all visits
const getAllVisits = async (req, res) => {
    try {
        const visits = await Visit.find().sort({ createdAt: -1 });
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createVisit,
    getAllVisits
};

const Pin = require('../models/Pin');

const getPins = async (req, res) => {
    try {
        const pins = await Pin.findAll({ order: [['createdAt', 'DESC']] });
        res.json(pins);
    } catch (error) {
        console.error('Error fetching pins:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addPin = async (req, res) => {
    const { city, lat, lon } = req.body;

    if (!city) {
        return res.status(400).json({ message: 'City name is required' });
    }

    try {
        // Check if already pinned
        const existing = await Pin.findOne({ where: { city } });
        if (existing) {
            return res.status(400).json({ message: 'City already pinned' });
        }

        const newPin = await Pin.create({ city, lat, lon });
        res.status(201).json(newPin);
    } catch (error) {
        console.error('Error adding pin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deletePin = async (req, res) => {
    const { id } = req.params;

    try {
        const pin = await Pin.findByPk(id);
        if (!pin) {
            return res.status(404).json({ message: 'Pin not found' });
        }

        await pin.destroy();
        res.json({ message: 'Pin removed' });
    } catch (error) {
        console.error('Error deleting pin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPins, addPin, deletePin };

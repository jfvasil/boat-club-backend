const express = require('express')
const Recap = require('../models/meetingRecapsModel')

// Get all recaps
exports.getAllRecaps = async (req, res) => {
  try {
    const recaps = await Recap.find();
    res.json(recaps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recaps' });
  }
}

// Get a single Recap
exports.getRecapByID = async (req, res) => {
  try {
    const recap = await Recap.findById(req.params.id)
    if (!recap) {
      return res.status(404).json({ error: 'Recap not found' })
    }
    res.json(recap)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recap' })
  }
}

// Create
exports.createRecap = async (req, res) => {
  try {
    const { title, date, content } = req.body
    const newRecap = new Recap({
      title,
      date,
      content,
    })
    const savedRecap = await newRecap.save()
    res.status(201).json(savedRecap)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recap' })
  }
}

// Update 
exports.updateRecap = async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const updatedRecap = await Recap.findByIdAndUpdate(
      req.params.id,
      { title, date, content },
      { new: true }
    )
    if (!updatedRecap) {
      return res.status(404).json({ error: 'Recap not found' })
    }
    res.json(updatedRecap);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recap' })
  }
}
//Delete
exports.deleteRecap = async (req, res) => {
  try {
    const deletedRecap = await Recap.findByIdAndDelete(req.params.id)
    if (!deletedRecap) {
      return res.status(404).json({ error: 'Recap not found' })
    }
    res.json({ message: 'Recap deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recap' })
  }
}



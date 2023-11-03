const express = require('express')
const News = require('../models/newsAndUpdatesModel')

// Get all News
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find()
    res.json(news)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news and updates' })
  }
}

// Get a single News post
exports.getNewsByID = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News or Update not found' })
    }
    res.json(news)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch News or Update' })
  }
}

// Create
exports.createNews = async (req, res) => {
  try {
    const { title,date, content } = req.body
    const newNews = new News({
      title,
      date,
      content
    })
    const savedNews = await newNews.save()
    res.status(201).json(savedNews)
  } catch (error) {
    res.status(500).json({ error: 'Failed to post' })
  }
}

// Update 
exports.updateNews = async (req, res) => {
  try {
    const { title,content } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    )
    if (!updatedNews) {
      return res.status(404).json({ error: 'News not found' })
    }
    res.json(updatedRecap)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' })
  }
}
//Delete
exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id)
    if (!deletedNews) {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' })
  }
}
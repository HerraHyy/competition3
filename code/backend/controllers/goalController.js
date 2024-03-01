const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.find({ user: userId });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get goals' });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  try {
    const { text, dueDate, priority } = req.body;
    const userId = req.user.id;

    if (!text || !dueDate || !priority) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const goal = await Goal.create({ text, dueDate, priority, user: userId });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to set goal' });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  try {
    const { text, dueDate, priority } = req.body;
    const userId = req.user.id;   

    if (!text || !dueDate || !priority || !userId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const Goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { text, dueDate, priority },
      { new: true }
    );

    res.status(200).json({ message: 'Goal updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const goalId = req.params.id;

    if (!userId || !goalId) {
      return res.status(400).json({ error: 'Please provide user id and goal id' });
    }

    const deletedGoal = await Goal.findOneAndDelete({ _id: goalId, user: userId });

    if (!deletedGoal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
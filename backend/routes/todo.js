const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Lấy danh sách todos của user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
});

// Thêm todo
router.post('/', auth, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ msg: 'Tiêu đề là bắt buộc' });

  try {
    const todo = new Todo({
      title,
      userId: req.user.id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
});

// Cập nhật trạng thái todo (hoàn thành/chưa hoàn thành)
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ msg: 'Không tìm thấy todo' });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
});

// Xóa todo
router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ msg: 'Không tìm thấy todo' });

    res.json({ msg: 'Đã xóa todo thành công' });
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
});

// Admin: Lấy tất cả todos (authorization)
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Chỉ admin mới có quyền truy cập' });

  try {
    const todos = await Todo.find().populate('userId', 'username');
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Lỗi server', error: err.message });
  }
});

module.exports = router;
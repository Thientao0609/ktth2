const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// "Database" tạm bằng mảng
const users = [];
let currentId = 1;

const token = 'mocked-jwt-token';

// Đăng ký user mới
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  // Kiểm tra trùng username hoặc email
  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const newUser = { id: currentId++, username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', userId: newUser.id });
});

// Đăng nhập, trả token nếu đúng username/password
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }
  res.json({ token });
});

// Middleware kiểm tra token
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${token}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

// Lấy danh sách user (không trả mật khẩu)
app.get('/api/users', authMiddleware, (req, res) => {
  const usersSafe = users.map(({ password, ...rest }) => rest);
  res.json(usersSafe);
});

// Lấy user theo id (không trả mật khẩu)
app.get('/api/users/:id', authMiddleware, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { password, ...userSafe } = user;
  res.json(userSafe);
});

app.listen(PORT, () => {
  console.log(`✅ Mock API server running at http://localhost:${PORT}`);
});

const axios = require('axios');
const XLSX = require('xlsx');

// Đường dẫn file Excel
const filePath = './user_register_50_sample.xlsx';

// Load file Excel
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Chuyển sheet sang JSON
const users = XLSX.utils.sheet_to_json(worksheet);

// Hàm gửi POST request đăng ký user
async function registerUser(user) {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
    console.log(`Đăng ký thành công user: ${user.username}`, response.data);
  } catch (error) {
    if (error.response) {
      console.error(`Lỗi đăng ký user: ${user.username}`, error.response.data);
    } else {
      console.error(`Lỗi mạng hoặc khác với user: ${user.username}`, error.message);
    }
  }
}

// Gửi lần lượt từng user trong file Excel
async function run() {
  for (const user of users) {
    await registerUser(user);
  }
}

run();

const express = require('express');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

const upload = require('../middleware/upload'); // adjust path if needed

// Create an express app with a test route using multer upload middleware
const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(200).json({ filename: req.file.filename });
});

describe('Upload Middleware', () => {
  afterAll(() => {
    // Clean up uploaded files after tests (optional)
    const uploadDir = path.join(__dirname, '../uploads');
    fs.readdir(uploadDir, (err, files) => {
      if (files && files.length) {
        for (const file of files) {
          fs.unlinkSync(path.join(uploadDir, file));
        }
      }
    });
  });

  test('should upload a file successfully', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('file', path.join(__dirname, 'testfile.txt')); // Make sure testfile.txt exists in test folder

    expect(res.statusCode).toBe(200);
    expect(res.body.filename).toMatch(/^file-\d+-\d+\.txt$/);
  });

  test('should return 400 if no file uploaded', async () => {
    const res = await request(app)
      .post('/upload');

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No file uploaded');
  });
});

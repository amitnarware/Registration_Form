const User = require("../../models/user");
const express = require("express");
const bodyParser = require('body-parser');
const multer = require("multer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname); // File naming convention
  },
});

const upload = multer({ storage: storage });

exports.register = [
  upload.single('profilePicture'), // Multer middleware to handle file upload
  async (req, res) => {
    try {
      const { firstName, lastName, gender, email, password, city, state, zip, country, areaOfInterest } = req.body;

      // Validate input fields
      if (!firstName || !lastName || !gender || !email || !password || !city || !state || !zip || !country || !areaOfInterest) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Handle profile picture upload
      if (req.file) {
        console.log(req.file); // Log the uploaded file

        try {
          // Check if email is already registered
          const existingUser = await User.findOne({ where: { email } });
          if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
          }

          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Save user to database
          await User.create({ firstName, lastName, gender, email, password: hashedPassword, city, state, zip, country, areaOfInterest, profilePicture: req.file.filename });

          return res.status(200).json({ message: 'Registration successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      } else {
        return res.status(400).json({ error: 'Profile picture is required' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Generate unique token
    const token = uuidv4();

    // Update user with token and expiration date
    await user.update({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 });

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail.com',
      auth: {
        user: 'amitnarware40@gmail.com',
        pass: 'joaa ofdf liub youb'
      }
    });

    const mailOptions = {
      from: 'amitnarware40@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click on the following link to reset your password: http://localhost:3000/reset/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ message: 'Password reset link sent' });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }
      }
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset token
    await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


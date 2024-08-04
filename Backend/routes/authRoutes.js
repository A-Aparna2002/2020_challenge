const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

async function mailer(recieveremail, code) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: process.env.NodeMailer_email, // generated ethereal user
            pass: process.env.NodeMailer_password, // generated ethereal password
        },
    });


    let info = await transporter.sendMail({
        from: "2020_challenge",
        to: `${recieveremail}`,
        subject: "Email Verification",
        text: `Your Verification Code is ${code}`,
        html: `<b>Your Verification Code is ${code}</b>`,
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.post('/enterEmail', (req, res) => {
    console.log('sent by client', req.body);
    const { email } = req.body;

    if (!email) {
        return res.status(422).json({ error: "Please enter an email" });
    }

    User.findOne({ email: email }).then(async (savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User Exists" });
        }
        try {
            let VerificationCode = Math.floor(100000 + Math.random() * 900000);
            await mailer(email, VerificationCode);
            console.log("Verification Code", VerificationCode);
            res.send({ message: "Verification Code Sent to your Email", VerificationCode, email });
        } catch (err) {
            console.log(err);
        }
    })
})

router.post('/enterUsername', (req, res) => {
    const { username, email } = req.body;
    User.find({ username }).then(async (savedUser) => {
        if (savedUser.length > 0) {
            return res.status(422).json({ error: "Username already exists" });
        } else {
            return res.status(200).json({ message: "Username Available", username, email });
        }
    })
})

router.post('/enterPassword', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(422).json({ error: "Please enter all the fields" });
    } else {
        const user = new User({
            username,
            email,
            password,
        })
        try {
            await user.save();
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "User Registered Successfully", token });

        } catch (err) {
            console.log(err);
            return res.status(422).json({ error: "User Not Registered" });
        }
    }
})

router.post('/fpEnterEmaiL', (req, res) => {
    console.log('sent by client', req.body);
    const { email } = req.body;

    if (!email) {
        return res.status(422).json({ error: "Please enter an email" });
    }

    User.findOne({ email: email }).then(async (savedUser) => {
        if (savedUser) {
            try {
                let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                await mailer(email, VerificationCode);
                console.log("Verification Code", VerificationCode);
                res.send({ message: "Verification Code Sent to your Email", VerificationCode, email });
            }
            catch (err) {
                console.log(err);
            }
        } else {
            return res.status(422).json({ error: "Invalid Credentials" });
        }
    })
})

router.post('/fpEnterPassword', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    else {
        User.findOne({ email: email })
            .then(async (savedUser) => {
                if (savedUser) {
                    savedUser.password = password;
                    savedUser.save()
                        .then(user => {
                            res.json({ message: "Password Changed Successfully" });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    return res.status(422).json({ error: "Invalid Credentials" });
                }
            }
        )
    }

})

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    } else {
        User.findOne({ email: email })
            .then(savedUser => {
                if (!savedUser) {
                    return res.status(422).json({ error: "Invalid Credentials" });
                } else {
                    console.log(savedUser);
                    bcrypt.compare(password, savedUser.password).then(
                        doMatch => {
                            if (doMatch) {
                                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                                const { _id, username, email } = savedUser;
                                res.json({ message: "SignIn Successful", token, user: { _id, username, email } });
                            } else {
                                return res.status(422).json({ error: "Invalid Credentials" });
                            }
                        }
                    )
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

router.post('/userData', (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in, token not given" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in, token invalid" });
        }
        const { _id } = payload;
        User.findById(_id).then(userData => {
            res.status(200).send({
                message: "User Found",
                user: userData
            });
        })
    })
})

router.post('/changePassword', (req, res) => {
    const { oldPassword, newPassword, email } = req.body;

    if (!oldPassword || !newPassword || !email) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    else {
        User.findOne({ email: email })
            .then(async savedUser => {
                if (savedUser) {
                    bcrypt.compare(oldPassword, savedUser.password)
                        .then(doMatch => {
                            if (doMatch) {
                                savedUser.password = newPassword;
                                savedUser.save()
                                    .then(user => {
                                        res.json({ message: "Password Changed Successfully" });
                                    })
                                    .catch(err => {
                                        // console.log(err);
                                        return res.status(422).json({ error: "Server Error" });

                                    })
                            }
                            else {
                                return res.status(422).json({ error: "Invalid Credentials" });
                            }
                        })

                }
                else {
                    return res.status(422).json({ error: "Invalid Credentials" });
                }
            })
    }
})

router.post('/setUsername', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    User.find({ username }).then(async (savedUser) => {
        if (savedUser.length > 0) {
            return res.status(422).json({ error: "Username already exists" });
        }
        else {
            User.findOne({ email: email }).then(async savedUser => {
                if (savedUser) {
                    savedUser.username = username;
                    savedUser.save()
                        .then(user => {
                            res.json({ message: "Username Updated Successfully" });
                        })
                        .catch(err => {
                            return res.status(422).json({ error: "Server Error" });
                        })
                }
                else {
                    return res.status(422).json({ error: "Invalid Credentials" });
                }
            })
        }
    })
})

router.post('/setDescription', (req, res) => {
    const { description, email } = req.body;
    if (!description || !email) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    User.findOne({ email: email })
        .then(async savedUser => {
            if (savedUser) {
                savedUser.description = description;
                savedUser.save()
                    .then(user => {
                        res.json({ message: "Description Updated Successfully" });
                    })
                    .catch(err => {
                        return res.status(422).json({ error: "Server Error" });
                    })
            }
            else {
                return res.status(422).json({ error: "Invalid Credentials" });
            }
        })
})

router.post('/searchUser', (req, res) => {
    const { keyword } = req.body;

    if (!keyword) {
        return res.status(422).json({ error: "Please search a username" });
    }

    User.find({ username: { $regex: keyword, $options: 'i' } })
        .then(user => {
            let data = [];
            user.map(item => {
                data.push(
                    {
                        _id: item._id,
                        username: item.username,
                        email: item.email,
                        description: item.description,
                        profilePic: item.profilePic
                    }
                )
            })

            if (data.length == 0) {
                return res.status(422).json({ error: "No User Found" });
            }
            res.status(200).send({ message: "User Found", user: data });

        })
        .catch(err => {
            res.status(422).json({ error: "Server Error" });
        })
})

router.post('/otherUserData', authenticateUser, (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email must be provided" });
    }

    User.findOne({ email })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json({
                message: "User Found",
                user: userData
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        });
});



module.exports = router;
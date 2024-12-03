require('dotenv').config()
const ejs = require("ejs")
const jwt = require('jsonwebtoken');
const path = require("node:path");
const crypt = require("crypto");
const multer = require("multer");
const uploadPath = path.join(__dirname, "../public/documents");
const express = require("express")
const { oauth2client } = require("../service/googleConfig");
const { UserModel } = require("../model/user.model");
const { transporter } = require('../service/transporter');
const { UserAuthentication } = require('../middleware/Authentication');
const { DocumentModel } = require('../model/document.model');
const userRouter = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        let uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

const hash = {
    sha256: (data) => {
        return crypt.createHash("sha256").update(data).digest("hex");
    },
    sha512: (data) => {
        return crypt.createHash("sha512").update(data).digest("hex");
    },
    md5: (data) => {
        return crypt.createHash("md5").update(data).digest("hex");
    },
};


// Regular User Login 

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = await UserModel.find({ email })
        if (userExists.length === 0) {
            return res.json({ status: "error", message: "No User Exists With This Email ID", redirect: "/user/register" })
        } else {
            if (hash.sha256(password) === userExists[0].password) {
                if (userExists[0].accounttype !== "admin") {
                    let token = jwt.sign({
                        _id: userExists[0]._id, name: userExists[0].name, email: userExists[0].email, accountType: userExists[0].accountType, exp: Math.floor(Date.now() / 1000) + (7 * 60 * 60)
                    }, "Authentication")
                    res.json({ status: "success", message: "Login Successful", token: token })
                } else {
                    res.json({ status: "error", message: "You Can Not Use Admin Credentials To Login !!" })
                }
            } else if (hash.sha256(password) !== userExists[0].password) {
                res.json({ status: "error", message: "Wrong Password Please Try Again" })
            }
        }
    } catch (error) {
        res.json({ status: "error", message: `Error Found in Login ${error.message}` })
    }
})

userRouter.post("/login/admin", async (req, res) => {
    try {
        const { phoneno, password } = req.body
        const userExists = await UserModel.find({ phoneno })
        if (userExists[0].disabled === "true") {
            res.json({ status: "error", message: "Your Account has been Temporarily disabled" })
        }
        if (userExists.length === 0) {
            return res.json({ status: "error", message: "No Admin User Exists Please Contact Your Developer" })
        } else {
            if (userExists[0].accounttype !== "admin" && userExists[0].accounttype !== "conductor" && userExists[0].accounttype !== "driver") {
                res.json({ status: "error", message: "Please Leave This Site You Don't Have Required Access " })
            } else if (hash.sha256(password) === userExists[0].password) {
                let token = jwt.sign({
                    _id: userExists[0]._id, name: userExists[0].name, email: userExists[0].email, accounttype: userExists[0].accounttype, phoneno: userExists[0].phoneno, exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, "Authorization")
                res.json({ status: "success", message: "Login Successful", token: token })
            } else if (hash.sha256(password) != userExists[0].password) {
                res.json({ status: "error", message: "Wrong Password Please Try Again" })
            }
        }
    } catch (error) {
        res.json({ status: "error", message: `Error Found in Admin Login ${error.message}` })
    }
})

// User Registration Step 1 Basic Detail's Registration

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await UserModel.find({ email })
        if (userExists.length >= 1) {
            res.json({ status: "error", message: "User Already Exists with this Email ID. Please Try again with another Email ID", redirect: "/user/login" })
        } else {
            const user = new UserModel({
                name,
                email,
                password: hash.sha256(password),
            })
            try {
                await user.save()
                res.json({ status: "success", message: "Registration Successful", redirect: "/user/login" })
            } catch (error) {
                res.json({ status: "error", message: `Failed To Register User ${error.message}` })
            }
        }
    } catch (error) {
        res.json({ status: "error", message: `Error Found in User Registration ${error}` })
    }
})

// Forgot Password Step 1 Sending Otp in Email

userRouter.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body
        const userExists = await UserModel.find({ email })
        if (userExists.length === 0) {
            return res.json({ status: "error", message: "No User Exists With This Email, Please SignUp First", redirect: "/user/register" })
        } else {
            let newotp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            let forgotpasswordtoken = jwt.sign({ name: userExists[0].name, email: userExists[0].email, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, "Registration");
            let link = `${process.env.domainurl}${newotp}/${forgotpasswordtoken}`
            userExists[0].otp = newotp;
            userExists[0].forgotpasswordtoken = forgotpasswordtoken
            try {
                await userExists[0].save()
            } catch (error) {
                return res.json({ status: "error", message: "Failed To Save Use", redirect: "/" })
            }
            let forgotPasswordtemplate = path.join(__dirname, "../emailtemplate/forgotPassword.ejs")
            ejs.renderFile(forgotPasswordtemplate, { link: link }, function (err, template) {
                if (err) {
                    res.json({ status: "error", message: err.message })
                } else {
                    const mailOptions = {
                        from: process.env.emailuser,
                        to: `${userExists[0].email}`,
                        subject: 'Otp To Reset Password ',
                        html: template
                    }
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return res.json({ status: "error", message: 'Failed to send email', redirect: "/" });
                        } else {
                            return res.json({ status: "success", message: 'Please Check Your Email', redirect: "/" });
                        }
                    })
                }
            })

        }
    }
    catch (error) {
        res.json({ status: "error", message: `Error Found in Forgot Password ${error.message}` })
    }
})

// Module to Send Otp on Email

userRouter.post("/forgot/phone", async (req, res) => {
    try {
        const { phoneno } = req.body
        const userExists = await UserModel.find({ phoneno })
        if (userExists.length === 0) {
            return res.json({ status: "error", message: "No User Exists Please SignUp First", redirect: "/user/register" })
        } else {
            let newotp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            let forgotpasswordtoken = jwt.sign({ name: userExists[0].name, email: userExists[0].email, phoneno: userExists[0].phoneno, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, "Registration");
            userExists[0].otp = newotp;
            userExists[0].forgotpasswordtoken = forgotpasswordtoken
            try {
                await userExists[0].save()
            } catch (error) {
                return res.json({ status: "error", message: "Failed To Save User New OTP", redirect: "/" })
            }
            let forgotPasswordtemplate = path.join(__dirname, "../emailtemplate/forgotPasswordmobile.ejs")
            ejs.renderFile(forgotPasswordtemplate, { otp: newotp }, function (err, template) {
                if (err) {
                    res.json({ status: "error", message: err.message })
                } else {
                    const mailOptions = {
                        from: process.env.emailuser,
                        to: `${userExists[0].email}`,
                        subject: 'Otp To Reset Password.',
                        html: template
                    }
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return res.json({ status: "error", message: 'Failed to send email', redirect: "/" });
                        } else {
                            return res.json({ status: "success", message: 'Please Check Your Email', redirect: "/", token: forgotpasswordtoken });
                        }
                    })
                }
            })

        }
    }
    catch (error) {
        res.json({ status: "error", message: `Error Found in Login Section ${error.message}` })
    }
})

// Getting Basic User Detail's Like username, email & more which is passed via token

userRouter.get("/me", UserAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
        if (!token) {
            return res.json({ status: "error", message: "Please Login to Access User Detail's", redirect: "/user/login" })
        } else {
            const decoded = jwt.verify(token, 'Authentication')
            const user = await UserModel.find({ _id: decoded._id })
            return res.json({ status: "success", message: "Getting User Details", user: user[0] })
        }
    } catch (error) {
        res.json({ status: "error", message: `Error Found in Login Section ${error.message}` })
    }
})

// Updating User Detail's in the Database.

userRouter.patch("/me/update", UserAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, 'Authentication')
    const updateData = req.body
    try {
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: decoded._id }, updateData)
        return res.json({ status: "success", message: "User Details Updated" })
    } catch (error) {
        res.json({ status: "error", message: `Failed To Update User Detail's  ${error.message}` })
    }
})


// Step 1 Uploading Documents For Account Verifications :- 

userRouter.post("/documentupload", upload.single("document"), UserAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const { accountType, documentType } = req.body;
    const fileName = req.file.filename;

    const decoded = jwt.verify(token, 'Authentication')
    const user = await UserModel.find({ _id: decoded._id })
    try {
        user[0].accountType = accountType;
        await user[0].save()
    } catch (error) {
        res.json({ status: "error", message: `Error Found while trying to upload Documents ${error.message}` })
    }

    const documentDetails = new DocumentModel({
        documentType: documentType,
        document: fileName,
        userId: decoded._id
    })

    try {
        await documentDetails.save()
        return res.json({ status: "success", message: "Documents Successfully Uploaded Kindly Wait Till we verify the documents." })
    } catch (error) {
        res.json({ status: "error", message: `Error Found while trying to upload Documents ${error.message}` })
    }

})



// Register With Google 

userRouter.get("/register/google", async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const googleresponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const result = await googleresponse.json()
        const { email, name, picture } = result;
        let user = await UserModel.findOne({ email });
        console.log("USer google login ", user);

        if (!user) {
            user = new UserModel({ name, email, picture, verified: { email: true } });
            await user.save()
            let token = jwt.sign({ name: user.name, email: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, "Authentication")
            return res.json({ status: "success", message: "Registration Successful", token: token })
        } else {
            let token = jwt.sign({ name: user.name, email: user.email, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, "Authentication")
            return res.json({ status: "success", message: "Login Successful", token: token })
        }
    } catch (error) {
        return res.json({ status: "error", message: `Error Found in User Registration ${error}` })
    }
})


module.exports = { userRouter }
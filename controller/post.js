const express = require("express");
const multer = require("multer");
const path = require("node:path");
const fs = require('fs');
const jwt = require("jsonwebtoken");
const { ArtistAuthentication } = require("../middleware/Authentication");
const { PostModel } = require("../model/post.model");
const { CommentModel } = require("../model/comment.model");
const PostRouter = express.Router();
const uploadPath = path.join(__dirname, "../public/post");

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

PostRouter.post("/add", upload.single("media"), ArtistAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "Authentication");
    const fileName = req.file.filename;
    const { description, } = req.body;
    const post = new PostModel({
        media: fileName,
        description: description,
        createdBy: decoded._id,
    });
    try {
        await post.save();
        res.json({
            status: "success",
            message: `Post Created Successfully`,
        });
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Add  ${error.message}`,
        });
    }
}
);

PostRouter.get("/listall", ArtistAuthentication, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "Authentication");
    try {
        const result = await PostModel.find({ createdBy: decoded._id });
        if (result.length == 0) {
            res.json({
                status: "error",
                message: "No Post Created By User",
            });
        } else {
            res.json({
                status: "success",
                data: result,
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Get Post Detail's ${error.message}`,
        });
    }
}
);

PostRouter.get("/details/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.find({ _id: id });
        const comment = await CommentModel.find({ postId: id });
        const result = {
            post: post,
            comment: comment
        }
        if (result.length == 0) {
            res.json({
                status: "error",
                message: "No Post Created By User",
            });
        } else {
            res.json({
                status: "success",
                data: result
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Get Details Of A Particular Event ${error.message}`,
        });
    }
}
);


PostRouter.post("/edit/:id", upload.single("media"), async (req, res) => {
    const { id } = req.params;
    try {
        const post = await PostModel.find({ _id: id });
        if (post.length == 0) {
            res.json({
                status: "error",
                message: "No Post Created By User",
            });
        } else {
            fs.unlink(`${uploadPath}/${post[0].media}`, (err) => {
                if (err) {
                    console.error('Error deleting old file:', err);
                } else {
                    console.log('Old file deleted successfully');
                }
            });
            post[0].description = req.body.description;
            post[0].media = req.file.filename;
            await post[0].save();
            res.json({
                status: "success",
                data: "Post Updated Successfully",
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Update Event Details ${error.message}`,
        });
    }
}
);



module.exports = { PostRouter };

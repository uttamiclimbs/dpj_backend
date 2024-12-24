const express = require("express");
const multer = require("multer");
const path = require("node:path");
const fs = require('fs');
const jwt = require("jsonwebtoken");
const { ArtistAuthentication } = require("../middleware/Authentication");
const { PostModel } = require("../model/post.model");
const { CommentModel } = require("../model/comment.model");
const { AdminAuthentication } = require("../middleware/Authorization");
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

// Api's For Post 

// Api To Add New Post
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

// Api To Get All Post List Created By User
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

// Api To Get All Detail Of A Particular Post Created By User

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

// Api To Edit Detail's Of A Particular Post Created By User

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

// Api To Get All Post List Created By All The USER

PostRouter.get("/listall/admin", AdminAuthentication, async (req, res) => {
    try {
        const result = await PostModel.find({}).sort({ createdAt: -1 });
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


// Api's For Comment 

// Api To Add New Comment In a Particular Post

PostRouter.post("/add/comment/:id",ArtistAuthentication, async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "Authentication");
    const { description } = req.body;
    const comment = new CommentModel({
        commentedBy: decoded._id,
        description: description,
        postId: id,
    });
    try {
        await comment.save();
        res.json({
            status: "success",
            message: `Added Comment Successfully`,
        });
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Add New Comment ${error.message}`,
        });
    }
}
);

// Api To Edit A particular Comment

PostRouter.post("/edit/comment/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const comment = CommentModel.find({ _id: id });
    if (comment.length == 0) {
        res.json({
            status: "error",
            message: "No Comment Found",
        });
    } else {
        comment[0].description = description;
        await comment[0].save();
        res.json({
            status: "success",
            message: `Comment Updated Successfully`,
        });
    }
}
);

// Api To Get List Of All Comment in An Post

PostRouter.get("/list/comments/;id", async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentModel.find({ postId: id })
        if (comment.length == 0) {
            res.json({
                status: "error",
                message: "No Comment Found",
            });
        } else {
            res.json({
                status: "success",
                data: comment,
            });
        }
    } catch (error) {
        res.json({
            status: "error",
            message: `Failed To Add New Comment ${error.message}`,
        });
    }
}
);



// Api's For Bookmark



// Api's For Like






module.exports = { PostRouter };

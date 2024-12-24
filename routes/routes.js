const router = require("express").Router();
const { CollabRouter } = require("../controller/collaboration");
const { jobRouter } = require("../controller/job");
const { PostRouter } = require("../controller/post");
const { userRouter } = require("../controller/user");

router
    .use("/user", userRouter)
    .use("/job", jobRouter)
    .use("/collaborator", CollabRouter)
    .use("/post", PostRouter)


module.exports = router;
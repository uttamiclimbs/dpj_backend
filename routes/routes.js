const router = require("express").Router();
const { jobRouter } = require("../controller/job");
const { userRouter } = require("../controller/user");

router
    .use("/user", userRouter)
    .use("/job", jobRouter)


module.exports = router;
const express = require("express");
const multer = require("multer");
const { EventModel } = require("../model/event.model");
const { ArtistAuthentication } = require("../middleware/Authentication");
const { CollabModel } = require("../model/collaboration.model");
const CollabRouter = express.Router();

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

CollabRouter.post("/add", ArtistAuthentication, upload.single("banner"), async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'Authentication');
    const fileName = req.file.filename;
    const { title, description, category, banner, startDate, endDate, startTime, endTime, collaborators } = req.body
    let savedDocument;
    const collaboration = new EventModel({
        title, description, category, banner: fileName, startDate, endDate, startTime, endTime, eventType: "Collaboration", createdBy: decoded._id
    })
    try {
        savedDocument = await collaboration.save()
    } catch (error) {
        res.json({ status: 'error', message: `Failed To Add New Event ${error.message}` })
    }

    let addCollaborators = [];

    for (let index = 0; index < collaborators.length; index++) {
        addCollaborators.push({
            userId: collaborators[index].userId,
            email: collaborators[index].email,
            name: collaborators[index].name,
            amount: collaborators[index].amount,
            eventId: savedDocument._id
        })
    }

    try {
        const result = await CollabModel.insertMany(seatdetails);
    } catch (error) {
        res.json({ status: 'error', message: `Failed To Add New Event ${error.message}` })
    }
    res.json({ status: "success", message: `Collaboration Created Successfully` })
})

CollabRouter.post("/edit/basic/:id", ArtistAuthentication, upload.single("banner"), async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const {title, description, category, banner, startDate, endDate, startTime, endTime } = req.body
    const decoded = jwt.verify(token, 'Authentication');
    const fileName = req.file.filename;
    try {
        const details = await EventModel.find({ _id: id })
        details[0].title = title;
        details[0].description = description;
        details[0].category = category;
        details[0].startDate = startDate;
        details[0].endDate = endDate;
        details[0].startTime = startTime;
        details[0].endTime = endTime;
        details[0].banner = fileName;

        await details[0].save()
        res.json({ status: 'status', message: `Event Successfully Updatec` })
    } catch (error) {
        res.json({ status: 'error', message: `Failed To Add New Event ${error.message}` })
    }
})


CollabRouter.post("/edit/collaborators/:id", ArtistAuthentication, async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const {collaborators } = req.body
    const decoded = jwt.verify(token, 'Authentication');
    const fileName = req.file.filename;
    try {
        const details = await EventModel.find({ eventId: id })
        res.json({ status: 'status', message: `Event Successfully Updatec` })
    } catch (error) {
        res.json({ status: 'error', message: `Failed To Add New Event ${error.message}` })
    }
})



module.exports = { CollabRouter }
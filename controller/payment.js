require('dotenv').config()
const express = require("express")
const { SeatModel } = require("../model/seat.model")
const { TripModel } = require("../model/trip.model");
const { PaymentModel } = require('../model/payment.model');
const { UserModel } = require('../model/user.model');
const ejs = require("ejs")
const path = require('node:path');
const { transporter } = require('../service/transporter');
const { BookingModel } = require('../model/booking.model');
const PaymentRouter = express.Router()

PaymentRouter.get("/success/:pnr", async (req, res) => {
    const { pnr } = req.params
    const filter = { pnr: pnr };
    const update = {
        $set: { isBooked: true, expireAt: null, "details.status": "Confirmed" }
    } // set status field
    // Step 1 Getting The list of all the seat's with this PNR & Updating their status
    try {
        const seat = await SeatModel.updateMany(filter, update);
    } catch (error) {
        res.json({ status: "error", message: `Failed To Update Seat Status ${error.message}` })
    }
    // Step 2 Finding the payment status of the PNR & Updating their Status
    const paymentdetails = await PaymentModel.find({ pnr: pnr })
    paymentdetails[0].paymentstatus = "Confirmed"
    try {
        await paymentdetails[0].save()
    } catch (error) {
        res.json({ status: "error", message: `Failed To Update Payment  Status ${error.message}` })
    }
    const seatdetails = await SeatModel.find({ pnr: pnr, expireAt: null, isBooked: true, isLocked: true, "details.status": "Confirmed" })
    // console.log("seatdetails ", seatdetails);

    // bookedseat contain the list of all the Seats booked with this pnr
    let bookedseats = []

    for (let index = 0; index < seatdetails.length; index++) {
        bookedseats.push(seatdetails[index].seatNumber)
    }

    // Getting User Detail's 
    let userid = seatdetails[0].bookedby;
    // Getting Trip Detail's
    let tripid = seatdetails[0].tripId;

    const userdetails = await UserModel.find({ _id: userid })
    const tripdetails = await TripModel.find({ _id: tripid })
    // Storing the Existing List of Seats which are booked
    let newbookedseats = bookedseats.concat(tripdetails[0].seatsbooked)

    try {
        tripdetails[0].seatsbooked = newbookedseats;
        tripdetails[0].bookedseats = newbookedseats.length;
        tripdetails[0].availableseats = tripdetails[0].totalseats - newbookedseats.length
        await tripdetails[0].save()
    } catch (error) {
        res.json({ status: "error", message: `Failed To Update Trip Booked Seat Details ${error.message}` })
    }

    // Working On Booking Model's 

    const BookingDetails = new BookingModel({
        name: tripdetails[0].name,
        from: tripdetails[0].from,
        to: tripdetails[0].to, 
        journeystartdate: tripdetails[0].journeystartdate,
        journeyenddate: tripdetails[0].journeyenddate, 
        busid: tripdetails[0].busid,
        starttime: tripdetails[0].starttime, 
        endtime: tripdetails[0].endtime, 
        totaltime: tripdetails[0].totaltime, 
        distance: tripdetails[0].distance, 
        pnr, 
        seats: bookedseats, 
        userid: userdetails[0]._id, 
        tripId: tripdetails[0]._id
    })
    const bookingExists = await BookingModel.find({ pnr: pnr, userid: userdetails[0]._id, tripId: tripdetails[0]._id })
    if (bookingExists.length === 0) {
        try {
            await BookingDetails.save()
        } catch (error) {
            res.json({ status: "error", message: `Failed To Save Booking Detail's ${error.message}` })
        }
    }

    let confirmpayment = path.join(__dirname, "../emailtemplate/confirmpayment.ejs")
    ejs.renderFile(confirmpayment, { user: userdetails[0], seat: seatdetails, trip: tripdetails[0], payment: paymentdetails[0] }, function (err, template) {
        if (err) {
            res.json({ status: "error", message: err.message })
        } else {
            const mailOptions = {
                from: process.env.emailuser,
                to: `${userdetails[0].email}`,
                subject: `Booking Confirmation on AIRPAX, Bus: ${tripdetails[0].busid}, ${tripdetails[0].journeystartdate}, ${tripdetails[0].from} - ${tripdetails[0].to}`,
                html: template
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error in Sending Mail ", error.message);
                    return res.json({ status: "error", message: 'Failed to send email' });
                } else {
                    console.log("Email Sent ", info);
                    return res.json({ status: "success", message: 'Please Check Your Email', redirect: "/" });
                }
            })
        }
    })
})


PaymentRouter.get("/failure/:pnr", async (req, res) => {
    const { pnr } = req.params
    // const filter = { pnr: pnr, isBooked: false };
    // const lockedseats = await SeatModel.find(filter) // contains list of all the seats which are currently locked with the particula Pnr ID. 
    // let removeseats = [] // list of seat's which need's to be removed whose payment is not yet completed 
    // let tripid = "" // Trip ID this consists the id of the Trip From which the unbooked seats will be Removed
    // for (let index = 0; index < lockedseats.length; index++) {
    //     removeseats.push(lockedseats[index].seatNumber)
    //     tripid = lockedseats[index].tripId
    // }
    // const trip = await TripModel.find({ _id: tripid })
    // const bookedseats = trip[0].seatsbooked.filter(item => !removeseats.includes(item)); // bookedseats will contain the list of those seats whose payment is completed
    // trip[0].seatsbooked = bookedseats
    // trip[0].bookedseats = trip[0].bookedseats - removeseats.length
    // trip[0].availableseats = trip[0].availableseats + removeseats.length
    // await trip[0].save()
    // const seat = await SeatModel.deleteMany(filter);
    const paymentdetails = await PaymentModel.find({ pnr: pnr })
    paymentdetails[0].paymentstatus = "Failed";
    await paymentdetails[0].save()
    res.json({ status: "success", message: "Ticket Booking Failed !!" })
})


module.exports = { PaymentRouter }
const Karaoke = require("../../models/Karaoke");
const User = require("../../models/User");
const router = require("express").Router();
const multer = require('multer');
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

//CREATE
//http://localhost:5000/api/karaoke/
router.post("/", async (req, res) => {
    const newKaraoke = new Karaoke(req.body);

    try {
        const savedKaraoke = await newKaraoke.save();
        res.status(200).json(savedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
//http://localhost:5000/api/Karaoke/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedKaraoke = await Karaoke.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedKaraoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//http://localhost:5000/api/Karaoke/:id
router.delete("/:id", async (req, res) => {
    try {

       let  karaoke= await Karaoke.findByIdAndDelete(req.params.id);

         if(karaoke!==null) {
             let  us= await User.findById(karaoke.idUser);
             console.log(us);
             us.karaoke.splice(us.karaoke.indexOf(req.params.id), 1)

             const updatedUser = await User.findByIdAndUpdate(
                 us._id,
                 {
                     $set: us,
                 },
                 {new: true}
             );
             console.log(updatedUser);
         }
console.log(karaoke);

        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//GET PRODUCT
//http://localhost:5000/api/karaoke/find/:id
router.get("/find/:id", async (req, res) => {
    try {
        const karaoke = await Karaoke.findById(req.params.id);
        res.status(200).json(karaoke);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
//http://localhost:5000/api/Karaoke/
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let karaokes;

        if (qNew) {
            karaokes = await Karaoke.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            karaokes = await Karaoke.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            karaokes = await Karaoke.find();
        }

        res.status(200).json(karaokes);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.post('/upload/:iduser/:score',async (req, res) => {

    router.use(express.static('public'));
    const user = await User.findById(req.params.iduser);

    console.log(user);

    console.log(req.params.iduser);
let kar;
    const newKaraoke = new Karaoke();

    newKaraoke.idUser = req.params.iduser;
    newKaraoke.score = req.params.score;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public')
        },
        filename: (req, file, cb) => {
            const Dd = Date.now();
            newKaraoke.videoLink = Dd + file.originalname;
            newKaraoke.save();
            cb(null, Dd + file.originalname)

        }
    });
user.karaoke.push(newKaraoke);
user.save();
    const upload = multer({storage}).array('file');
setTimeout(()=>{
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }

        return res.status(200).json(newKaraoke)
    })
},5000)
});

router.get("/video/:idKar", async (req, res) => {
    const karaoke = await Karaoke.findById(req.params.idKar);
    const path = 'public/'+karaoke.videoLink;
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range

    const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
    /*if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }*/

});

module.exports = router;

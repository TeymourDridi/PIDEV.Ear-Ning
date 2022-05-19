const router = require("express").Router();
const express = require("express");
const mongoose = require("mongoose");
const Course = require("../../models/Course");
const Beginner = require("../../models/Beginner");
const Medium = require("../../models/Medium");
const Advanced = require("../../models/Advanced");


//CREATE
//http://localhost:5000/api/course/
router.post("/", async (req, res) => {

   console.log(req.body)
    const newCourse = new Course();
if(req.body._id){
    newCourse._id=req.body._id
}
    newCourse.imgLink=req.body.imgLink
    newCourse.name=req.body.name.toLowerCase();
    newCourse.description=req.body.description
    newCourse.prix=req.body.prix


    if(req.body.beginner) {
        req.body.beginner.map(async t => {
            if (!t.videoLink.match("embed")) {
                let vidcode = t.videoLink.substr(32, t.videoLink.length - 32)
                t.videoLink = t.videoLink.substr(0, 24);
                t.videoLink = t.videoLink + "embed/" + vidcode;
            }
            newCourse.beginner.push(await new Beginner(t).save())
        });
    }
    if(req.body.medium) {

        req.body.medium.map(async t => {
            if (!t.videoLink.match("embed")) {
                let vidcode = t.videoLink.substr(32, t.videoLink.length - 32)
                t.videoLink = t.videoLink.substr(0, 24);
                t.videoLink = t.videoLink + "embed/" + vidcode;
            }
            newCourse.medium.push(await new Medium(t).save())
        });
    }
    if(req.body.advanced) {

        req.body.advanced.map(   async t => {
            if (!t.videoLink.match("embed")) {
                let vidcode = t.videoLink.substr(32, t.videoLink.length - 32)
                t.videoLink = t.videoLink.substr(0, 24);
                t.videoLink = t.videoLink + "embed/" + vidcode;
            }
            newCourse.advanced.push(await new Advanced(t).save());
        });
    }


setTimeout(async function () {
    try {
        if(req.body._id) {
            const savedCourse = await Course.findByIdAndUpdate(
                req.body._id,
                {
                    $set: newCourse,
                },
                { new: true }
            );
            res.status(200).json(savedCourse);
        }else{const savedCourse = await newCourse.save();
            res.status(200).json(savedCourse);}

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
},1000);
});


//UPDATE
//http://localhost:5000/api/course/:id
router.put("/:id", async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//http://localhost:5000/api/course/:id
router.delete("/:id", async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json("Course has been deleted !");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
//http://localhost:5000/api/course/find/:id
router.get("/find/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS
//http://localhost:5000/api/course/
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let courses;

        if (qNew) {
            courses = await Course.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            courses = await Course.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            courses = await Course.find();
        }

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
});
//http://localhost:5000/api/course/search/:name
router.get("/search/:name", async (req, res) => {

    try {

        let name=req.params.name.toLowerCase();
        if(req.params.name==="*" || req.params.name==="(" || req.params.name===")"  ){name=" "}
        Course.find({name: {$regex : name}},function (err, course) {
                res.json(course);
            });


    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/finds/begs", async (req, res) => {

    try {
        let begList=[];

        req.body.forEach( async  (e)=>{

        const beginner = await Beginner.findById(e);

        begList.push(beginner);
        })
        setTimeout(()=>{

        res.status(200).json(begList);
        },1000)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});
router.post("/finds/meds", async (req, res) => {
    try {
        let medList=[];

        req.body.forEach( async  (e)=>{

        const medium = await Medium.findById(e);

            medList.push(medium);
        })
        setTimeout(()=>{

            res.status(200).json(medList);
        },1000)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/finds/advs", async (req, res) => {
    try {
        let advList=[];

        req.body.forEach( async  (e)=>{

            const advanced = await Advanced.findById(e);

            advList.push(advanced);
        })
        setTimeout(()=>{

            res.status(200).json(advList);
        },1000)
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/find/beg/:id", async (req, res) => {
    try {
        const beginner = await Beginner.findById(req.params.id);
        res.status(200).json(beginner);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/find/med/:id", async (req, res) => {
    try {
        const medium = await Medium.findById(req.params.id);
        res.status(200).json(medium);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/find/adv/:id", async (req, res) => {
    try {
        const advanced = await Advanced.findById(req.params.id);
        res.status(200).json(advanced);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

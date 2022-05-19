const evenementModel = require("../../models/evenement");
const User = require("../../models/User");

const { search } = require("../../routes/event/evenement");
const ObjectId = require("mongoose").Types.ObjectId;


const userModel = require("../../models/User");

module.exports.signUp = async (req, res) => {
  const {
    nom,
    description,
    type,
    nbrpalacedispo,
    Phone,
    Address,
    picture,
    DateDebut,
    DateFin,
  } = req.body;
  // const token = req.cookies.access_token;
  //         decodedToken = jwt_decode(token);
  //         console.log(decodedToken.sub)
  // decodedToken.sub : id user connecte
  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const evenement = await evenementModel.create({
      nom,
      description,
      type,
      nbrpalacedispo,
      Phone,
      Address,
      picture,
      DateDebut,

      DateFin,
    });
    res.status(201).json({ evenement: evenement._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.getAllevenements = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  const evenements = await evenementModel.find().lean();
  const user = await userModel.find({ _id: "627abab7c126cfc62b3309c0" }).lean();
  let checkIfLiked = (element) => element == "627abab7c126cfc62b3309c0";
  let eventList = [];
  evenements.map((ev) => {
    let obj = ev;
    if (ev.likes.some(checkIfLiked)) {
      obj.likedEvent = true;
      eventList.push(obj);
      return ev;
    }
    eventList.push(obj);
    return ev;
  });
  res.status(200).json(eventList);
};

module.exports.evenementInfo = (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  evenementModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    })
    .select();
};

module.exports.updateevenement = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    await evenementModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            nom: req.body.nom,
            description: req.body.description,
            type: req.body.type,
            nbrpalacedispo: req.body.nbrpalacedispo,
            Phone: req.body.Phone,
            Address: req.body.Address,
            DateDebut: req.body.DateDebut,
            DateFin: req.body.DateFin,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.deleteevenement = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await evenementModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.likeevenementModel = async (req, res) => {
  // const token = req.cookies.access_token;
  // let decodedToken;
  // if (token) {
  //   decodedToken = jwt_decode(token);
  //   if (decodedToken && decodedToken.sub) {
   await evenementModel
    .findByIdAndUpdate(req.params.evenementModelId, {
      $addToSet: { likes: "627abab7c126cfc62b3309c0" },
    })
    .lean();
    const evenements = await evenementModel.find().lean();
  const user = await userModel.find({ _id: "627abab7c126cfc62b3309c0" }).lean();
  let checkIfLiked = (element) => element == "627abab7c126cfc62b3309c0";
  let eventList = [];
  evenements.map((ev) => {
    let obj = ev;
    if (ev.likes.some(checkIfLiked)) {
      obj.likedEvent = true;
      eventList.push(obj);
      return ev;
    }
    eventList.push(obj);
    return ev;
  });
  res.status(200).json(eventList);
};
module.exports.dislikeevenementModel = async (req, res) => {
  // const token = req.cookies.access_token;
  // let decodedToken;
  // if (token) {
  //   decodedToken = jwt_decode(token);
  //   if (decodedToken && decodedToken.sub) {
  await evenementModel
    .findByIdAndUpdate(req.params.evenementModelId, {
      $pull: { likes: "627abab7c126cfc62b3309c0" },
    })
    .lean();
  await evenementModel
    .findByIdAndUpdate(req.params.evenementModelId, {
      $addToSet: { dislikes: "627abab7c126cfc62b3309c0" },
    })
    .lean();
    const evenements = await evenementModel.find().lean();
  const user = await userModel.find({ _id: "627abab7c126cfc62b3309c0" }).lean();
  let checkIfLiked = (element) => element == "627abab7c126cfc62b3309c0";
  let eventList = [];
  evenements.map((ev) => {
    let obj = ev;
    if (ev.likes.some(checkIfLiked)) {
      obj.likedEvent = true;
      eventList.push(obj);
      return ev;
    }
    eventList.push(obj);
    return ev;
  });
  res.status(200).json(eventList);
};
//search event
module.exports.searchEvent = async (req, res) => {
  const { search } = req.params;
  let events = await evenementModel
    .find({}, (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
    }).clone()
    .lean();
  if (events && search !="") {
    events = events.filter(function (item) {
      if (
        item.nom.includes(search) ||
        item.type.includes(search) ||
        item.nbrpalacedispo?.toString().includes(search) ||
        item.Address.includes(search) ||
        item.Phone?.toString().includes(search)
      )
        return item;
    });
  }
  return res.status(200).json(events);
};

//upcoming event
module.exports.upcomingEvent = async (req, res) => {
  let events = await evenementModel
    .find({}, (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
    }).clone()
    .lean();
  if (events) {
    events = events.filter(function (item) {
      if (item.DateDebut > new Date()) return item;
    });
  }
  return res.status(200).json(events);
};
module.exports.reservePlace = async (req, res) => {

  const { eventId, nbePlaces } = req.body;
  console.log(req.body)
  // let decodedTokenùll
  // if (token) {
  //   decodedToken = jwt_decode(token);
  //   if (decodedToken && decodedToken.sub) {
  let us = await userModel
    .findOne({ _id: "627abab7c126cfc62b3309c0" /*decodedToken.sub*/ })
    .lean();

  await evenementModel.updateOne(
    { _id: eventId },
    {
      $inc: { nbrpalacedispo: -nbePlaces },
      $push: {
        reservation: {
          user: us._id,
          nbre: nbePlaces,
        },
      },
    }
  );
  const evenements = await evenementModel.find().lean();
  const user = await userModel.find({ _id: "627abab7c126cfc62b3309c0" }).lean();
  let checkIfLiked = (element) => element == "627abab7c126cfc62b3309c0";
  let eventList = [];
  evenements.map((ev) => {
    let obj = ev;
    if (ev.likes.some(checkIfLiked)) {
      obj.likedEvent = true;
      eventList.push(obj);
      return ev;
    }
    eventList.push(obj);
    return ev;
  });
  res.status(200).json(eventList);
}
module.exports.stats = async (req, res) => {
  let events = await evenementModel
    .find({}, { nom: 1, nbrpalacedispo: 1 }, (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
    })
    .lean().clone();
  events &&
    events.map((ev) => {
      console.log(ev);
    });
  return res.status(200).json(events);
};

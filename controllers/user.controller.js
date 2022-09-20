const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// recevoir tout les Users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

// Recevoir les infos d'un User
module.exports.userInfo = (req, res) => {
  console.log(req.params);
  // vérifie si l'id est connu, sinon on arrête la fonction
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  // ----------------------------------------------------------
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown :" + err);
  }).select("--password");
};

// Modifier User
module.exports.updateUser = async (req, res) => {
  // vérifie si l'id est connu, sinon on arrête la fonction
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  // ----------------------------------------------------------

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).json({ message: "celle la" + err });
      }
    ).exec;
  } catch (err) {
    return res.status(500).json({ message: "celle ci " + err });
  }
};

// Supprimer User
module.exports.deleteUser = async (req, res) => {
  // vérifie si l'id est connu, sinon on arrête la fonction
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// // Fonction follow
module.exports.follow = async (req, res) => {
  // vérifie si l'id est connu, sinon on arrête la fonction
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    // add to the followers list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    ).exec;
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    ).exec;
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Fonction unfollow
module.exports.unfollow = async (req, res) => {
  // vérifie si l'id est connu, sinon on arrête la fonction
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown :" + req.params.id);

  try {
    // add to the followers list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).json(err);
      }
    ).exec;
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).json(err);
      }
    ).exec;
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

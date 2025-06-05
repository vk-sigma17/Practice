// ##ProfileRouter
// -GET /profile/view
// -PATCH /profile/edit
// -PATCH /profile/password

const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

// get one user by email id
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // // Get The cookie & token from cookie
    // const token =  req.cookies.token;
    // // const { token } = cookie;
    // if(!token){
    //     throw new Error("inValid Token");
    // }
    // // validatating Token
    // const decodedToken = await jwt.verify(token, "@12sigma345");
    // const { _id } = decodedToken;

    // // find user by _id
    // const oneUser = await User.findById(_id);
    // if(!oneUser){
    //     res.status(404).send("No user Found!");
    // }
    res.send(req.user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Server error");
  }
});

// Edit Profile;
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    loggedInUser.save();
     res.json({
            message: `${loggedInUser.firstName}, Your profile updated successfully!`,
            data: loggedInUser
        })
  } catch (err) {
    console.error("ERROR :", err.message);
  }
});

module.exports = profileRouter;

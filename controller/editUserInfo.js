const userModel = require("../models/userModel");

async function editUserInfoController(req, res) {
  try {
    const {
      userID,
      name,
      email,
      username,
      gender,
      phoneNum,
      country,
      tradingExp,
      oldUserName,
    } = req.body;

    const userName = await userModel.findOne({ username });
    console.log("UPDATED INFO", req.body);
    if (username !== oldUserName && userName) {
      throw new Error("Username already in use!");
    }
    console.log("NAME", name.split(" "));
    if (!name.split(" ")[0] || !name.split(" ")[1]) {
      throw new Error("Name cannot be empty!");
    }
    if (!username) {
      throw new Error("Username cannot be empty!");
    }
    if (!gender) {
      throw new Error("Select a gender!");
    }
    const mob = phoneNum.split("-")[1];
    if (!mob || mob.length < 10) {
      throw new Error("Please enter a valid phone number.");
    }
    if (!phoneNum) {
      throw new Error("Please enter a phone number.");
    }
    if (!country) {
      throw new Error("Please provide your country.");
    }
    if (!tradingExp) {
      throw new Error("Please provide your trading experience.");
    }

    const payLoad = {
      ...(name && { name: name }),
      ...(email && { email: email }),
      ...(username && { username: username }),
      ...(gender && { gender: gender }),
      ...(phoneNum && { phoneNum: phoneNum }),
      ...(country && { country: country }),
      ...(tradingExp && { tradingExp: tradingExp }),

      role: "GENERAL",
    };
    const userData = await userModel.findByIdAndUpdate(userID, payLoad);

    res.status(201).json({
      data: userData,
      success: true,
      error: false,
      message: "Profile information updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = editUserInfoController;

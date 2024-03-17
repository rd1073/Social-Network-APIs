const { User } = require("../config/db");

const viewProfile = async (req, res) => {
  try {
    // Get the user ID from the request object (assuming it's stored in req.user.id)
    const userId = req.user.id;

    // Fetch user details from the database based on the user ID
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the user's profile information
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


const deleteProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is stored in req.user.id
  
      // Find the user by ID and delete them from the database
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      res.status(200).json({ msg: "Profile deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };



  const updateProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming user ID is stored in req.user.id
      const { username, email, bio } = req.body; // Assuming these are the fields that can be updated
  
      // Find the user by ID and update their profile fields
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, bio },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };

module.exports = { viewProfile, deleteProfile,updateProfile };

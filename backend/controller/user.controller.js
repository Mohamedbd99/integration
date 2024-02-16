const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const imagePath = "http://localhost:5000/images/" + req.file.filename;

    try {
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage

        const newUser = new User({ name, email, password: hashedPassword, imagePath });
        const user = await newUser.save();
        return res.send({ user });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

userController.updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const imagePath = "http://localhost:5000/images/" + req.file.filename;

    try {
        // Hash du mot de passe si un nouveau mot de passe est fourni
        let hashedPassword = password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password: hashedPassword, imagePath }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.send({ user: updatedUser });
    } catch (e) {
        console.log(e);
        next(e);
    }
};


userController.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.send({ users });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

userController.getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.send({ user });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

userController.deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.send({ message: "User deleted successfully" });
    } catch (e) {
        console.log(e);
        next(e);
    }
};

userController.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ _id: user._id, email: user.email,imagePath: user.imagePath,name: user.name }, '96462281', { expiresIn: '1h' });
        console.log(user._id,user.email,user.imagePath,user.name);
        res.json({ token ,user});
    } catch (error) {
        console.log(error);
        next(error);
    }
};
userController.profile = (req, res, next) => {
    const { userData } = req;
    const { email, _id, name, imagePath } = userData;

    res.json({ email, _id, name, imagePath });
};



module.exports = userController;

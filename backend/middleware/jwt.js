const jwt = require('jsonwebtoken');

const extractUserDataFromToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, '96462281');

        const { email, _id, name, imagePath } = decoded;

        // Assurez-vous que les valeurs sont des chaînes de caractères
        const userData = {
            email: email.toString(),
            _id: _id.toString(),
            name: name.toString(),
            imagePath: imagePath.toString()
        };

        req.userData = userData;

        console.log(userData._id);
        console.log(userData.email);
        console.log(userData.name);
        console.log(userData.imagePath);

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { extractUserDataFromToken };

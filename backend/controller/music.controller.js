const Music = require('../models/music.model');
const ffmpeg = require('fluent-ffmpeg');

// Specify the path to ffprobe executable
ffmpeg.setFfprobePath('C:\\Users\\bidoun\\Downloads\\ffmpeg-master-latest-win64-gpl-shared\\bin\\ffprobe');

const musicController = {};

musicController.register = async (req, res, next) => {
    const { filename, originalname, mimetype } = req.body;
    const audioPath = "http://localhost:5000/music/" + req.file.filename;

    try {
        // Use Promise to handle asynchronous operation
        const metadata = await new Promise((resolve, reject) => {
            ffmpeg.ffprobe(req.file.path, (err, metadata) => {
                if (err) {
                    console.error('Error getting audio duration:', err);
                    reject(err);
                } else {
                    resolve(metadata);
                }
            });
        });

        // Extract duration from metadata
        const durationInSeconds = metadata.format.duration;
        const durationInMinutes = durationInSeconds / 60;

        // Create a new Music instance and save it
        const newAudio = new Music({ filename, originalname, mimetype, audioPath, duration: durationInMinutes });
        const savedAudio = await newAudio.save();

        // Send response
        res.send({ audio: savedAudio });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


musicController.getMusicByIddd = async (musicId) => {
    try {
        const music = await Music.findById(musicId);
        if (!music) {
            return null; // Return null or handle the case where music is not found
        }
        const { audioPath, duration } = music;
        return { audioPath, duration };
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to be caught in the calling function
    }
};

musicController.getMusicByIdd = async (req, res, next) => {
    try {
        const musicId = req.params.id;
        const music = await Music.findById(musicId);
        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }
        const { audioPath } = music;
        res.json({ audioPath,music });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


musicController.getAllMusic = async (req, res, next) => {
    try {
        const music = await Music.find();
        res.json({ music });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

musicController.updateMusic = async (req, res, next) => {
    try {
        const musicId = req.params.id;
        const { filename, originalname, mimetype } = req.body;
        const audioPath = "http://localhost:5000/music/" + req.file.filename;

        // Check if music exists
        const music = await Music.findById(musicId);
        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }

        // Update music details
        music.filename = filename;
        music.originalname = originalname;
        music.mimetype = mimetype;
        music.audioPath = audioPath;

        // Save updated music
        const updatedMusic = await music.save();
        res.json({ music: updatedMusic });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

musicController.deleteMusic = async (req, res, next) => {
    try {
        const musicId = req.params.id;

        // Check if music exists
        const music = await Music.findById(musicId);
        if (!music) {
            return res.status(404).json({ message: 'Music not found' });
        }

        // Delete music
        await Music.findByIdAndDelete(musicId);
        res.json({ message: 'Music deleted successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = musicController;

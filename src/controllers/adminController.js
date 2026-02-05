import { albumModel } from '../models/albumModel.js';
import { songModel } from '../models/songModel.js';
import cloudinary from '../lib/cloudinary.js';

//helper functions
const uploadToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
      folder: folder,
    });
    return result.secure_url;
  } catch (error) {
    console.log('Error in uploadToCloudinary:', error);
    throw new Error('Error in uploadToCloudinary');
  }
};
const deleteFromCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.destroy(file.public_id);
    return result;
  } catch (error) {
    console.log('Error in deleteFromCloudinary:', error);
    throw new Error('Error in deleteFromCloudinary');
  }
};

//songcontrollers
export const createSong = async (req, res) => {
  try {
    if (!req.files || !req.files.audio || !req.files.image) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, artist, duration, albumId } = req.body;
    const audioFile = req.files.audio;
    const imageFile = req.files.image;

    const audioUrl = await uploadToCloudinary(audioFile, 'songs');
    const imageUrl = await uploadToCloudinary(imageFile, 'covers');

    const song = await songModel.create({
      title,
      artist,
      imageUrl,
      audioUrl,
      duration,
      albumId: albumId || null,
    });

    if (albumId) {
      await albumModel.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(200).json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in create Song' });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await songModel.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // If song belongs to an album, remove it from the album's songs array
    if (song.albumId) {
      await albumModel.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await songModel.findByIdAndDelete(songId);

    await deleteFromCloudinary(song.audioUrl);
    await deleteFromCloudinary(song.imageUrl);

    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.log('Error in deleting Song:', error);
    res.status(500).json({ message: 'Error in deleting Song' });
  }
};

//album controllers
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.image;
    const imageUrl = await uploadToCloudinary(imageFile, 'albums');
    const album = await albumModel.create({
      title,
      artist,
      releaseYear,
      imageUrl,
    });
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in create Album' });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findByIdAndDelete(albumId);
    const songs = await songModel.deleteMany({ albumId });
    //await deleteFromCloudinary(album.imageUrl);
    res.status(200).json({ message: 'Album deleted successfully', album });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in delete Album' });
  }
};

export const checkAdmin = async (req, res) => {
  try {
    res.status(200).json({ admin: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error in check Admin' });
  }
};

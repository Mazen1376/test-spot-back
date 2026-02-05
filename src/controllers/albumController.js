import { albumModel } from '../models/albumModel.js';

export const getAllAlbums = async (req, res) => {
  const albums = await albumModel.find();
  res.status(200).json(albums);
};

export const getAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findById(albumId).populate('songs');
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting album' });
  }
};

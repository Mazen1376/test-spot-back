import { songModel } from '../models/songModel.js';

export const getAllSongs = async (req, res) => {
  const songs = await songModel.find();
  res.status(200).json(songs);
};

export const getFeaturedSongs = async (req, res) => {
  try {
    const songs = await songModel.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting featured songs' });
  }
};

export const getTrendingSongs = async (req, res) => {
  try {
    const songs = await songModel.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting trending songs' });
  }
};

export const getMadeForYouSongs = async (req, res) => {
  try {
    const songs = await songModel.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting made for you songs' });
  }
};

export const getSong = async (req, res) => {
  try {
    const { songId } = req.params;
    const song = await songModel.findById(songId).populate('Album');
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error getting song' });
  }
};

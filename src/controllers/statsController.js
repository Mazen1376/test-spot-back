import { userModel } from '../models/userModel.js';
import { songModel } from '../models/songModel.js';
import { albumModel } from '../models/albumModel.js';

export const getStats = async (req, res) => {
  try {
    const [totalUsers, totalSongs, totalAlbums, uniqueArtists] =
      await Promise.all([
        userModel.countDocuments(),
        songModel.countDocuments(),
        albumModel.countDocuments(),
        songModel.distinct('artist'),
      ]);

    res.status(200).json({
      totalUsers,
      totalSongs,
      totalAlbums,
      totalArtists: uniqueArtists.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error in getting stats' });
  }
};

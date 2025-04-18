const Profile = require("../models/ProfileModel");
const Video = require("../models/VideoModel");
const Playlist = require("../models/PlaylistModel");

module.exports = {
    videosByUser: async (args) => {
        try {
          const { userId } = args;
    
          if (!userId) {
            throw new Error("userId no proporcionado");
          }
    
          const videos = await Video.find({ createdBy: userId });
    
          if (videos.length === 0) {
            throw new Error("No videos found for this user");
          }
    
          return videos;
        } catch (error) {
          console.error("Error getting videos:", error);
          throw new Error("Internal Server Error");
        }
      },
    
      // Resolver para obtener playlists por usuario
      playlistsByUser: async (args) => {
        try {
          const { userId } = args;
    
          if (!userId) {
            throw new Error("userId no proporcionado");
          }
    
          const playlists = await Playlist.find({ createdBy: userId })
            .populate("associatedProfiles")
            .populate("videos");
    
          if (playlists.length === 0) {
            throw new Error("No playlists found for this user");
          }
    
          return playlists;
        } catch (error) {
          console.error("Error getting playlists:", error);
          throw new Error("Internal Server Error");
        }
      },
  profiles: async (args) => {
    try {
      const { userId } = args;

      if (!userId) {
        throw new Error("userId no proporcionado");
      }

      const profiles = await Profile.find({ createdBy: userId });

      if (profiles.length === 0) {
        throw new Error("No profiles found for this user");
      }

      return profiles;
    } catch (error) {
      console.error("Error getting profiles:", error);
      throw new Error("Internal Server Error");
    }
  },
};


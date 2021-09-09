const lineServices = require('../services/line');
const encryptService = require('../services/encryption');
const gameConfig = require('../../configs/game.configs.json');

const activityId = gameConfig.activityId;
const clientId = gameConfig.clientId;
const clientSecret = gameConfig.clientSecret;
const redirectUri = gameConfig.redirectUri;
const gameUrl = gameConfig.gameUrl;

const getLineGameGuid = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: 'code cannot be empty' });
  }

  const accessToken = await lineServices.getUserToken({
    code,
    redirectUri,
    clientId,
    clientSecret,
  });

  if (!accessToken) {
    return res.status(400).json({ message: 'getting access token failed' });
  }

  const userProfile = await lineServices.getUserProfile(accessToken);

  if (!userProfile || !userProfile.userId) {
    return res.status(400).json({ message: 'getting user profile failed' });
  }

  const { userId } = userProfile;

  const encryptedGuid = await encryptService.encryption({ userId, activityId });

  if (!encryptedGuid) {
    return res.status(400).json({ message: 'encrypt user failed' });
  }

  res.json({ guid: encryptedGuid, gameUrl });
};

module.exports = {
  getLineGameGuid,
};

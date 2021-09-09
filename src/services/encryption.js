const axios = require('axios').default;
const apiConfig = require('../../configs/api.config.json');

exports.encryption = function (args) {
  const { activityId, userId } = args;

  const body = `param=${JSON.stringify({
    ActivityId: activityId,
    PassContent: { guid: userId, src: 'line_game' },
  })}`;

  return axios({
    url: apiConfig.encryptUrl,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    data: body,
  })
    .then((response) => response.data)
    .catch(console.log);
};

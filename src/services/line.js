const axios = require('axios').default;
const apiConfig = require('../../configs/api.config.json');

const getUserToken = async (args) => {
  const { code, redirectUri, clientId, clientSecret } = args;

  const body = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: encodeURIComponent(redirectUri),
    client_id: clientId,
    client_secret: clientSecret,
  };

  const encodedBody = Object.entries(body)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return axios({
    method: 'post',
    url: apiConfig.getLineTokensUrl,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: encodedBody,
  })
    .then((res) => {
      if (!res.data.access_token) {
        console.log('Could not find access_token');
        return;
      }
      return res.data.access_token;
    })
    .catch(console.log);
};

const getUserProfile = (accessToken) =>
  axios({
    url: apiConfig.getLineProfileUrl,
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((res) => res.data)
    .catch(console.log);

module.exports = {
  getUserToken,
  getUserProfile,
};

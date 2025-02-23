const axios = require("axios");
const qs = require("qs"); // Import query string module
const { clientId, clientSecret, baseUrl } = require("./config");

async function getAccessToken() {
  try {
    const response = await axios.post(
      `${baseUrl}/oauth/token`,
      qs.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.response?.data || error);
  }
}

module.exports = { getAccessToken };

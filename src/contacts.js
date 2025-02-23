const axios = require("axios");
// const { baseUrl } = require("./config");

const BASE_URL = "https://stoplight.io/mocks/highlevel/integrations/39582863"; // Updated base URL

async function getContactById(accessToken, contactId) {
  try {

    const response = await axios.get(`${BASE_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Version: "2021-07-28", // Ensure this header is included
      },
    });

    return response.data;
  } catch (error) {
    console.error(" Error fetching contact:", error.response?.data || error.message);
    throw error;
  }
}

// 🔹 Get a random contact (assuming you have a list of contact IDs)
async function getRandomContact(accessToken) {
  try {
    // Replace this with a valid contact ID list
    const contactIds = ["seD4PfOuKoVMLkEZqohJ"]; 

    if (contactIds.length === 0) {
      throw new Error("No contact IDs available.");
    }

    const randomId = contactIds[Math.floor(Math.random() * contactIds.length)];

    return await getContactById(accessToken, randomId);
  } catch (error) {
    console.error(" Error getting random contact:", error.message);
    throw error;
  }
}


async function updateContact(accessToken, contactId, customFieldId, newValue) {
  try {
    const response = await axios.put(
      `${BASE_URL}/contacts/${contactId}`,
      {
        customFields: [{ id: customFieldId, key: "my_custom_field", field_value: newValue }],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Version: "2021-07-28", // Ensure API version is correct
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🚀 ~ updateContact ~ response.data:",JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error(" Error updating contact:", error.response?.data || error.message || error);
    return null;
  }
}
// Export functions
module.exports = { getContactById, getRandomContact ,updateContact};

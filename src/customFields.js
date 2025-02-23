const axios = require("axios");

const baseUrl = "https://stoplight.io/mocks/highlevel/integrations/39582863"; // Mock API

async function getCustomFieldId(accessToken, contactId, fieldName) {
  try {
    const response = await axios.get(`${baseUrl}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Version: "2021-07-28", // Ensure this matches the correct API version
      },
    });

    if (!response.data.contact) {
      throw new Error("Contact data not found in API response.");
    }

    const fields = response.data.contact.customFields || [];


    const field = fields.find((f) => f.name === fieldName); // Ensure matching by 'name'

    if (!field) {
      throw new Error(` Custom field "${fieldName}" not found.`);
    }

    return field.id;
  } catch (error) {
    console.error(" Error fetching custom fields:", error.response?.data || error.message || error);
    return null;
  }
}

module.exports = { getCustomFieldId };

// Version: "2021-07-28", // Use the correct API version
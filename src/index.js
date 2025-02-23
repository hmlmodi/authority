const { getAccessToken } = require("./auth");
const { getRandomContact, updateContact } = require("./contacts");
const { getCustomFieldId } = require("./customFields");

async function main() {
  const accessToken = await getAccessToken();
  console.log("🚀 ~ main ~ accessToken:", accessToken)
  if (!accessToken) return;

  const contactId = await getRandomContact(accessToken);
  console.log("🚀 ~ main ~ contactId:", contactId)
  if (!contactId) return;

  const customFieldId = await getCustomFieldId(accessToken, "DFS Booking Zoom Link");
  if (!customFieldId) {
    console.error("Custom field not found.");
    return;
  }
  console.log("🚀 ~ main ~ customFieldId:", customFieldId);

  const newValue = "https://zoom.us/j/1234567890"; 
  const customFieldKey = "DFS Booking Zoom Link"; // Ensure this matches your API key name

  const result = await updateContact(accessToken, contactId, customFieldId, customFieldKey, newValue);
  console.log("✅ ~ Contact Updated:", JSON.stringify(result,null,2));
}

main();


import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const botToken = process.env.SLACK_BOT_TOKEN;
const getUrl = "https://slack.com/api/chat.scheduledMessages.list";
const deleteUrl = "https://slack.com/api/chat.deleteScheduledMessage";

const getHeaders = {
  headers: {
    Authorization: `Bearer ${botToken}`,
    "Content-Type": "application/json",
  },
};

const fetchScheduledMessages = async () => {
  try {
    const response = await axios.get(getUrl, getHeaders);
    if (response.data.ok) {
      return response.data.scheduled_messages;
    } else {
      console.error("Error fetching scheduled messages:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("Error fetching scheduled messages:", error);
    return [];
  }
};

const deleteScheduledMessage = async (messageId: string, channelId: string) => {
  try {
    const response = await axios.post(
      deleteUrl,
      {
        channel: channelId,
        scheduled_message_id: messageId,
      },
      getHeaders,
    );
    if (response.data.ok) {
      console.log(
        `Successfully deleted message ${messageId} in channel ${channelId}`,
      );
    } else {
      console.error(
        `Error deleting message ${messageId}:`,
        response.data.error,
      );
    }
  } catch (error) {
    console.error(`Error deleting message ${messageId}:`, error);
  }
};

// Main function to run the deletion script
const run = async () => {
  const messages = await fetchScheduledMessages();
  if (messages.length === 0) {
    console.log("No scheduled messages found.");
    return;
  }

  for (const message of messages) {
    await deleteScheduledMessage(message.id, message.channel_id);
  }
  console.log("All scheduled messages have been processed.");
};

run();

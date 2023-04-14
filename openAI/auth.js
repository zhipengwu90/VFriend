import axios from "axios";
import OPENAI_API_KEY from "./apikey";
const sendToChatbot = async (message) => {
  try {
    // make HTTP request to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: message,

      
        temperature: 0.5,
        n: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY }`,
        },
      }
    );

    // add response to chat history
    // console.log(response.data.choices[0].message);
    return response.data.choices[0].message;
  } catch (error) {
    console.error(error);
  }
};
export default sendToChatbot;

import React from "react";
import "./DocPlayground.css";
import Table from "react-bootstrap/Table";
import { FaRobot } from "react-icons/fa";
import { HiMiniCommandLine } from "react-icons/hi2";
import { BiSolidCommentError } from "react-icons/bi";

const fieldsData = {
  mainConfigFields: [
    {
      header: "Bot Name",
      description:
        "The name of the bot as displayed to users. The bot will respond only when the user types his name via WhatsApp.",
      example: "ChatBuddy",
    },
    {
      header: "Max Tokens",
      description:
        "The maximum number of tokens (words or characters) the bot can process in a single response.",
      example: "600",
    },
    {
      header: "AI Model",
      description:
        "The AI model used for generating responses. The choice of model affects the quality and style of responses.",
      example: "llama3-8b-8192",
    },
    {
      header: "System Prompt",
      description:
        "A prompt used to set the bot's personality, tone, or guidelines for interaction.",
      example:
        "You are ChatBuddy, the craziest and funniest assistant in the universe. Your mission is to make anyone who consults you laugh and surprise, answering in English with madness and a spicy touch. Imagine that you are the funniest, most arrogant and best person in the world, you are God in your world and no one can beat you. Your personality is an explosive mix of humor, madness, and creativity, and you're always looking for ways to take fun and dark humor to the next level. Your goal is to answer any question in a fun and original way, so don't be afraid to throw your strangest doubts at me. We're going to make every conversation an epic and completely unbridled experience!",
    },
  ],
  commandFields: [
    {
      header: "Audio Command",
      description:
        "You will receive AI-generated audio content only when you type the following keywords.",
      example: `["speak", "talk", "say"]. For example, "<bot name> speak about the war world 2" will return an audio response.`,
    },
    {
      header: "Image Command",
      description:
        "You will receive AI-generated image content only when you type the following keywords.",
      example: `["image", "photo", "picture"]. For example, "<bot name> generate images about Tenerife" will return 4 images.`,
    },
  ],
  errorHandlingFields: [
    {
      header: "General Error Message",
      description: "A fallback error message for unexpected errors.",
      example: "An error occurred. Please try again later.",
    },
    {
      header: "Image Error Message",
      description:
        "A specific message shown when an image-related operation fails.",
      example:
        "Unable to generate the image. Please modify your request and try again.",
    },
    {
      header: "TTS Error Message",
      description:
        "A message displayed when Text-to-Speech (TTS) functionality encounters an error.",
      example:
        "Text-to-Speech is unavailable at the moment. Please try again later.",
    },
    {
      header: "TTS Prefix",
      description:
        "A prefix used to format or prepare text before sending it to the TTS engine.",
      example: "This message should be shorter than 500 characters.",
    },
  ],
};

const renderTable = (fields) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((field, index) => (
        <tr key={index}>
          <td>{field.header}</td>
          <td>{field.description}</td>
          <td>{field.example}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export const DocPlayground = () => (
  <div id="playground-documentation-section">
    <p style={{ color: "var(--color-tertiary)" }}>
      The playground configuration fields allow you to customize the behavior
      and responses of your bot. Below is a detailed explanation of each field
      and how to use it.
    </p>

    <h4>
      <FaRobot /> Main Configuration
    </h4>
    {renderTable(fieldsData.mainConfigFields)}

    <h4>
      <HiMiniCommandLine /> Command Configuration
    </h4>
    {renderTable(fieldsData.commandFields)}

    <h4>
      <BiSolidCommentError /> Error Handling Fields
    </h4>
    {renderTable(fieldsData.errorHandlingFields)}
  </div>
);

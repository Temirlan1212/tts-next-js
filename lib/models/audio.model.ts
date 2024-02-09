const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the product schema
const audioSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Product model
const Audio = mongoose.models.audio || mongoose.model("audio", audioSchema);
export default Audio;

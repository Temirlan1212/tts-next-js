const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// const audioSchema = new Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const AudioM = mongoose.models.audio || mongoose.model("audio", audioSchema);

const userAudioSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    user_id: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserAudio =
  mongoose.models.userAudio || mongoose.model("userAudio", userAudioSchema);
export default UserAudio;

export { UserAudio };

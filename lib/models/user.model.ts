import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user",
  },
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

userSchema.set("autoIndex", true);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export { User, Role };

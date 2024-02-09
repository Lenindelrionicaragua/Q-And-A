import mongoose from "mongoose";

const invitationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

invitationCodeSchema.statics.findByCode = async function (code) {
  try {
    return await this.findOne({ code: code });
  } catch (error) {
    throw new Error("Failed to find invitation code");
  }
};

invitationCodeSchema.statics.deleteByCode = async function (code) {
  try {
    return await this.deleteOne({ code: code });
  } catch (error) {
    throw new Error("Failed to delete invitation code");
  }
};

const InvitationCode = mongoose.model("InvitationCode", invitationCodeSchema);

export default InvitationCode;

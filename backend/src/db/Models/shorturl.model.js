import { Schema, model } from "mongoose";

const shortURLSchema = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    shortUrl: { type: String },  // ✅ will be auto-populated
    userId: { type: Schema.Types.ObjectId, ref: "user", default: null },
    expiresAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    title: { type: String },
    utm: {
      source: String,
      medium: String,
      campaign: String,
      term: String,
      content: String,
    },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);



shortURLSchema.pre("save", function (next) {
  if (!this.shortUrl && this.shortCode) {
    this.shortUrl = `https://tinylink-url.onrender.com/api/s/${this.shortCode}`;
  }
  next();
});



export const ShortURL = model("shortURL", shortURLSchema);

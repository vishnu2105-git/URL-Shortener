import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortcode: {
    type: String,
    required: true,
    unique: true,
  },
  title:{
    type:String,
    unique:true,
  },
  expiryDate: {
    type: Date,
    default: null,
  }

}, { timestamps: true }); // Adds createdAt and updatedAt fields

const UrlShortener = mongoose.model("UrlShortener", urlShortenerSchema);

export default UrlShortener;
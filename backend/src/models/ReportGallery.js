import mongoose from 'mongoose';

const reportGallerySchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    image: {
      type: Buffer,
      required: true,
    },
    originalFilename: {
      type: String,
      default: 'image.jpg',
    },
    mimetype: {
      type: String,
      default: 'image/jpeg',
    },
    report: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.image; // Exclude binary from JSON output
        return ret;
      },
    },
  }
);

export default mongoose.model('ReportGallery', reportGallerySchema, 'ReportGallery');

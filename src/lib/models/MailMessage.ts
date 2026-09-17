import { Schema, model, models, type Model, type Types } from "mongoose";

export type MailDirection = "inbound" | "outbound";
export type MailStatus = "received" | "sent" | "failed" | "simulated";

export type MailMessageDoc = {
  _id: Types.ObjectId;
  direction: MailDirection;
  from: string;
  fromEmail: string;
  to: string[];
  toEmail: string[];
  replyTo?: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
  status: MailStatus;
  errorMessage?: string;
  isRead: boolean;
  member?: Types.ObjectId;
  enquiry?: Types.ObjectId;
  sentBy?: {
    id: Types.ObjectId;
    name: string;
    email: string;
  };
  inReplyTo?: Types.ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

const MailMessageSchema = new Schema<MailMessageDoc>(
  {
    direction: {
      type: String,
      enum: ["inbound", "outbound"],
      required: true,
    },
    from: { type: String, required: true },
    fromEmail: { type: String, required: true, lowercase: true, trim: true },
    to: { type: [String], required: true },
    toEmail: { type: [String], required: true, lowercase: true },
    replyTo: { type: String },
    subject: { type: String, required: true, trim: true },
    bodyText: { type: String, required: true },
    bodyHtml: { type: String },
    status: {
      type: String,
      enum: ["received", "sent", "failed", "simulated"],
      required: true,
      default: "sent",
    },
    errorMessage: { type: String },
    isRead: { type: Boolean, default: false },
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    enquiry: { type: Schema.Types.ObjectId, ref: "Enquiry" },
    sentBy: {
      id: { type: Schema.Types.ObjectId, ref: "AdminUser" },
      name: { type: String },
      email: { type: String },
    },
    inReplyTo: { type: Schema.Types.ObjectId, ref: "MailMessage" },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

MailMessageSchema.index({ createdAt: -1 });
MailMessageSchema.index({ direction: 1, isRead: 1 });
MailMessageSchema.index({ fromEmail: 1 });
MailMessageSchema.index({ toEmail: 1 });
MailMessageSchema.index({ member: 1 });
MailMessageSchema.index({ enquiry: 1 });

export const MailMessage: Model<MailMessageDoc> =
  (models.MailMessage as Model<MailMessageDoc>) ??
  model<MailMessageDoc>("MailMessage", MailMessageSchema);

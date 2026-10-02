import { Schema, model, models, type Model, type Types } from "mongoose";
import { Counter } from "./Counter";
import type { MailState } from "./Enquiry";
import {
  ENQUIRY_STATUSES,
  MARITAL_STATUSES,
  PHOTO_TYPES,
  type EnquiryStatus,
  type MaritalStatus,
  type PhotoType,
} from "../constants";

/**
 * A completed Membership Registration Form, submitted from the public site.
 *
 * Unlike an enquiry this is a real application: it carries the applicant's
 * employment, next of kin, salary-deduction and bank details, their passport
 * photograph and their declaration. Approving one seeds a pending Member
 * record; the officer still completes admission there.
 */

export type RegistrationPhoto = {
  data: Buffer;
  contentType: PhotoType;
  size: number;
};

export type RegistrationDoc = {
  _id: Types.ObjectId;
  reference: string;
  surname: string;
  firstName: string;
  otherNames?: string;
  dateOfBirth: Date;
  maritalStatus: MaritalStatus;
  officeAddress: string;
  department: string;
  phone: string;
  email: string;
  nextOfKin: {
    name: string;
    relationship: string;
    address: string;
    phone: string;
  };
  monthlyContributionKobo: number;
  contributionStartsOn: Date;
  bankName: string;
  accountNumber: string;
  consentAppProfile: boolean;
  consentDigitalId: boolean;
  /** The applicant's typed name, standing in for a signature online. */
  signatureName: string;
  declaredAt: Date;
  witness?: { name?: string; address?: string };
  /** Excluded from queries by default — select "+photo" to load it. */
  photo?: RegistrationPhoto;
  status: EnquiryStatus;
  reviewNote?: string;
  reviewedBy?: Types.ObjectId;
  reviewedByName?: string;
  reviewedAt?: Date;
  /* "Official use only": the first officer to act on the form receives it. */
  receivedBy?: Types.ObjectId;
  receivedByName?: string;
  receivedAt?: Date;
  /** Unset until an officer records it. */
  appProfileCreated?: boolean;
  /** Set once an approval has seeded a member record. */
  member?: Types.ObjectId;
  submittedIp?: string;
  applicantMail: MailState;
  secretariatMail: MailState;
  mailError?: string;
  createdAt: Date;
  updatedAt: Date;
};

const PhotoSchema = new Schema<RegistrationPhoto>(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true, enum: PHOTO_TYPES },
    size: { type: Number, required: true },
  },
  { _id: false },
);

const RegistrationSchema = new Schema<RegistrationDoc>(
  {
    reference: { type: String, required: true, unique: true },
    surname: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    otherNames: { type: String, trim: true },
    dateOfBirth: { type: Date, required: true },
    maritalStatus: { type: String, required: true, enum: MARITAL_STATUSES },
    officeAddress: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    nextOfKin: {
      name: { type: String, required: true, trim: true },
      relationship: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },
    monthlyContributionKobo: { type: Number, required: true, min: 1 },
    contributionStartsOn: { type: Date, required: true },
    bankName: { type: String, required: true, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    consentAppProfile: { type: Boolean, required: true, default: false },
    consentDigitalId: { type: Boolean, required: true, default: false },
    signatureName: { type: String, required: true, trim: true },
    declaredAt: { type: Date, required: true },
    witness: {
      name: { type: String, trim: true },
      address: { type: String, trim: true },
    },
    // Lists and detail pages never need the bytes; only the photo route does.
    photo: { type: PhotoSchema, required: true, select: false },
    status: {
      type: String,
      required: true,
      enum: ENQUIRY_STATUSES,
      default: "new",
    },
    reviewNote: { type: String, trim: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    reviewedByName: { type: String },
    reviewedAt: { type: Date },
    receivedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    receivedByName: { type: String },
    receivedAt: { type: Date },
    appProfileCreated: { type: Boolean },
    member: { type: Schema.Types.ObjectId, ref: "Member" },
    submittedIp: { type: String },
    applicantMail: { type: String, required: true, default: "pending" },
    secretariatMail: { type: String, required: true, default: "pending" },
    mailError: { type: String },
  },
  { timestamps: true },
);

RegistrationSchema.index({ createdAt: -1 });
RegistrationSchema.index({ status: 1, createdAt: -1 });
// Supports the open-application check and the duplicate window.
RegistrationSchema.index({ email: 1, createdAt: -1 });

export const Registration: Model<RegistrationDoc> =
  (models.Registration as Model<RegistrationDoc>) ??
  model<RegistrationDoc>("Registration", RegistrationSchema);

/** Atomic reference allocation, same approach as enquiries. */
export async function nextRegistrationReference(year: number): Promise<string> {
  const counter = await Counter.findByIdAndUpdate(
    `registration:${year}`,
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true },
  ).lean();

  return `ARG-APP-${year}-${String(counter?.seq ?? 1).padStart(4, "0")}`;
}

/** "OKORO, Ada Chiamaka" — surname first, as the paper form asks. */
export function registrantName(
  registration: Pick<RegistrationDoc, "surname" | "firstName" | "otherNames">,
): string {
  return [
    `${registration.surname.toUpperCase()},`,
    registration.firstName,
    registration.otherNames,
  ]
    .filter(Boolean)
    .join(" ");
}

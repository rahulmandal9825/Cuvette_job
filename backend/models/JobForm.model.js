import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
	{
		JobTitle: {
			type: String,
			required: true,
		},
        JobDescription: {
			type: String,
			required: true,
		},
		Experiencelevel: {
			type: String,
            enum: ["Entry-level","Intermediate","Mid-level","Senior-level"],
			default: 'Entry-level'
		},
        candidate: [
            {
                type: String,
            }
        ],
		lastdate: {
			type: Date,
		},
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
	},
	{ timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
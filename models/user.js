import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// Creating the Schema.

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	secretToken: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: false
	}
});

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

// Creating the Model.

const User = mongoose.model('user', userSchema);

// Exporting the Model.

export default User;

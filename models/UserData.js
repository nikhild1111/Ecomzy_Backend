
// const mongoose=require("mongoose");

// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         require:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         require:true,
//         trim:true,
//     },
//     password:{
//         type:String,
//         require:true,
//     },
//     role:{
//         type:String,
//         enum:["Admin","User","Primium"],
//         default:"User",
//     },
//     phone:{
//         type:Number,
//         require:true,
//     }


// })

// module.exports=mongoose.model("user",userSchema);

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  addressType: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
}); // no _id for sub-docs if not needed

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // corrected typo: require -> required
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Premium"],
    default: "User",
  },
  phone: {
    type: Number,
    required: true,
  },
//   addresses: [addressSchema], // 👈 New field
// ✅ When a field is not provided and it is not marked as required:
// 👉 Then Mongoose will not throw any error, and the field will be:
// undefined – if no default is provided

// Set to the default value – if a default is defined

addresses: {
  type: [addressSchema],
  default: [],
},
// ✅ New fields
  totalSpends: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },

} ,
{ timestamps: true });  // ✅ Properly placed schema options

module.exports = mongoose.model("User", userSchema);




// 🔹 How data gets stored in MongoDB (in your case)

// 1️⃣ DB connects

// mongoose.connect(DATABASE_URL)


// 2️⃣ Model is created

// mongoose.model("User", userSchema)
// mongoose keep conenction alive and server runs then 
// → MongoDB auto-creates users collection in the mongodaatbase

// 3️⃣ You call

// User.create({ name, email, password, role, phone })


// 4️⃣ Mongoose does automatically

// Checks schema

// Adds defaults:

// addresses: []

// totalSpends: 0

// totalOrders: 0

// Generates _id

// Adds createdAt, updatedAt

// 5️⃣ MongoDB stores one document

// {
//   name,
//   email,
//   password,
//   role,
//   phone,
//   addresses: [],
//   totalSpends: 0,
//   totalOrders: 0
// }


// 6️⃣ Returned user = stored document

// 🔹 Important line to remember (Interview)

// Model.create() validates data, applies defaults, and inserts the document into MongoDB.
const mongoose = require('mongoose');
const Tutorial = require('../models/Tutorial');
const Admin = require('../models/Admin');
require('dotenv').config();

const sampleTutorials = [
  {
    title: "How to Treat Minor Cuts and Bleeding",
    category: "bleeding",
    description: "Learn the essential steps to properly clean and bandage minor cuts to prevent infection and promote healing.",
    steps: [
      "Wash your hands thoroughly with soap and water",
      "Apply direct pressure to the wound with a clean cloth",
      "Clean the wound gently with water once bleeding stops",
      "Apply antibiotic ointment if available",
      "Cover with a sterile bandage",
      "Change the bandage daily and keep the wound dry"
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "First Aid for Burns",
    category: "burns",
    description: "Essential first aid steps for treating minor burns and preventing further damage to the skin.",
    steps: [
      "Remove the person from the source of the burn",
      "Cool the burn with cool (not cold) running water for 10-20 minutes",
      "Remove any jewelry or tight clothing near the burned area",
      "Do not break any blisters that may form",
      "Apply a sterile, non-adhesive bandage",
      "Take over-the-counter pain medication if needed",
      "Seek medical attention for severe burns"
    ]
  },
  {
    title: "Choking Emergency Response",
    category: "choking",
    description: "Life-saving techniques to help someone who is choking, including the Heimlich maneuver.",
    steps: [
      "Ask 'Are you choking?' to confirm the person cannot speak or breathe",
      "Call 911 or have someone else call",
      "Stand behind the person and wrap your arms around their waist",
      "Make a fist with one hand and place it above the navel",
      "Grasp your fist with your other hand",
      "Give quick, upward thrusts into the abdomen",
      "Continue until the object is expelled or the person becomes unconscious",
      "If unconscious, begin CPR"
    ]
  },
  {
    title: "Recognizing and Responding to Heart Attack",
    category: "cardiac",
    description: "How to identify heart attack symptoms and provide immediate care while waiting for emergency services.",
    steps: [
      "Recognize symptoms: chest pain, shortness of breath, nausea, sweating",
      "Call 911 immediately",
      "Help the person sit down and rest",
      "Loosen any tight clothing",
      "If prescribed, help them take nitroglycerin",
      "Give aspirin if not allergic (chew, don't swallow whole)",
      "Monitor breathing and pulse",
      "Be prepared to perform CPR if needed"
    ]
  },
  {
    title: "Treating Sprains and Strains",
    category: "fractures",
    description: "RICE method and proper care for minor sprains and strains to reduce pain and swelling.",
    steps: [
      "Rest the injured area immediately",
      "Apply ice wrapped in a cloth for 15-20 minutes",
      "Compress with an elastic bandage (not too tight)",
      "Elevate the injured limb above heart level if possible",
      "Take over-the-counter pain medication as needed",
      "Avoid putting weight on the injured area",
      "Seek medical attention if pain persists or worsens"
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/firstaidguru');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Tutorial.deleteMany({});
    await Admin.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample tutorials
    await Tutorial.insertMany(sampleTutorials);
    console.log('Sample tutorials inserted');

    // Create default admin
    const admin = new Admin({
      email: 'admin@firstaidguru.com',
      password: 'password123'
    });
    await admin.save();
    console.log('Default admin created');

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@firstaidguru.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
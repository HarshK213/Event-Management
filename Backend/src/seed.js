// import dotenv from 'dotenv'
// dotenv.config({path : './env'});

import DBConnect from './db/db.js';
import { User } from './models/User.model.js';
import { Event } from './models/Event.model.js';
import bcrypt from 'bcryptjs'

async function seed(){
  try {
    // DBConnect();
    const adminEmail = 'admin@vitbhopal.ac.in';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const pw = await bcrypt.hash('Admin@123', 10);
      await User.create({ email: adminEmail, role: 'admin', password: pw });
      console.log('Admin created: admin@vitbhopal.ac.in / Admin@123');
    } else {
      console.log('Admin already exists');
    }

    // sample event
    // const e = await Event.findOne({ name: 'Sample Tech Symposium' });
    // if (!e) {
    //   await Event.create({
    //     name: 'Sample Tech Symposium',
    //     description: 'A sample event',
    //     date: new Date(Date.now() + 7*24*3600*1000),
    //     time: '10:00 AM',
    //     venue: 'Auditorium',
    //     fee: 100,
    //     earlyBirdDiscount: 20,
    //     earlyBirdLimit: 10,
    //     seats: 100,
    //     coordinatorEmail : "coordinator@vitbhopal.ac.in"

    //   });
    //   console.log('Sample event created');
    // } else console.log('Sample event exists');

    // process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default seed;

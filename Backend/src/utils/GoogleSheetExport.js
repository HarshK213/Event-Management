// import { google } from "googleapis";
// import dotenv from "dotenv";
// dotenv.config({
//     path : './.env'
// })

// const auth = new google.auth.JWT(
//   process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//   null,
//   process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//   ["https://www.googleapis.com/auth/spreadsheets"],
// );
// const sheets = google.sheets({ version: "v4", auth });

// async function test() {
//   try {
//     const res = await sheets.spreadsheets.create({
//       requestBody: { properties: { title: "Test Sheet" } }
      
//     });
//     console.log("Spreadsheet created:", res.data.spreadsheetUrl);
//   } catch (err) {
//     console.error("Error:", err.response?.data || err.message);
//   }
// }

// test();
// // Define the column order
// const columns = ["eventId", "studentEmail", "regNum", "Name", "transactionID"];

// export const exportDataToGoogleSheet = async (data, sheetTitle = "Registrations") => {
//   const sheets = google.sheets({ version: "v4", auth });

//   // 1️⃣ Create a new spreadsheet
//   const createResponse = await sheets.spreadsheets.create({
//     requestBody: {
//       properties: { title: `Registrations_${Date.now()}` },
//       sheets: [{ properties: { title: sheetTitle } }],
//     },
//   });

//   const spreadsheetId = createResponse.data.spreadsheetId;

//   // 2️⃣ Prepare data
//   const values = data.map((row) => columns.map((col) => row[col] || ""));

//   const resource = {
//     values: [columns, ...values],
//   };

//   // 3️⃣ Write data to sheet
//   await sheets.spreadsheets.values.update({
//     spreadsheetId,
//     range: `${sheetTitle}!A1`,
//     valueInputOption: "RAW",
//     requestBody: resource,
//   });

//   // 4️⃣ Return spreadsheet link
//   return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
// };

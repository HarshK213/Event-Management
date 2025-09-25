import ExcelJS from "exceljs";

const exportExcel = async (registration) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Registrations");
  ws.columns = [
    { header: "Student Name", key: "firstName", width: 30 },
    { header: "Registration Number", key: "registrationNumber", width: 20 },
    { header: "Email", key: "studentEmail", width: 30 },
    { header: "Payment Status", key: "paymentStatus", width: 15 },
    { header: "Transaction ID", key: "transactionId", width: 30 },
    { header: "Registration Date", key: "createdAt", width: 20 },
  ];
  registration.forEach((i) => {
    ws.addRow({
      firstName: r.firstName || "",
      registrationNumber: r.registrationNumber || "",
      studentEmail: r.studentEmail,
      paymentStatus: r.paymentStatus,
      transactionId: r.transactionId || "",
      createdAt: r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
    });
  });
  const buffer = await wb.xlsx.writeBuffer();
  return buffer;
};


export {exportExcel};
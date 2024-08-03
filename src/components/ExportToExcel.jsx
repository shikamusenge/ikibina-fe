/* eslint-disable react/prop-types */
import * as FileSaver from "file-saver";
import { FaSave } from "react-icons/fa";
import * as XLSX from "xlsx";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);

    // Add title to the first row with styling
    ws["A1"] = {
      v: "RAPORO YIKIBINA",
      t: "s",
      s: {
        font: { sz: 16, bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
        },
      },
    };

    // Add header styling
    const headers = XLSX.utils.json_to_sheet(apiData[0] ? [apiData[0]] : []);
    headers["!cols"] = [{ width: 20 }, { width: 30 }, { width: 40 }]; // Adjust column widths if needed
    for (
      let col = 0;
      col < headers["!ref"].split(":")[1].charCodeAt(0) - 65;
      col++
    ) {
      const cell = XLSX.utils.encode_cell({ c: col, r: 1 });
      if (!headers[cell]) headers[cell] = {};
      headers[cell].s = {
        fill: { fgColor: { rgb: "C4E0FF" } },
        font: { sz: 12, bold: true },
        border: { bottom: { style: "thin", color: { rgb: "000000" } } },
      };
    }

    // Combine data and headers
    XLSX.utils.book_append_sheet(
      { Sheets: { data: ws, headers }, SheetNames: ["Sheet1"] },
      "Sheet1"
    );

    // Set up the workbook and add borders to all cells
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell_address = { c: col, r: row };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) ws[cell_ref] = {};
        ws[cell_ref].s = {
          border: {
            top: { style: "thin" },
            right: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
          },
        };
      }
    }

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <button
        className="btn btn-primary flex"
        onClick={() => exportToCSV(apiData, fileName)}
      >
        <FaSave /> {"  "}KURAMO DOCUMA YA EXECL
      </button>
    </div>
  );
};

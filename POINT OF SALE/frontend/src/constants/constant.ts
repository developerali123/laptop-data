// import { GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";

export const notify = (message: string, type: "success" | "error") => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

// export const rolescolumns: GridColDef[] = [
//   { flex: 1, field: "id", headerName: "Role ID", width: 150 },
//   { flex: 1, field: "title", headerName: "Role Title", width: 300 },
// ];

// export const permissionscolumns: GridColDef[] = [
//   { flex: 1, field: "id", headerName: "Permission ID", width: 150 },
//   { flex: 1, field: "title", headerName: "Permission Title", width: 300 },
// ];

// export const officecolumns: GridColDef[] = [
//   { flex: 1, field: "id", headerName: "Office ID", width: 150 },
//   { flex: 1, field: "name", headerName: "Office Name", width: 200 },
//   { flex: 1, field: "location", headerName: "Office Location", width: 200 },
// ];

// export const departmentcolumns: GridColDef[] = [
//   { flex: 1, field: "id", headerName: "Department ID", width: 150 },
//   { flex: 1, field: "name", headerName: "Department Name", width: 200 },
//   { flex: 1, field: "office_name", headerName: "Office Name", width: 200 }, // Changed to Office Name
// ];

// export const jobColumns = [
//   { field: "name", headerName: "Job Name", flex: 1 },
//   { field: "no_of_positions", headerName: "Positions", flex: 1 },
//   { field: "job_level", headerName: "Job Level", flex: 1 },
//   { field: "department_name", headerName: "Department", flex: 1 },
// ];

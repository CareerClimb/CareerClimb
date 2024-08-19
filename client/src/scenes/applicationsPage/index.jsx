import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch, useStore } from "react-redux";
import { setApplications } from "state";

const statuses = [
  "Submitted",
  "Rejected",
  "Interview",
  "References",
  "Online Assessment",
  "Offer",
];

const ApplicationPage = () => {
  const applications = useSelector((state) => state.applications); // Fetch applications from redux store
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    companyName: "",
    dateApplied: "",
    status: "",
    jobLink: "",
    notes: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding new application!");
    const updatedApplications = [...applications, { id: Date.now(), ...form }]   // Append new application // Date ensures that Ids are unqiue
    dispatch(setApplications({ applications: updatedApplications }));  // Update applications in redux store
    setForm({
      companyName: "",
      dateApplied: "",
      status: "",
      jobLink: "",
      notes: "",
    });
  };

  const handleDelete = () => {
    const updatedApplications = applications.filter((application) => !selectedRows.includes(application.id)); // filter out the selected applications
    dispatch(setApplications({ applications: updatedApplications }));  // Update applications in redux store
    setSelectedRows([]);
  };

  const columns = [
    { field: "companyName", headerName: "Company Name", width: 300 },
    { field: 'dateApplied', headerName: 'Date Applied', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'jobLink', headerName: 'Job Link', width: 250 },
    { field: 'notes', headerName: 'Notes', flex: 1 },
  ];

  return (
    <Box p={4} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Application Page
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <TextField
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Date Applied"
            name="dateApplied"
            type="date"
            value={form.dateApplied}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            fullWidth
          >
            {statuses.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Job Posting Link"
            name="jobLink"
            value={form.jobLink}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "flex-end", mt: 2 }}>
            Add Application
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ height: 475, p: 2 }}>
        <div style={{height: 370}}>
          <DataGrid
            rows={applications}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            rowSelectionModel={selectedRows}                    // Controlled component
            onRowSelectionModelChange={(newSelectionModel) => { // Handle changes to controlled component
              setSelectedRows(newSelectionModel);
            }}
          />
        </div>
        <Box display="flex" justifyContent="flex-start" mt={4} mb={0}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            disabled={selectedRows.length === 0}
            startIcon={<DeleteIcon />}
          >
            Delete Selected
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ApplicationPage;

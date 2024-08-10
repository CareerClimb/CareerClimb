import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const statuses = [
  "Submitted",
  "Rejected",
  "Interview",
  "References",
  "Online Assessment",
  "Offer",
];

const ApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    dateApplied: "",
    status: "",
    jobLink: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplications([...applications, { id: applications.length + 1, ...form }]);
    setForm({
      companyName: "",
      dateApplied: "",
      status: "",
      jobLink: "",
      notes: "",
    });
  };

const columns = [
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: 'dateApplied', headerName: 'Date Applied', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'jobLink', headerName: 'Job Link', width: 250 },
    { field: 'notes', headerName: 'Notes', width: 200 },
];

  return (
    <Box p={4} display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Application Tracker
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

      <Paper elevation={3} sx={{ height: 400 }}>
        <DataGrid
          rows={applications}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default ApplicationTracker;
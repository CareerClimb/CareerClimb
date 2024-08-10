import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';

const statuses = [
  "Submitted",
  "Rejected",
  "Interview",
  "References",
  "Online Assessment",
  "Offer",
];

const ApplicationPage = () => {
  const [applications, setApplications] = useState([]);
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
    setApplications([...applications, { id: applications.length + 1, ...form }]);
    setForm({
      companyName: "",
      dateApplied: "",
      status: "",
      jobLink: "",
      notes: "",
    });
  };

  const handleDelete = () => {
    const updatedApplications = applications.filter((application) => !selectedRows.includes(application.id));
    setApplications(updatedApplications);
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

      <Paper elevation={3} sx={{ height: 400, p: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
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
        <DataGrid
          rows={applications}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </Paper>
    </Box>
  );
};

export default ApplicationPage;

import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid, GridToolbarContainer, useGridApiRef, useGridApiContext} from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch, useStore } from "react-redux";
import { setApplications } from "state";
import TopBar from "scenes/topBar";

const defaultApplication = {
  companyName: "",
  dateApplied: new Date().toISOString(), // YYYY-MM-DD String format for MongoDB
  status: "Submitted",
  jobLink: "",
  notes: "",
};

const statuses = [
  "Submitted",
  "Rejected",
  "Interview",
  "References",
  "Online Assessment",
  "Offer",
]

const ApplicationPage = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const apiRef = useGridApiRef(); // Reference/Pointer to Data Grid
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const applications = useSelector((state) =>  (state.applications)); 
  const isAuth = Boolean(useSelector((state) => state.token)); // Determine if the user is authenticated
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleDelete = () => {
    const updatedApplications = applications.filter((application) => !selectedRows.includes(application.id)); // filter out the selected applications
    dispatch(setApplications({ applications: updatedApplications }));  // Update applications in redux store
    setSelectedRows([]);
  };

  /* Columns for our DataGrid */
  const columns = [
    { field: "companyName", editable: true, headerName: "Company Name", width: 300 },
    { field: 'dateApplied', editable: true, headerName: 'Date Applied', width: 150, type: 'date', valueGetter: (value) => { return new Date(value);} },
    { field: 'status', editable: true, headerName: 'Status', width: 150, type: 'singleSelect', valueOptions: statuses },
    { field: 'jobLink', editable: true, headerName: 'Job Link', width: 250 },
    { field: 'notes', editable: true, headerName: 'Notes', flex: 1 },
  ];

  /* Saves application data when user is done editing row */
  function saveOnMongoDB(updatedRow) {
    updatedRow.dateApplied = updatedRow.dateApplied.toISOString();  // Serialize Date object to String. Redux only stores Serializable objects like Strings.
    const updatedApplications = applications.map((application) =>   // Iterate through each application
      (application.id === updatedRow.id) ? updatedRow : application // Find and replace edited application 
    );
    dispatch(setApplications({ applications: updatedApplications }));  // Save applications list in redux store.
    return updatedRow
  }

  /* 
    This function encapsulates the 'add application 'button and button behaviour for datagrid to use. 
    The 'add application' button creates a new row in the datagrid with default values.
  */
  function AddRowButton() {
    /* Button Behaviour: Create a new blank application with default values */
    const handleAddRowClick = () => {
      const newApplication = { ...defaultApplication, id: Date.now(), }  // Date ensures that Ids are unqiue.
      dispatch(setApplications({ applications: [...applications, newApplication] }));  // Update applications in redux store.
      setTimeout(() => { // Fix race condition between creating row & focusing: https://github.com/mui/mui-x/issues/2714
        apiRef.current.startRowEditMode({ id: newApplication.id }); // Put the row into edit mode
      }, 0);
    };
    /* Add Application button */
    return (
      <GridToolbarContainer>
        <Button sx={{color: theme.palette.primary.dark }} startIcon={<AddIcon />} onClick={handleAddRowClick}>
          Add Application
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" sx={{minHeight: '100vh', mt: isMobile ? '30px' : '5%', ml:'5%', mr:'5%'}} gap={4}>
      <TopBar/>
      <Typography variant="h1"  fontWeight ='bold' align="center" gutterBottom>
        Application Tracker
      </Typography>
      { !isAuth && ( // Conditionally render message if logged-out.
        <Typography variant="h4" fontFamily="Roboto" align="center" color={palette.neutral.medium} sx={{ mt: -2 }} >
                  Welcome! Log in to save your progress.
        </Typography>
      )}
        <Box sx={{height: '60vh'}}>
          <DataGrid
            apiRef = {apiRef} // Reference to Data Grid
            rows={applications}
            editMode="row"
            processRowUpdate={(updatedRow) => // Called when user stops editing row
              saveOnMongoDB(updatedRow)
            } 
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            rowSelectionModel={selectedRows}                    // Controlled component 
            onRowSelectionModelChange={(newSelectionModel) => { // Handle changes to controlled component
              setSelectedRows(newSelectionModel);               
            }}
            sx= {{
              fontSize: 14,
            }}
            slots={{  
              toolbar: AddRowButton,
            }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-start" mt={4} mb={0} >
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
    </Box>
  );
};

export default ApplicationPage;

import React, { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, Typography } from '@mui/material';

import DialogTitle from '@mui/material/DialogContent';

export default function ContactList() {

  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },

    { field: 'email', headerName: 'Email', width: 150, },
    { field: 'phone', headerName: 'Phone', width: 150, },
    { field: 'street', headerName: 'Street', width: 120, },
    { field: 'city', headerName: 'City', width: 120, },
    { field: 'state', headerName: 'State', width: 120, },
    { field: 'zip', headerName: 'Zip', width: 100, },
  ];

  //every time the page loads, this react hook calls the databasae to get the exisiting contact list
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setContactList([...response.data]);
    });

  }, []);

  //it routes the user to the edit contact page when the user clicks a row
  const handleClick = useCallback((event) => {
    navigate("/editContact", { state: event.id });
  }, []);

  const goBack = () => {
    navigate("/");
  }


  return (
    <>
      <br></br>
      <Box sx={{
        flexGrow: 1,
      }}
        display='flex'
        flexDirection="row"
        textAlign='center'
        alignItems="center"
        justifyContent="center"
        paddingTop='20px'
        paddingBottom='20px'
        paddingLeft='30px'
        paddingRight='30px'
        marginBottom='10px'
        minHeight="720px"
      >
        <Stack
          display="flex"
          alignItems="center"
          backgroundColor='white'
          sx={{
            flexGrow: 1, border: 2.5,
            borderColor: '#1976d2',
            maxWidth: "1100px"

          }}
          style={{ height: 680, width: 1100 }}>
          <div style={{ height: 620, width: "100%", paddingBottom: "30px" }}>
            <Stack alignItems="center">
              <DialogTitle
                disableTypography className="dialogTitle"
              >
                Contact List
              </DialogTitle>
              <Typography fontSize="10px">(Click on rows to edit or delete)</Typography>
            </Stack>
            <DataGrid

              rows={contactList}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onRowClick={handleClick}
            />
            <Button
              paddingTop="20px"
              style={{
                width: "100"
              }}
              alignItems="center"
              variant="contained"
              onClick={goBack} > Back
            </Button>
          </div>

        </Stack>

      </Box>
    </>
  );

}
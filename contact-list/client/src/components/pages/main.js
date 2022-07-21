import React from "react"
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button'
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function Main() {

    return (
        <>
            <Box sx={{ flexGrow: 1 }}
                display='flex'
                textAlign='center'
                alignItems="center"
                justifyContent="center"
                paddingTop='20px'
                paddingBottom='20px'
                marginBottom='10px'
                minHeight="900px"
            >
                <Stack spacing={4}
                    paddingBottom="200px">
                    <br></br>
                    {
                        <>
                            <Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        minWidth: '150px',
                                    }}
                                    component={Link}
                                    to='/contactList'
                                >View Contact List</Button>
                            </Typography>
                            <Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: '20px',
                                        minWidth: '150px'
                                    }}
                                    component={Link}
                                    to='/addContact'
                                >Add New Contact</Button>
                            </Typography>
                        </>
                    }
                </Stack>

            </Box>

        </>
    );
}
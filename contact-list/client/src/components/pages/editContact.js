import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

export default function EditContact(props) {


    //state variables to store data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [zip, setZip] = useState("");
    const [id, setID] = useState("");

    //state variables to set error messages
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [streetErrorMessage, setStreetErrorMessage] = useState("");
    const [cityErrorMessage, setCityErrorMessage] = useState("");
    const [stateNameErrorMessage, setStateNameErrorMessage] = useState("");
    const [zipErrorMessage, setZipErrorMessage] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        setID(state);
        Axios.get(`http://localhost:3001/api/getFromId/${state}`).then((response) => {
            setFirstName(response.data[0].firstName);
            setLastName(response.data[0].lastName);
            setEmail(response.data[0].email);
            setPhone(response.data[0].phone);
            setStreet(response.data[0].street);
            setCity(response.data[0].city);
            setStateName(response.data[0].state);
            setZip(response.data[0].zip);
        });
    }, [state]);


    /* this function is used to update a contact in database
    it validates the inputs first then updates the database */
    const updateContact = () => {
        const handleUpdateContact = () => {
            if (firstName && lastName && phone && email && street && city
                && stateName && zip) {
                Axios.post('http://localhost:3001/api/update',
                    {
                        id: id, firstName: firstName, lastName: lastName, email: email, phone: phone
                        , street: street, city: city, state: stateName, zip: zip
                    });
                navigate("/contactList")

            } else {
                if (!firstName) {
                    setFirstNameErrorMessage("Required field");
                }
                if (!lastName) {
                    setLastNameErrorMessage("Required field");
                }
                if (!phone) {
                    setPhoneErrorMessage("Required field");
                }
                if (!email) {
                    setEmailErrorMessage("Required field");
                }
                if (!street) {
                    setStreetErrorMessage("Required field");
                }
                if (!city) {
                    setCityErrorMessage("Required field");
                }
                if (!stateName) {
                    setStateNameErrorMessage("Required field");
                }
                if (!zip) {
                    setZipErrorMessage("Required field");
                }
            }
        }
        handleUpdateContact();
    };

    //this function deletes the particular contact from the database.Here, state is the unique id.
    const deleteContact = () => {
        Axios.delete(`http://localhost:3001/api/delete/${state}`);
        navigate("/contactList");
    }

    return (
        <>
            <br></br>
            <Box sx={{ flexGrow: 1 }}
                display='flex'
                textAlign='center'
                alignItems="center"
                justifyContent="center"
                paddingTop='20px'
                paddingBottom='20px'
                marginBottom='10px'>
            </Box>
            <Box margin='10px'>
                <Box sx={{
                    maxWidth: '600px',
                    flexGrow: 1,
                    border: 2.5,
                    borderColor: '#1976d2',
                    margin: "auto",
                    paddingBottom: "20px",
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: 3,
                    backgroundColor: 'white'
                }}>
                    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={8} md={12} >
                            <Stack alignItems="center">
                                <DialogTitle
                                    disableTypography className="dialogTitle"
                                >
                                    Edit Contact Information
                                </DialogTitle>
                            </Stack>
                        </Grid>
                    </Grid>
                    <>
                        <DialogContent>
                            <Stack spacing={3}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>


                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="firstName"
                                                    required
                                                    id="firstName"
                                                    label="First Name"
                                                    error={firstNameErrorMessage}
                                                    helperText={firstNameErrorMessage}
                                                    value={firstName}
                                                    variant="outlined"
                                                    onChange={(e) => { setFirstName(e.target.value); setFirstNameErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="lastName"
                                                    required
                                                    id="lastName"
                                                    label="Last Name"
                                                    error={lastNameErrorMessage}
                                                    helperText={lastNameErrorMessage}
                                                    value={lastName}
                                                    variant="outlined"
                                                    onChange={(e) => { setLastName(e.target.value); setLastNameErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="phone"
                                                    required
                                                    id="phone"
                                                    label="Phone"
                                                    error={phoneErrorMessage}
                                                    helperText={phoneErrorMessage}
                                                    value={phone}
                                                    variant="outlined"
                                                    onChange={(e) => { setPhone(e.target.value); setPhoneErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="email"
                                                    required
                                                    id="email"
                                                    label="Email"
                                                    error={emailErrorMessage}
                                                    helperText={emailErrorMessage}
                                                    value={email}
                                                    variant="outlined"
                                                    onChange={(e) => { setEmail(e.target.value); setEmailErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="street"
                                                    required
                                                    id="street"
                                                    label="Street"
                                                    error={streetErrorMessage}
                                                    helperText={streetErrorMessage}
                                                    value={street}
                                                    variant="outlined"
                                                    onChange={(e) => { setStreet(e.target.value); setStreetErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="city"
                                                    required
                                                    id="city"
                                                    label="City"
                                                    error={cityErrorMessage}
                                                    helperText={cityErrorMessage}
                                                    value={city}
                                                    variant="outlined"
                                                    onChange={(e) => { setCity(e.target.value); setCityErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="state"
                                                    required
                                                    id="state"
                                                    label="State"
                                                    error={stateNameErrorMessage}
                                                    helperText={stateNameErrorMessage}
                                                    value={stateName}
                                                    variant="outlined"
                                                    onChange={(e) => { setStateName(e.target.value); setStateNameErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4} sm={8} md={12}>
                                        <Stack>
                                            <FormGroup>
                                                <TextField htmlFor="zip"
                                                    required
                                                    id="zip"
                                                    label="Zip"
                                                    error={zipErrorMessage}
                                                    helperText={zipErrorMessage}
                                                    value={zip}
                                                    variant="outlined"
                                                    onChange={(e) => { setZip(e.target.value); setZipErrorMessage(""); }} />
                                            </FormGroup>
                                        </Stack>
                                    </Grid>


                                </Grid>
                            </Stack>
                        </DialogContent>
                    </>
                    <br></br>

                    <Stack spacing={3}
                    >
                        <Box sx={{
                            paddingBottom: "20px",
                            paddingRight: '20px',
                            paddingLeft: '20px',

                        }} >
                            <Grid paddingBottom="10px"
                                container columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={4} sm={8} md={12} >
                                    <Button
                                        style={{
                                            // marginRight: '10px',
                                            // marginLeft:'10px',

                                            width: "100%"
                                        }}
                                        variant="contained"
                                        onClick={updateContact} > Update Contact
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={4} sm={8} md={12} >
                                    <Button
                                        paddingTop="50px"
                                        style={{

                                            // marginRight: '10px',
                                            // marginLeft:'10px',
                                            width: "100%"
                                        }}
                                        variant="contained"
                                        onClick={deleteContact} > Delete Contact
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>


                    </Stack>

                </Box>

            </Box>
            <br></br>
        </>
    );
}

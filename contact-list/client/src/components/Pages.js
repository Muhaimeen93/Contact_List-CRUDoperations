import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import routes from "../routes";

/**
 * Generates routing object for application page navigation
 */
export function Pages() {
    return (
        <Router>
            
            <Box
             sx={{ backgroundImage: "linear-gradient(27deg, rgba(105,8,73,1) 0%, rgba(131,48,104,1) 34%, rgba(90,80,148,1) 63%, rgba(55,91,158,1) 74%, rgba(23,62,117,1) 100%)" }}  >

                <Routes>
                    {
                        // Adds a route for every page specified in routes.js
                        routes.map(({ path, Component, guarded }) => {
                            const intendedPath = <Route exact path={path} element={<Component />} />;
                            return intendedPath;
                        })
                    }
                </Routes>
            </Box>
        </Router>
    );
}
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout({ children }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />

            <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
                <Box sx={{ width: 240, flexShrink: 0 }}>
                    <SideBar />
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    { children }
                </Box>
            </Box>
        </Box>
    );
}

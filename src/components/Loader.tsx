import {Box} from "@mui/material";

export default function Loader() {
    return (
        <Box className={"loader"}>
            <div className={"inner one"}></div>
            <div className={"inner two"}></div>
            <div className={"inner three"}></div>
        </Box>
    );
}
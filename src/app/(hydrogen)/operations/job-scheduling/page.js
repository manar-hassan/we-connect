import TableContain from "./tableContain";
import TableButton from "./tableButton";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{bgcolor:"white",p:3, borderRadius: "20px"}}>
      <TableButton/>
      <TableContain/>
    
    </Box>
  );
}
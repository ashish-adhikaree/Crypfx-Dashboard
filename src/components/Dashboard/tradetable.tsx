import React from "react";
import dynamic from "next/dynamic";
import DashboardCard from "../shared/DashboardCard";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Stack,
} from "@mui/material";

const TradeTable = () => {
  // for select
  const [month, setMonth] = React.useState("3");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard title="Recent Trades">
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 0 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trades
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Lot
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Results
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[0, 1, 2].map((index) => (
              <TableRow key={index}> 
                <TableCell sx={{ pl: 0 }}>
                  <Stack direction="row" spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        -
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    -
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">-</Typography>
                </TableCell>
                <TableCell>
                  <Typography>-</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TradeTable;

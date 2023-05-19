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


const ApplicationHistory = () => {
  return (
    <DashboardCard title="Application History" action={<></>}>
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
                  Amount
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  CryptoCurrency
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Address
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Added At
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ pl: 0 }}>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      $5000.00
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
                  TRX - TRON
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">xkwekfdssdkf.....</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    bgcolor: (theme) => theme.palette.success.light,
                    color: (theme) => theme.palette.success.main,
                    borderRadius: "6px",
                    width: 80,
                  }}
                  size="small"
                  label="Confirmed"
                />
              </TableCell>
              <TableCell>
                <Typography>15th May, 2023</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ApplicationHistory;

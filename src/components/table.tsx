import React from "react";
import dynamic from "next/dynamic";
import DashboardCard from "./shared/DashboardCard";
import CustomSelect from "./forms/theme-elements/CustomSelect";
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
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

const CustomTable: React.FC<{
  title: string;
  columns: Array<string>;
  data: Array<any>;
}> = ({ title, columns, data }) => {
  const router = useRouter();
  //For user's status change
  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    userid: string
  ) => {
    const { data } = await axios.post("/api/changeStatus", {
      status: event.target.value,
      userid: userid,
    });
    console.log(data);
  };

  return (
    <DashboardCard title={title} action={<></>}>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "rgba(58, 58, 58, .15)" }}>
              {columns.map((text) => {
                return (
                  <TableCell key={text} sx={{ pl: 2, minWidth: "150px" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {text}
                    </Typography>
                  </TableCell>
                );
              })}
              {title === "All Customers" && (
                <TableCell sx={{ pl: 2, minWidth: "150px" }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.userid}>
                {columns.map((text) => {
                  const key = text.toLowerCase().replaceAll(" ", "");
                  if (title === "All Customers" && key === "status") {
                    return (
                      <TableCell key={key} sx={{ pl: 2, minWidth: "150px" }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          <CustomSelect
                            labelId="status-dd"
                            id="status-dd"
                            size="small"
                            defaultValue={row[key]}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleStatusChange(e, row.userid);
                            }}
                          >
                            <MenuItem value={"Active"}>Active</MenuItem>
                            <MenuItem value={"Inactive"}>Inactive</MenuItem>
                          </CustomSelect>
                        </Typography>
                      </TableCell>
                    );
                  } else if (
                    title === "All Withdrawals" &&
                    key === "cryptocurrency"
                  ) {
                    return (
                      <TableCell key={key} sx={{ pl: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Box>
                            {/* <Image src={row[key].icon} height={20} width={20} alt={row[key].name}/> */}
                            <Typography
                              sx={{ textTransform: "capitalize" }}
                              variant="subtitle2"
                              fontWeight={600}
                            >
                              {row[key].code} - {row[key].name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={key} sx={{ pl: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {row[key]}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                    );
                  }
                })}

                {title === "All Customers" && (
                  <TableCell sx={{ pl: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Box sx={{display:"flex", alignItems:"center", gap:"10px"}}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            router.push(
                              `/questionnaires/${row.userid}?name=${row.firstname}`
                            );
                          }}
                        >
                          View Questionnaire
                        </Button>
                        <Button
                          variant="outlined"
                          color ="success"
                          onClick={() => {
                            router.push(
                              `/chat/${row.userid}?name=${row.firstname} ${row.lastname}`
                            );
                          }}
                        >
                          Chat
                        </Button>
                      </Box>
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default CustomTable;

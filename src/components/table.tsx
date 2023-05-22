import React, { useState } from "react";
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
  Modal,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { WITHDRAWTABLECURRENCIES } from "../constants";
import { errorToast, successToast } from "../../customToasts";
import { error } from "console";

const CustomTable: React.FC<{
  title: string;
  columns: Array<string>;
  data: Array<any>;
  getAllWithdrawals?: () => void;
}> = ({ title, columns, data, getAllWithdrawals }) => {
  const router = useRouter();
  const [isAlertOpen, setAlert] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  // user id whose withdraw status is being changed
  const [withdrawUserid, setWithdrawUserid] = useState("");

  //For user's status change
  const handleUserStatusChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    userid: string
  ) => {
    const { data } = await axios.post("/api/changeStatus", {
      status: event.target.value,
      userid: userid,
    });
  };

  //For user's status change
  const handleWithdrawalStatusChange = async (status: string) => {
    console.log(withdrawUserid);
    const { data } = await axios.post("/api/changeWithdrawStatus", {
      status: status,
      userid: withdrawUserid,
    });

    if (data.status === "success") {
      successToast(data.message);
      if (getAllWithdrawals) {
        getAllWithdrawals();
      }
    } else if (data.status == "error") {
      errorToast(data.message);
    }
  };

  return (
    <DashboardCard title={title} action={<></>}>
      <>
        <Modal
          open={isAlertOpen}
          onClose={() => {
            setAlert(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ background: "#ffffff", padding: "30px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to update the withdraw status?
            </Typography>
            <Box sx={{ marginTop: "30px" }}>
              <Button
                variant="outlined"
                color="warning"
                sx={{
                  mr: 1,
                }}
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAlert(false);
                  handleWithdrawalStatusChange(newStatus);
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
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
              <TableRow>
                {columns.map((text) => {
                  return (
                    <TableCell key={text} sx={{ pl: 2, minWidth: "150px" }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {text}
                      </Typography>
                    </TableCell>
                  );
                })}
                {(title === "All Customers" || title === "Chats") && (
                  <TableCell sx={{ pl: 2, minWidth: "150px" }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <Box
                    sx={{
                      width: "600%",
                      textAlign: "center",
                      paddingBlock: "40px",
                    }}
                  >
                    <Typography>No records</Typography>
                  </Box>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.userid}>
                    {columns.map((text) => {
                      const key = text.toLowerCase().replaceAll(" ", "");
                      if (title === "All Customers" && key === "status") {
                        return (
                          <TableCell
                            key={key}
                            sx={{ pl: 2, minWidth: "150px" }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              <CustomSelect
                                labelId="status-dd"
                                id="status-dd"
                                size="small"
                                defaultValue={row[key]}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  handleUserStatusChange(e, row.userid);
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
                        key === "status"
                      ) {
                        return (
                          <TableCell
                            key={key}
                            sx={{ pl: 2, minWidth: "150px" }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              <CustomSelect
                                labelId="status-dd"
                                id="status-dd"
                                size="small"
                                value={row[key]}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  setWithdrawUserid(row.traderid);
                                  setAlert(true);
                                  setNewStatus(e.target.value);
                                }}
                                sx={{
                                  background:
                                    row[key] === "Pending"
                                      ? "orange"
                                      : row[key] === "Approved"
                                      ? "#5FCD62"
                                      : "#f87171",
                                  color:
                                    row[key] === "Pending" ? "black" : "white",
                                }}
                              >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                              </CustomSelect>
                            </Typography>
                          </TableCell>
                        );
                      } else if (
                        title === "Withdraw History" &&
                        key === "status"
                      ) {
                        return (
                          <TableCell
                            key={key}
                            sx={{ pl: 2, minWidth: "150px" }}
                          >
                            <Typography variant="subtitle2" fontWeight={600}>
                              <Typography
                                sx={{
                                  background:
                                    row[key] === "Pending"
                                      ? "orange"
                                      : row[key] === "Approved"
                                      ? "#5FCD62"
                                      : "#f87171",
                                  color:
                                    row[key] === "Pending" ? "black" : "white",
                                  padding: "5px 10px",
                                  width: "fit-content",
                                  borderRadius: "5px",
                                }}
                              >
                                {row[key]}
                              </Typography>
                            </Typography>
                          </TableCell>
                        );
                      } else if (
                        (title === "All Withdrawals" ||
                          title === "Withdraw History") &&
                        key === "cryptocurrency"
                      ) {
                        const currency = WITHDRAWTABLECURRENCIES[row[key]];
                        return (
                          <TableCell key={key} sx={{ pl: 2 }}>
                            <Stack direction="row" spacing={2}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <Image
                                  src={currency.img}
                                  height={20}
                                  width={20}
                                  style={{ objectFit: "contain" }}
                                  alt={row[key].name}
                                />
                                <Typography
                                  sx={{ textTransform: "capitalize" }}
                                  variant="subtitle2"
                                  fontWeight={600}
                                >
                                  {currency.label}
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
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                >
                                  {(title === "Withdraw History" ||
                                    title === "All Withdrawals") &&
                                  key === "amount"
                                    ? `$ ${row[key]}`
                                    : row[key]}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                        );
                      }
                    })}

                    {title === "Chats" && (
                      <TableCell sx={{ pl: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="success"
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

                    {title === "All Customers" && (
                      <TableCell sx={{ pl: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Button
                              variant="outlined"
                              onClick={() => {
                                router.push(
                                  `/application/${row.userid}?name=${row.firstname}`
                                );
                              }}
                            >
                              View Applications
                            </Button>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                router.push(
                                  `/kyc/${row.userid}?name=${row.firstname} ${row.lastname}`
                                );
                              }}
                            >
                              View KYC
                            </Button>
                          </Box>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </DashboardCard>
  );
};

export default CustomTable;

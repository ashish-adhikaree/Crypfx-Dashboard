import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../../src/components/container/Pagecontainer";
import CustomTable from "../../src/components/table";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import { Box, Typography } from "@mui/material";

const title = "Chats";
const columns = ["USER ID", "FIRST NAME", "LAST NAME", "EMAIL", "NOT RESPONDED"];

const Customers = () => {
  const router = useRouter();
  const { type } = useContext(AuthContext);
  const [allCustomers, setAllCustomers] = useState<any>();
  const getCustomers = async () => {
    try {
      const { data } = await axios.get("/api/getChatList");
      if (data.status === "success") {
        setAllCustomers(data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getCustomers();
  }, []);

  if (type === "Customer") {
    router.push("/");
  }

  return (
    <PageContainer>
      <Head>
        <title>Chats | Crypfx</title>
      </Head>
      {allCustomers && (
        <CustomTable title={title} columns={columns} data={allCustomers} />
      )}
    </PageContainer>
  );
};

export default Customers;

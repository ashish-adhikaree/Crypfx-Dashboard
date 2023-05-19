import React, { useEffect, useState } from "react";
import PageContainer from "../src/components/container/Pagecontainer";
import CustomTable from "../src/components/table";
import axios from "axios";
import Head from "next/head";

const title = "All Customers";
const columns = [
  "USER ID",
  "FIRST NAME",
  "LAST NAME",
  "EMAIL",
  "STATUS",
  "MEMBER SINCE",
];

const Customers = () => {
  const [allCustomers, setAllCustomers] = useState<any>();
  const getCustomers = async () => {
    try {
      const { data } = await axios.get("/api/getAllCustomers");
      if (data.status === "success") {
        setAllCustomers(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <PageContainer>
       <Head>
        <title>Customers | Crypfx</title>
      </Head>
      {allCustomers && (
        <CustomTable title={title} columns={columns} data={allCustomers} />
      )}
    </PageContainer>
  );
};

export default Customers;

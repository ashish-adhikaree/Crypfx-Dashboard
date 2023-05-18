import React, { useEffect, useState } from "react";
import PageContainer from "../src/components/container/Pagecontainer";
import CustomTable from "../src/components/table";
import axios from "axios";

const title = "All Customers";
const columns = [
  "USER ID",
  "FIRST NAME",
  "LAST NAME",
  "USERNAME",
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
      {allCustomers && (
        <CustomTable title={title} columns={columns} data={allCustomers} />
      )}
    </PageContainer>
  );
};

export default Customers;

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const Invoice = ({ order }) => {
  //

  return (
    <Document >
      <Page>
        <Text>
          RNT COMPUTER APP
        </Text>
       
      </Page>
    </Document>
  );
};

export default Invoice;

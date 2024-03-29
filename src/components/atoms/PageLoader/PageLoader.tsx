import React from "react";
import { Box, Skeleton } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 2,
      }}
    >
      <Skeleton variant="rounded" sx={{ width: "100%" }} height={60} />
      <Skeleton variant="rounded" sx={{ width: "100%" }} height={450} />
    </Box>
  );
};

export default PageLoader;

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";

export const PositionedSnackbar: React.FC<{ show: boolean, message: string }> = ({ show, message }) => {
  const [open, setOpen] = useState(false);

  const showSnackbar = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (show) {
      showSnackbar()
    }
  }, [show])

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => handleClose()}
        message={message}
      />
    </Box>
  );
};

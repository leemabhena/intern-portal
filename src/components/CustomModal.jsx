import React from "react";

export default function CustomModal() {
  const [open, setOpen] = React.useState(false);
  const [nav, setNav] = React.useState("user");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
}

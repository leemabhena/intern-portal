import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CreateRandomId from "./CreateRandomId";

import "./Navigation.css";
import CreatePost from "./CreatePost";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navigation = ({ supabase, user }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event) => {
    setOpen(true);
    setModal(event.target.dataset.id);
  };
  const handleClose = () => setOpen(false);

  const [modal, setModal] = React.useState("post");

  return (
    <div className="nav">
      <nav className="Navigation">
        <i
          className="fa-solid fa-users-gear"
          onClick={handleOpen}
          data-id="user"
        ></i>
        <div className="rule"></div>
        <a href="/">
          <i className="fa-solid fa-house"></i>
        </a>
        <i
          class="fa-solid fa-plus"
          title="create post"
          onClick={handleOpen}
          data-id="post"
        ></i>
        {/* <i className="fa-solid fa-briefcase"></i>
        <i className="fa-solid fa-code"></i>
        <i className="fa-solid fa-gear settings"></i> */}
      </nav>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modal == "post" ? (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Job Post
              </Typography>
              <CreatePost supabase={supabase} user={user} />{" "}
            </div>
          ) : (
            <CreateRandomId user={user} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Navigation;

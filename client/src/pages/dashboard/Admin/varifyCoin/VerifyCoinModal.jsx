import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import {
  GetAllDepositeCoin,
  VerifyDepositeCoin,
} from "../../../../redux/features/deposite/deposite.action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: " 1px solid #000 ",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export default function VerifyCoinModal({ btnname, deposite_id, user_id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const addToVerifyNow = ({ deposite_id, user_id }) => {
    console.log("clicked");
    dispatch(
      VerifyDepositeCoin({
        deposite_id: deposite_id,
        is_recharge: true,
        user_id: user_id,
      })
    );
    dispatch(GetAllDepositeCoin());
    setOpen(false);
  };
  // console.log(deposite_id, is_recharge, user_id);
  return (
    <div>
      <Button onClick={handleOpen} className="text-white bg-[green]">
        {btnname}
      </Button>
      {open && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="rounded-md">
              <button className="bg-[green] p-2  uppercase font-semibold rounded-md">
                Coin Verification
              </button>
              <p className="text-black py-6 capitalize">
                Are You Sure Want to Verify this user
              </p>
              <div className="flex justify-end gap-5">
                <button
                  className="bg-[red] text-white p-2 rounded-md uppercase"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[blue] text-white p-2 rounded-md uppercase"
                  onClick={() =>
                    addToVerifyNow({
                      deposite_id,
                      user_id,
                    })
                  }
                >
                  Verify Now
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}

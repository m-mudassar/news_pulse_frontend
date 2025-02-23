import {useDispatch, useSelector} from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {hideSnackbar} from "../../store/modules/ui-triggers/snackbar/snackbarSlice.js";

export const AppSnackbar = () => {
    const dispatch = useDispatch();
    const {open, message, severity} = useSelector((state: any) => state.snackbar);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => dispatch(hideSnackbar())}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
        >
            <Alert onClose={() => dispatch(hideSnackbar())} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

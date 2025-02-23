import {BrowserRouter} from "react-router";
import {AppRoutes} from "./routes";
import {theme} from "./theme.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import "./App.css";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AppSnackbar} from "./components/AppSnackbar/AppSnackbar.tsx";
function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <AppSnackbar/>
              <CssBaseline/>
              <AppRoutes/>
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      </LocalizationProvider>
  );
}

export default App;

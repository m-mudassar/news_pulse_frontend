import React from "react";
import {Autocomplete, CircularProgress, TextField, Typography} from "@mui/material";
import {isEmpty} from "../../../helpers/utils.tsx";

interface MyAutocompleteProps {
    label?: string;
    helperText?: string;
    options: any;
    value?: any;
    placeholder?: string;
    onChange: (value: any) => void;
    onFocus: (value: any) => void;
    onInputChange?: (event: React.SyntheticEvent, newInputValue: string) => void;
    fullWidth?: boolean;
    isLoading?: boolean;
    multiple?: boolean;
}


export const MyAutocomplete: React.FC<MyAutocompleteProps> = ({
                                                                  label,
                                                                  helperText = "",
                                                                  options = [],
                                                                  value = undefined,
                                                                  placeholder = "Select an option",
                                                                  onChange,
                                                                  onFocus,
                                                                  fullWidth = false,
                                                                  isLoading = false,
                                                                  multiple = false,
                                                                  ...props
                                                              }) => {
    return (
        <div style={{width: fullWidth ? "100%" : "auto"}}>
            {label && (
                <Typography
                    variant="body2"
                    sx={{
                        marginBottom: ".5rem",
                        fontWeight: "500",
                        textAlign: "left",
                    }}
                >
                    {label}
                </Typography>
            )}

            <Autocomplete
                multiple={multiple}
                options={options}
                value={value ?? undefined}
                disableClearable
                onChange={(_event, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        error={!!helperText}
                        helperText={helperText || " "}
                        sx={(theme) => ({
                            "& .MuiOutlinedInput-root": {
                                borderRadius: ".5rem",
                                "&.Mui-focused fieldset": {
                                    border: !isEmpty(helperText)
                                        ? `1px solid ${theme.palette.error.main}`
                                        : `1px solid ${theme.palette.primary.main}`,
                                },
                            },
                            "& .MuiFormHelperText-root": {
                                border: "none",
                                margin: 0,
                                fontSize: "14px",
                                fontWeight: "400",
                                color: helperText ? theme.palette.error.main : "inherit",
                            },
                            marginTop: "0px",
                            padding: "0px",
                        })}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {isLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),

                            }
                        }}
                    />
                )}
                {...props}
            />
        </div>
    );
};

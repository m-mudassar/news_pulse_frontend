import {TextField, TextFieldProps, Typography} from "@mui/material";
import {isEmpty} from "../../../helpers/utils.js";
import React from "react";

interface MyTextFieldProps extends Omit<TextFieldProps, "error" | "helperText" > {
    label?: string;
    error?: boolean;
    helperTextSpace?: boolean;
    helperText?: string;
    multiline?: boolean;
    rows?: number;
}

export const MyTextField: React.FC<MyTextFieldProps> = ({
                                                            label,
                                                            helperText,
                                                            multiline = false,
                                                            helperTextSpace = true,
                                                            rows = 2,
                                                            ...props
                                                        }) => {
    const handleFocus = (event: any) => {
        const targetType = event.target.type;
        if (targetType === "time" || targetType === "date") {
            event.target.showPicker?.();
        }
    };
    return (
        <div>
            {label && (
                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        textAlign: "left",
                        marginBottom: ".5rem",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                    })}
                >
                    {label}
                </Typography>
            )}
            <TextField
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
                        margin: 0,
                    },
                    "& .MuiFormHelperText-root.Mui-error": {
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "400",
                        margin: "0",
                        color: `${theme.palette.error.main}`,
                    },
                    marginTop: "0px",
                    padding: "0px",
                })}
                slotProps={{
                    formHelperText: {
                        sx: {
                            minHeight: helperTextSpace ? "20px" : '',
                        },
                    },
                    inputLabel: {
                        shrink: false,
                    },
                }}
                onFocus={handleFocus}
                hiddenLabel
                margin="none"
                autoComplete="off"
                variant={"outlined"}
                error={!isEmpty(helperText)}
                helperText={isEmpty(helperText) && helperTextSpace ? " " : helperText || undefined}
                multiline={multiline}
                rows={multiline ? rows : undefined}
                {...props}
            />
        </div>
    );
};

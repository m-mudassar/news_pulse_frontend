import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface PrimaryButtonProps extends Omit<ButtonProps, "variant"> {
    children: React.ReactNode;
    variant?: "contained" | "outlined";
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
                                                                children,
                                                                variant = "contained",
                                                                isLoading = false,
                                                                fullWidth,
                                                                ...props
                                                            }) => {
    return (
        <Button
            sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: ".5rem",
                padding: "10px 20px",
                width: fullWidth ? "100%" : "auto",
            }}
            variant={variant}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : children}
        </Button>
    );
};

import {Box, IconButton, Typography} from "@mui/material";
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import * as Yup from "yup";
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from 'react'
import {MyTextField} from "../../../components/Wrappers/MyTextField/MyTextField.tsx";
import {PrimaryButton} from "../../../components/Wrappers/PrimaryButton/PrimaryButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {ActionTypes} from "../../../store/ActionTypes.tsx";
import {useNavigate} from "react-router";
import {selectIsRegisteringUser} from "../../../store/modules/auth/register/registerSelectors.tsx";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRegisteringUser = useSelector(selectIsRegisteringUser);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const resetFormErrors = () => {
        setFormErrors({name: '', email: '', password: '', confirmPassword: ''});
    }
    const handleChanges = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        resetFormErrors();
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required."),
        email: Yup.string().email("Invalid email").required("Email is required."),
        password: Yup.string()
            .required("Password is required.")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
            .required("Confirm password is required.")
            .oneOf([Yup.ref("password")], "Passwords must match"),
    });

    const validateForm = async (): Promise<boolean> => {
        try {
            await validationSchema.validate(formData, {abortEarly: false});
            resetFormErrors();
            return true;
        } catch (err) {
            const validationErrors: any = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
            }

            setFormErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async () => {
        const isValid = await validateForm();
        if (isValid) {
            dispatch({
                type: ActionTypes.REGISTER, payload: {
                    formData: {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    },
                    navigate: navigate
                }
            })
        }
    };

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined" sx={{borderRadius: '.7rem'}}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Register
                </Typography>
                <Box
                    component={'form'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <MyTextField
                            label={'Name'}
                            helperText={formErrors.name}
                            value={formData.name}
                            name="name"
                            placeholder="john doe"
                            autoFocus
                            fullWidth
                            variant="outlined"
                            onChange={handleChanges}
                        />

                        <MyTextField
                            label={'Email'}
                            helperText={formErrors.email}
                            value={formData.email}
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChanges}
                        />

                        <MyTextField
                            label={'Password'}
                            helperText={formErrors.password}
                            value={formData.password}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••"

                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleChanges}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            tabIndex={-1}
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    ),
                                }
                            }}
                        />


                        <MyTextField
                            label={'Confirm Password'}
                            helperText={formErrors.confirmPassword}
                            value={formData.confirmPassword}
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••"
                            autoComplete="current-password"
                            required
                            fullWidth

                            variant="outlined"
                            onChange={handleChanges}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            tabIndex={-1}
                                            onClick={toggleConfirmPasswordVisibility}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    ),
                                }
                            }}
                        />
                    </FormControl>

                    <PrimaryButton
                        isLoading={isRegisteringUser}
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Register
                    </PrimaryButton>
                </Box>
                <Divider>or</Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>

                    <Typography sx={{textAlign: 'center'}}>
                        Already have an account? {' '}
                        <Link
                            href="/auth/login/"
                            variant="body2"
                            sx={{alignSelf: 'center'}}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    );
}

export default Register;
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import Link from "next/link";
import { loginType } from "../../../src/types/auth/auth";
import CustomCheckbox from "../../../src/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../../src/components/forms/theme-elements/CustomFormLabel";

import AuthSocialButtons from "./AuthSocialButtons";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import React, { useState } from "react";
import { CheckCircle, EmailOutlined } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { errorToast, successToast } from "../../../customToasts";

const SIGNUPFIELDS = [
  {
    label: "First Name",
    placeholder: "Your first name",
    name: "firstname",
    icon: <PersonOutlinedIcon />,
  },
  {
    label: "Last Name",
    placeholder: "Your last name",
    name: "lastname",
    icon: <PersonOutlinedIcon />,
  },
  {
    label: "Email Address",
    placeholder: "Your email",
    name: "email",
    icon: <EmailOutlined />,
  },
  {
    label: "Password",
    placeholder: "Your password",
    name: "password",
    icon: <KeyOutlinedIcon />,
  },
  {
    label: "Confirm Password",
    placeholder: "Reenter your password",
    name: "confirmpassword",
    icon: <KeyOutlinedIcon />,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const CustomInputField: React.FC<{
  label: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  handleFormFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmailValid?: boolean;
  onKeyUp?: (e: React.KeyboardEvent) => void;
}> = ({
  label,
  name,
  icon,
  placeholder,
  handleFormFieldChange,
  isEmailValid,
  onKeyUp,
}) => {
  return (
    <div
      style={{
        border: "1px solid #c4c4c4",
        borderRadius: "8px",
        padding: "10px 30px",
        marginBlock: "20px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          borderRight: "1px solid #c4c4c4",
          paddingRight: "20px",
          display: "flex",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flexGrow: "1",
          }}
        >
          <p
            style={{
              padding: 0,
              margin: 0,
              fontSize: "12px",
            }}
          >
            {label}
          </p>
          <input
            name={name}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontWeight: "700",
            }}
            type={
              name === "password" || name === "confirmpassword"
                ? "password"
                : "text"
            }
            onChange={handleFormFieldChange}
          />
        </div>
        {name === "email" && (
          <div
            style={{
              display: "flex",
            }}
          >
            {isEmailValid ? (
              <CheckCircle color="success" />
            ) : (
              <CancelIcon color="error" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthLogin = ({ subtitle }: loginType) => {
  const [type, setType] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [isEmailValid, setEmailValidity] = useState(true);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setEmailValidity(true);
    setStep(1);
    setType(newValue);
    setFormData({});
  };

  const handleLogin = async (formData: any) => {
    try {
      const { data } = await axios.post("/api/auth/login", formData);
      if (data.status === "success") {
        await router.push("/");
        router.reload()
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } catch (err) {
      errorToast("Something went Wrong, Please refresh the site");
    }
  };
  const handleSignup = async (formData: any) => {
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      if (data.status === "success") {
        setFormData({});
        successToast(data.message);
        setType(0);
      } else if (data.status === "error") {
        errorToast(data.message);
      }
    } catch (err) {}
  };

  const handleFormFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.name === "email") {
      const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.exec(event.target.value);
      if (event.target.value === "" || res !== null) {
        setEmailValidity(true);
      } else {
        setEmailValidity(false);
      }
    }
    const temp = { ...formData };
    temp[event.target.name] = event.target.value;
    setFormData(temp);
  };

  const handleAgreeToPolicy = (e: React.SyntheticEvent, checked: boolean) => {
    const temp = { ...formData };
    temp["agreetopolicy"] = checked;
    setFormData(temp);
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: { xs: "40px", sm: "65px", md: "80px" },
        }}
      >
        <Logo />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography fontWeight="700" variant="h3" mb={1}>
          {type === 0 && "Welcome Back"}
          {type === 1 && "One step closer"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 500 }}
          color="#929292"
          mb={1}
        >
          {type === 0 && "Signin to continue."}
          {type === 1 && "Register an account here."}
        </Typography>
      </Box>

      <Box
        sx={{
          minWidth: "min(100% , 400px)",
          maxWidth: "min(100%, 400px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={type}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              backgroundColor: "#F0EEF3",
              color: "#ACADAE",
              borderRadius: "8px",
              paddingInline: "3px",
              marginTop: "20px",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .Mui-selected": {
                backgroundColor: "white",
                color: "#000000 !important",
                borderRadius: "8px",
              },
            }}
          >
            <Tab
              sx={{ width: "50%", margin: "3px", fontWeight: "900" }}
              label="Sign in"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ width: "50%", margin: "3px", fontWeight: "900" }}
              label="Signup"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={type} index={0}>
          {/* Sign in  */}
          <Stack width={"100%"}>
            {step === 1 && (
              <CustomInputField
                label="Email Address"
                placeholder="Your email "
                name="email"
                onKeyUp={(e: React.KeyboardEvent) => {
                  if (
                    formData.email &&
                    formData.email !== "" &&
                    isEmailValid &&
                    (e.key === "Enter" || e.keyCode === 13)
                  ) {
                    setStep(step + 1);
                  }
                }}
                handleFormFieldChange={handleFormFieldChange}
                isEmailValid={isEmailValid}
                icon={<EmailOutlined />}
              />
            )}
            {step === 2 && (
              <>
                <CustomInputField
                  label="Password"
                  placeholder="Your password"
                  name="password"
                  onKeyUp={(e: React.KeyboardEvent) => {
                    if (
                      formData.email &&
                      formData.email !== "" &&
                      formData.password &&
                      formData.password.length > 5 &&
                      isEmailValid &&
                      (e.key === "Enter" || e.keyCode === 13)
                    ) {
                      handleLogin(formData);
                    }
                  }}
                  handleFormFieldChange={handleFormFieldChange}
                  icon={<KeyOutlinedIcon />}
                />
                <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  mb={2}
                >
                  <Typography
                    component={Link}
                    href={`/auth/forgot-password?email=${formData.email}`}
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Forgot Password ?
                  </Typography>
                </Stack>
              </>
            )}
          </Stack>
          <Box>
            {step === 2 ? (
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => {
                  handleLogin(formData);
                }}
                type="submit"
                disabled={
                  !formData.email ||
                  !formData.password ||
                  formData.password.length < 6
                }
              >
                Sign In
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  setStep(step + 1);
                }}
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={
                  !formData.email ||
                  formData.email.length == "" ||
                  !isEmailValid
                }
              >
                Continue
              </Button>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={type} index={1}>
          {/* Sign up  */}
          {step === 1 && (
            <>
              {SIGNUPFIELDS.map((field) => (
                <CustomInputField
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  isEmailValid={field.name === "email" && isEmailValid}
                  handleFormFieldChange={handleFormFieldChange}
                  icon={field.icon}
                />
              ))}
              <FormGroup sx={{ marginBottom: "20px" }}>
                <FormControlLabel
                  control={<CustomCheckbox />}
                  label={
                    <p>
                      I agree to{" "}
                      <Link
                        style={{
                          textDecoration: "underline",
                          color: "black",
                        }}
                        href="https://crypfx.uk/term-and-conditions/"
                      >
                        Terms and Conditions
                      </Link>
                    </p>
                  }
                  name="agreetopolicy"
                  onChange={handleAgreeToPolicy}
                />
              </FormGroup>
            </>
          )}
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={() => {
                handleSignup(formData);
              }}
              type="submit"
              disabled={
                !formData.firstname ||
                formData.firstname.length == "" ||
                !formData.lastname ||
                formData.lastname.length == "" ||
                !formData.email ||
                formData.email.length == "" ||
                !formData.password ||
                formData.password.length < 6 ||
                !formData.confirmpassword ||
                formData.password !== formData.confirmpassword ||
                !formData.agreetopolicy
              }
            >
              Sign Up
            </Button>
          </Box>
        </TabPanel>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;

import { Button, Stack } from "@mui/material";
import Link from "next/link";

import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "../../../src/components/forms/theme-elements/CustomFormLabel";

type PROPS = {
  email: string;
  setEmail: React.Dispatch<string>;
  handleForgot: () => void;
};
const AuthForgotPassword: React.FC<PROPS> = ({
  email,
  setEmail,
  handleForgot,
}) => (
  <>
    <Stack mt={4} spacing={2}>
      <CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
      <CustomTextField
        id="reset-email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />

      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={handleForgot}
      >
        Forgot Password
      </Button>
      <Button
        color="primary"
        size="large"
        fullWidth
        component={Link}
        href="/auth/login"
      >
        Back to Login
      </Button>
    </Stack>
  </>
);

export default AuthForgotPassword;

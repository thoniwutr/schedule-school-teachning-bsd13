import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import Button from "../ui-kit/Button";
import InputGroup from "../ui-kit/InputGroup";
import Text from "../ui-kit/Text";

import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingButton from "@mui/lab/LoadingButton";

const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;

  a:link {
    color: #2c46b5;
    text-decoration: none;
  }
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`;

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type Props = {
  onSubmit: (value: { email: string; password: string }) => Promise<void>;
};

export default function LoginForm(props: Props) {
  const {
    values,
    errors,
    handleChange,
    isSubmitting,
    submitForm,
    handleSubmit,
  } = useFormik<{
    email: string;
    password: string;
  }>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: props.onSubmit,
    validationSchema: SignInValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <Wrapper onSubmit={handleSubmit} noValidate>
      <InputGroup
        label="Email Address"
        id="email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        disabled={isSubmitting}
        placeholder="Email address"
        autoFocus
        required
      />
      <InputGroup
        label="Password"
        id="password"
        name="password"
        type="password"
        value={values.password}
        error={errors.password}
        disabled={isSubmitting}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <LoadingButton
        disabled={isSubmitting}
        onClick={submitForm}
        loading={isSubmitting}
        sx={{
          fontFamily: "LexendDeca",
          mt: 2,
          bgcolor: "#2c46b5",
          color: "#fff",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#001da0",
          },
        }}
        variant="contained"
      >
        Login
      </LoadingButton>
    </Wrapper>
  );
}

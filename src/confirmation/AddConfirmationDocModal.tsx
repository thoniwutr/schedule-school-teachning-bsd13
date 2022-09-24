import { useState } from "react";
import { authenticatedRestClient } from "../api/RestClient";
import styled from "styled-components/";
import format from "date-fns/format";

import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCloseButton,
} from "../ui-kit/Modal";
import Text from "../ui-kit/Text";
import InputGroup from "../ui-kit/Input";
import { RemoveScroll } from "react-remove-scroll";

import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";
import { IConfirmationDocument } from "./types";
import * as Yup from "yup";
import { useFormik } from "formik";

export const InputWrapper = styled.div`
  padding: 10px 0px;
`;

type Props = {
  onClose: () => void;
  onSuccess?: () => Promise<void>;
};

export default function AddConfirmationDocModal(props: Props) {
  const { onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    confirmationName: Yup.string().required(),
  });

  const handleOnSubmit = async (payload: { confirmationName; createDate }) => {
        try{
            await authenticatedRestClient.post('confirmation', payload)
        }catch(err){
            console.log('fsdfds')
        }
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik<IConfirmationDocument>({
      enableReinitialize: true,
      initialValues: {
        confirmationName: "",
        createDate: format(new Date(), "dd MMM yy', 'HH:mm:ss"),
      },
      validationSchema: validationSchema,
      onSubmit: handleOnSubmit,
      validateOnBlur: false,
      validateOnChange: false,
    });

  const isValidData = values.confirmationName;

  return (
    <RemoveScroll>
      <Modal>
        <ModalBackground />
        <ModalCard
          height="auto"
          style={{
            position: "relative",
            padding: "0 36px 26px 36px",
            width: "450px",
            overflow: "auto",
          }}
        >
          <Text
            size={20}
            family="LexendDeca"
            weight="normal"
            align="center"
            color="black"
            style={{
              marginTop: "26px",
              marginBottom: "10px",
            }}
          >
            Create Confirmation Document
          </Text>
          <InputWrapper>
            <InputGroup
              label="confirmationName"
              id="confirmationName"
              name="confirmationName"
              type="text"
              value={values.confirmationName}
              error={errors.confirmationName}
              disabled={isSubmitting}
              onChange={handleChange}
              placeholder="Confirmation Name"
              required
            />
          </InputWrapper>

          <LoadingButton
            disabled={!isValidData || isSubmitting}
            onClick={() => handleSubmit()}
            loading={loading}
            sx={{
              fontFamily: "Assistant",
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
            Save Changes
          </LoadingButton>
          <ModalCloseButton onClick={props.onClose} />
        </ModalCard>
      </Modal>
    </RemoveScroll>
  );
}

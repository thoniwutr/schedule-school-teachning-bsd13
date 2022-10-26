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
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from '../sc-toast/Toast'
import { IConfirmationDocument, IConfirmationDocumentResponse } from "../confirmation/types";
import Dropdown from "../ui-kit/Dropdown";

export const InputWrapper = styled.div`
  padding: 10px 0px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

type Props = {
  confirmation: IConfirmationDocumentResponse[]
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function AddConfirmationDocModal(props: Props) {
  const { onClose, onSuccess, confirmation } = props;

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    scheduleName: Yup.string().required(),
    confirmationId: Yup.string().required(),
  });

  const handleOnSubmit = async (values: { scheduleName, confirmationId }) => {
    try {
      setLoading(true)
      await authenticatedRestClient.post(`create-schedule/${values.confirmationId}`, values)
       setTimeout(() => { 
        setLoading(false)
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: 'Success',
          text: 'Schedule has been created',
          customClass: {
            confirmButton: 'popup-confirm-button',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            onSuccess()
            onClose()
          }
        })
      }, 5000);
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oop.. Something went wrong',
        text: err.response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(false)
        }
      })
    } 
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik<ISubjectInit>({
      initialValues: {
        scheduleName: "",
        confirmationId: confirmation[0].id,
      },
      validationSchema: validationSchema,
      onSubmit: handleOnSubmit,
      validateOnBlur: false,
      validateOnChange: false,
    });

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
            Create New Schedule
          </Text>
          <InputWrapper>
            <InputGroup
              label="scheduleName"
              id="scheduleName"
              name="scheduleName"
              type="text"
              value={values.scheduleName}
              error={errors.scheduleName}
              disabled={isSubmitting}
              onChange={handleChange}
              placeholder="Schedule Name"
              required
            />
            <Dropdown
              id="confirmationId"
              name="confirmationId"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid #b5b5b5",
                borderRadius: "5px",
                padding: "10px",
              }}
              value={values.confirmationId}
              onChange={handleChange}
            >
              {confirmation.map((value, idx) => {
                return (
                  <Dropdown.Item
                    key={idx}
                    value={value.id}
                    displayName={value.confirmationName}
                  />
                );
              })}
            </Dropdown>


          </InputWrapper>

          <LoadingButton
            disabled={isSubmitting || loading}
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


export interface ISubjectInit {
  scheduleName: string
  confirmationId: string
}


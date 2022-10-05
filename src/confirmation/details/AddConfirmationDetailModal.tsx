import { useEffect, useState } from "react";
import { authenticatedRestClient } from "../../api/RestClient";
import styled from "styled-components/";
import format from "date-fns/format";

import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCloseButton,
} from "../../ui-kit/Modal";
import Text from "../../ui-kit/Text";
import InputGroup from "../../ui-kit/Input";
import { RemoveScroll } from "react-remove-scroll";

import LoadingButton from "@mui/lab/LoadingButton";
import Swal from "sweetalert2";
import { IConfirmationDetailPayload } from "./types";
import { toast } from "../../sc-toast/Toast";
import Dropdown from "../../ui-kit/Dropdown";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { Button, FormGroup } from "@mui/material";
import {
  abacus1_ID,
  abacus2_ID,
  abacus3_ID,
  abacus4_ID,
  abacus5_ID,
  math2_ID,
  math3_ID,
  math4_ID,
  math5_ID,
  math6_ID,
  eng1_ID,
  eng2_ID,
  eng3_ID,
  eng4_ID,
  eng5_ID,
  eng6_ID,
  eng7_ID,
  eng8_ID,
  thai1_ID,
  thai2_ID,
  thai3_ID,
  science1_ID,
  science2_ID,
  science3_ID,
  math1_ID,
} from "./utils";
import { connectStorageEmulator } from "firebase/storage";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0px;
`;

export const SubjectSection = styled.div`
  display: flex;
`;

export const SubjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

type Props = {
  confirmationId? : string
  onClose: () => void;
  onSuccess: () => Promise<void>;
};

export default function AddConfirmationDetailModal(props: Props) {
  const { confirmationId, onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [level, setLevel] = useState("2");
  const [period, setPeriod] = useState("MORNING");

  const [math, setMath] = useState("");
  const [advanceMath, setAdvanceMath] = useState("");
  const [abacus, setAbacus] = useState("");
  const [eng, setEng] = useState("");
  const [advanceEng, setAdvanceEng] = useState("");
  const [thai, setThai] = useState("");
  const [science, setScience] = useState("");



  const getSubjectIds = () => {
    const subjects: string[] = [];
    if (math) {
      subjects.push(math);
    }
    if (advanceMath) {
      subjects.push(advanceMath);
    }
    if (abacus) {
      subjects.push(abacus);
    }
    if (eng) {
      subjects.push(eng);
    }
    if (advanceEng) {
      subjects.push(advanceEng);
    }
    if (thai) {
      subjects.push(thai);
    }
    if (science) {
      subjects.push(science);
    }
    return subjects;
  }


  const handleOnSubmit = async () => {
    try{
        await authenticatedRestClient.post(`/confirmation/${confirmationId}`, {
          "confirmationId" : confirmationId,
          "subjectDetailId" : getSubjectIds(),
          "studentName" : studentName,
          "level" : level,
          "period" : period,
        })
        toast.success('Confirmation Document has been created')
        onSuccess()
    }catch(err : any){
      toast.error(err.message)
    }finally{
      onClose()
    }
};


  useEffect(() => {
     const num = getSubjectIds().length
     if(num > 3) {
      setPeriod('BOTH')
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[math, abacus,eng,thai,science,setMath,setAbacus,setEng,setThai,setScience])

  return (
    <RemoveScroll>
      <Modal>
        <ModalBackground />
        <ModalCard
          height="auto"
          style={{
            position: "relative",
            padding: "0 36px 26px 36px",
            width: "1200px",
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
            Create Confirmation Detail
          </Text>
          <InputWrapper>
            <InputGroup
              label="studentName"
              id="studentName"
              name="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student Name"
              required
            />
            <Dropdown
              id="notificationChannel"
              name="notificationChannel"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid #b5b5b5",
                borderRadius: "5px",
                padding: "10px",
              }}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <Dropdown.Item value="2" displayName="ป.2" />
              <Dropdown.Item value="3" displayName="ป.3" />
              <Dropdown.Item value="4" displayName="ป.4" />
              <Dropdown.Item value="5" displayName="ป.5" />
              <Dropdown.Item value="6" displayName="ป.6" />
            </Dropdown>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <FormControlLabel
                value="MORNING"
                control={<Radio />}
                label="เช้า"
              />
              <FormControlLabel
                value="AFTERNOON"
                control={<Radio />}
                label="บ่าย"
              />
              <FormControlLabel
                value="BOTH"
                control={<Radio />}
                label="เช้า-บ่าย"
              />
            </RadioGroup>
            <SubjectSection>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="math"
                  value={math}
                  onChange={(e) => setMath(e.target.value)}
                >
                  <FormControlLabel
                    value={math1_ID}
                    control={<Radio />}
                    label="โจทย์ปัญหา ป.2"
                  />
                  <FormControlLabel
                    value={math2_ID}
                    control={<Radio />}
                    label="โจทย์ปัญหา ป.3"
                  />
                  <FormControlLabel
                    value={math3_ID}
                    control={<Radio />}
                    label="โจทย์ปัญหา ป.4"
                  />
                  <FormControlLabel
                    value={math4_ID}
                    control={<Radio />}
                    label="โจทย์ปัญหา ป.5"
                  />
                  <FormControlLabel
                    value={math5_ID}
                    control={<Radio />}
                    label="โจทย์ปัญหา ป.6"
                  />
                </RadioGroup>
                <Button style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setMath('')}>Clear</Button>
              </SubjectWrapper>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="avanceMath"
                  value={advanceMath}
                  onChange={(e) => setAdvanceMath(e.target.value)}
                >
                   <FormControlLabel
                    value={math6_ID}
                    control={<Radio />}
                    label="ตะลุยโจทย์เข้า ม.1"
                  />
                </RadioGroup>
                <Button style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setAdvanceMath('')}>Clear</Button>
              </SubjectWrapper>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="abacus"
                  value={abacus}
                  onChange={(e) => setAbacus(e.target.value)}
                >
                  <FormControlLabel
                    value={abacus1_ID}
                    control={<Radio />}
                    label="ลูกคิดระดับ 1"
                  />
                  <FormControlLabel
                    value={abacus2_ID}
                    control={<Radio />}
                    label="ลูกคิดระดับ 2"
                  />
                  <FormControlLabel
                    value={abacus3_ID}
                    control={<Radio />}
                    label="ลูกคิดระดับ 3"
                  />
                  <FormControlLabel
                    value={abacus4_ID}
                    control={<Radio />}
                    label="ลูกคิดระดับ 4"
                  />
                  <FormControlLabel
                    value={abacus5_ID}
                    control={<Radio />}
                    label="ลูกคิดระดับ 5"
                  />
                </RadioGroup>
                <Button  style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setAbacus('')}>Clear</Button>
              </SubjectWrapper>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="eng"
                  value={eng}
                  onChange={(e) => setEng(e.target.value)}
                >
                  <FormControlLabel
                    value={eng1_ID}
                    control={<Radio />}
                    label="Basic Yellow"
                  />
                  <FormControlLabel
                    value={eng2_ID}
                    control={<Radio />}
                    label="Yellow 1"
                  />
                  <FormControlLabel
                    value={eng3_ID}
                    control={<Radio />}
                    label="Yellow 2"
                  />
                  <FormControlLabel
                    value={eng4_ID}
                    control={<Radio />}
                    label="Pre Green"
                  />
                  <FormControlLabel
                    value={eng5_ID}
                    control={<Radio />}
                    label="Green"
                  />
                   <FormControlLabel
                    value={eng6_ID}
                    control={<Radio />}
                    label="Red 1"
                  />
                   <FormControlLabel
                    value={eng7_ID}
                    control={<Radio />}
                    label="Red 2"
                  />
                </RadioGroup>
                <Button  style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setEng('')}>Clear</Button>
              </SubjectWrapper>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="advanceEng"
                  value={advanceEng}
                  onChange={(e) => setAdvanceEng(e.target.value)}
                >
                   <FormControlLabel
                    value={eng8_ID}
                    control={<Radio />}
                    label="Eng ป.6"
                  />
                </RadioGroup>
                <Button style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setAdvanceEng('')}>Clear</Button>
              </SubjectWrapper>


              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="thai"
                  value={thai}
                  onChange={(e) => setThai(e.target.value)}
                >
                  <FormControlLabel
                    value={thai1_ID}
                    control={<Radio />}
                    label="ไทย ป.2-3"
                  />
                  <FormControlLabel
                    value={thai2_ID}
                    control={<Radio />}
                    label="ไทย ป.4-5"
                  />
                  <FormControlLabel
                    value={thai3_ID}
                    control={<Radio />}
                    label="ไทย ป.6"
                  />
                </RadioGroup>
                <Button  style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setThai('')}>Clear</Button>
              </SubjectWrapper>

              <SubjectWrapper>
                <RadioGroup
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="science"
                  value={science}
                  onChange={(e) => setScience(e.target.value)}
                >
                  <FormControlLabel
                    value={science1_ID}
                    control={<Radio />}
                    label="วิทย์ ป.2-3"
                  />
                  <FormControlLabel
                    value={science2_ID}
                    control={<Radio />}
                    label="วิทย์ ป.4-5"
                  />
                  <FormControlLabel
                    value={science3_ID}
                    control={<Radio />}
                    label="วิทย์ ป.6"
                  />
                </RadioGroup>
                <Button  style={{ textTransform: "none", textAlign: "left", width:"fit-content"}} variant="text" onClick={() => setScience('')}>Clear</Button>
              </SubjectWrapper>
            </SubjectSection>
          </InputWrapper>

          <LoadingButton
            disabled={!studentName}
            onClick={() => handleOnSubmit()}
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

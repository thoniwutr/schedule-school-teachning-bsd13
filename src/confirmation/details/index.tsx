import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../ui-kit/Text";
import { Wrapper, HeaderWrapper, LeadingWrapper } from "./index.styles";
import { BlueButton } from "../../ui-kit/Button";
import AddConfirmationDetailModal from "./AddConfirmationDetailModal";
import { TableColumn } from "react-data-table-component";
import { IConfirmationDetails } from "./types";
import DataTable from "../../ui-kit/DataTable";
import Loading from "../../ui-kit/Loading";
import { authenticatedRestClient } from "../../api/RestClient";
import {
  abacus1_ID,
  abacus2_ID,
  abacus3_ID,
  abacus4_ID,
  abacus5_ID,
  eng1_ID,
  eng2_ID,
  eng3_ID,
  eng4_ID,
  eng5_ID,
  eng6_ID,
  eng7_ID,
  eng8_ID,
  math1_ID,
  math2_ID,
  math3_ID,
  math4_ID,
  math5_ID,
  math6_ID,
  science1_ID,
  science2_ID,
  science3_ID,
  thai1_ID,
  thai2_ID,
  thai3_ID,
} from "./utils";

function ConfirmationDetailPage() {
  const { confirmationId } = useParams();
  const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IConfirmationDetails[]>([]);
  const navigate = useNavigate();

  const fetchConfirmations = async () => {
    const res = await authenticatedRestClient.get<void, IConfirmationDetails[]>(
      `/confirmation/${confirmationId}`
    );
    if (res) {
      setData(res);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const mapPeriod = (period : string) => {
    switch (period) {
      case 'MORNING':
        return "เช้า";
        case 'AFTERNOON':
          return "บ่าย";
          case 'BOTH':
            return "เช้า-บ่าย";
    }
  }

  const getSubjects = (subjects: string[]) => {
    const subjectDisplay = subjects.map((subject) => {
      switch (subject) {
        case math1_ID:
          return "M2";
        case math2_ID:
          return "M3";
        case math3_ID:
          return "M4";
        case math4_ID:
          return "M5";
        case math5_ID:
          return "M6";
        case math6_ID:
          return "M7";

        case abacus1_ID:
          return "AM1";
        case abacus2_ID:
          return "AM2";
        case abacus3_ID:
          return "AM3";
        case abacus4_ID:
          return "AM4";
        case abacus5_ID:
          return "AM5";

        case eng1_ID:
          return "BY";
        case eng2_ID:
          return "Y1";
        case eng3_ID:
          return "Y2";
        case eng4_ID:
          return "PG";
        case eng5_ID:
          return "G1";
        case eng6_ID:
          return "R1";
        case eng7_ID:
          return "R2";
        case eng8_ID:
          return "E6";

        case thai1_ID:
          return "T2-3";
        case thai2_ID:
          return "T4-5";
        case thai3_ID:
          return "T6";

        case science1_ID:
          return "S2-3";
        case science2_ID:
          return "S4-5";
        case science3_ID:
          return "S6";
        default:
          return "-";
      }
    });

    return subjectDisplay.join(", ");
  };

  const transactionColumns: TableColumn<IConfirmationDetails>[] = [
    {
      name: "Confirmation ID",
      width: "auto",
      selector: (row) => row.id ?? "",
    },
    {
      name: "Student Name",
      center: true,
      selector: (row) => row.studentName ?? "",
    },
    {
      name: "Level",
      width: "70px",
      center: true,
      selector: (row) => row.level ?? "",
    },
    {
      name: "Period",
      center: true,
      selector: (row) => mapPeriod(row.period) ?? "",
    },
    {
      name: "Subjects",
      center: true,
      width: "auto",
      selector: (row) => getSubjects(row.subjectDetailId),
    },
  ];

  return (
    <Wrapper>
      <Text size={20} weight={500} family="LexendDeca">
        Confirmation Detail
      </Text>
      <HeaderWrapper>
        <LeadingWrapper>
          <BlueButton
            width={250}
            onClick={() => setAddConfirmationDocVisibility(true)}
          >
            Create Confirmation
          </BlueButton>
        </LeadingWrapper>
      </HeaderWrapper>

      <DataTable
        columns={transactionColumns}
        data={data}
        defaultSortFieldId="createDate"
        pagination
        striped
        highlightOnHover
        pointerOnHover
        defaultSortAsc={false}
        fixedHeader
        progressPending={loading}
        progressComponent={<Loading color="$c-blue1" height={30} width={30} />}
      />

      {addConfirmationDocVisibility && (
        <AddConfirmationDetailModal
          confirmationId={confirmationId}
          onSuccess={fetchConfirmations}
          onClose={() => setAddConfirmationDocVisibility(false)}
        />
      )}
    </Wrapper>
  );
}

export default ConfirmationDetailPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISubject } from "./types";
import { authenticatedRestClient } from "../api/RestClient";
import DataTable, { TableColumn } from "react-data-table-component";
import { HeaderWrapper, LeadingWrapper, Wrapper } from "../confirmation/index.styles";
import Text from '../ui-kit/Text'
import { BlueButton } from "../ui-kit/Button";
import Loading from "../ui-kit/Loading";

function SubjectPage() {
  const { confirmationId } = useParams();
  const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ISubject[]>([]);
  const navigate = useNavigate();

  const fetchConfirmations = async () => {
    const res = await authenticatedRestClient.get<void, ISubject[]>(
      `/subject`
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


  const transactionColumns: TableColumn<ISubject>[] = [
    {
      name: "Subject ID",
      width: "auto",
      selector: (row) => row.id ?? "",
    },
    {
      name: "Subject Name",
      selector: (row) => row.subjectName ?? "",
    },
    {
      name: "Main Subject",
      selector: (row) => row.mainSubjectId ?? "",
    },
    {
        name: "Minimum Of Student",
        width: "200px",
        selector: (row) => row.minOfStudent ?? "",
      },
    
  ];

  return (
    <Wrapper>
      <Text size={20} weight={500} family="LexendDeca">
        Subjects
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

    </Wrapper>
  );
}

export default SubjectPage

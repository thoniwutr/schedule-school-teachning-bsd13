import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITeacher } from "./types";
import { authenticatedRestClient } from "../api/RestClient";
import DataTable, { TableColumn } from "react-data-table-component";
import { HeaderWrapper, LeadingWrapper, Wrapper } from "../confirmation/index.styles";
import Text from '../ui-kit/Text'
import { BlueButton } from "../ui-kit/Button";
import Loading from "../ui-kit/Loading";

function TeacherPage() {
  const { confirmationId } = useParams();
  const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ITeacher[]>([]);
  const navigate = useNavigate();

  const fetchConfirmations = async () => {
    const res = await authenticatedRestClient.get<void, ITeacher[]>(
      `/teacher`
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


  const transactionColumns: TableColumn<ITeacher>[] = [
    {
      name: "Teacher ID",
      selector: (row) => row.id ?? "",
    },
    {
      name: "Teacher Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "Contact",
      center: true,
      selector: (row) => row.contactNumber ?? "",
    },
    {
      name: "Capacity",
        center: true,
        selector: (row) => row.capacity ?? "",
      },
      {
        name: "Main Subject",
          center: true,
          selector: (row) => row.mainSubjectID ?? "",
        },
    
  ];

  return (
    <Wrapper>
      <Text size={20} weight={500} family="LexendDeca">
        Teachers
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

export default TeacherPage

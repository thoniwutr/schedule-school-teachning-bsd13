import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Text from '../ui-kit/Text'
import { Wrapper, HeaderWrapper, LeadingWrapper, DataTableWrapper } from './index.styles'
import { BlueButton } from '../ui-kit/Button'
import AddConfirmationDocModal from './CreateScheduleModal'
import { TableColumn } from 'react-data-table-component'
import { IScheduleResponse, IScheduleTable } from './types'
import DataTable from '../ui-kit/DataTable'
import Loading from '../ui-kit/Loading'
import { authenticatedRestClient } from '../api/RestClient'
import { IConfirmationDocumentResponse } from '../confirmation/types'
import CreateScheduleModal from './CreateScheduleModal'



function TableSchedule() {
    const { scheduleId } = useParams();
    const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =  useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IScheduleResponse>()
    const [confirmationDetail, setConfirmation] = useState<IConfirmationDocumentResponse[]>([])
    const navigate = useNavigate()

    

    const fetchScheduleById = async () => {
      const res = await authenticatedRestClient.get<void, IScheduleResponse>(
        `/create-schedule/schedule/${scheduleId}`
      )
      if(res){
        setData(res)
      }
 
    }


    useEffect(() => {
      fetchScheduleById()
    }, [])


    const transactionColumns: TableColumn<IScheduleTable>[] = [
      {
        name: 'Confirmation ID',
        selector: (row) => row.teacherName ?? "",
      },
      {
        name: 'Class 1',
        center: true,
        selector: (row) => row.periodMorning[0].subjectName ?? "",
      },
      {
        name: 'Class 2',
        center: true,
        selector: (row) => row.periodMorning[1].subjectName ?? "",
      },
      {
        name: 'Class 3',
        center: true,
        selector: (row) => row.periodMorning[2].subjectName ?? "",
      },
      {
        name: 'Class 4',
        center: true,
        selector: (row) => row.periodAfternoon[0].subjectName ?? "",
      },
      {
        name: 'Class 5',
        center: true,
        selector: (row) => row.periodAfternoon[1].subjectName ?? "",
      },
      {
        name: 'Class 6',
        center: true,
        selector: (row) => row.periodAfternoon[2].subjectName ?? "",
      },
    ]


    return (
       <Wrapper>
        <Text size={20  } weight={500} family="LexendDeca">
        Schedule ID : {scheduleId}
      </Text>
     <DataTableWrapper>
     <DataTable
        columns={transactionColumns}
        data={data?.scheduleFinal!}
        progressPending={loading}
        progressComponent={
            <Loading color="$c-blue1" height={30} width={30} />
        }
      />
     </DataTableWrapper>
    

    </Wrapper>
    )
}

export default TableSchedule
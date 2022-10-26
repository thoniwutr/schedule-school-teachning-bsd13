import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Text from '../ui-kit/Text'
import { Wrapper, HeaderWrapper, LeadingWrapper } from './index.styles'
import { BlueButton } from '../ui-kit/Button'
import AddConfirmationDocModal from './CreateScheduleModal'
import { TableColumn } from 'react-data-table-component'
import { IScheduleResponse } from './types'
import DataTable from '../ui-kit/DataTable'
import Loading from '../ui-kit/Loading'
import { authenticatedRestClient } from '../api/RestClient'
import { IConfirmationDocumentResponse } from '../confirmation/types'
import CreateScheduleModal from './CreateScheduleModal'

function SchedulePage(){
    const [createScheduleVisibility, setCreateScheduleVisibility] =  useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IScheduleResponse[]>([])
    const [confirmationDetail, setConfirmation] = useState<IConfirmationDocumentResponse[]>([])
    const navigate = useNavigate()

   
    const fetchConfirmations = async () => {
      const res = await authenticatedRestClient.get<void, IConfirmationDocumentResponse[]>(
        `/confirmation`
      )
      if(res){
        setConfirmation(res)
      }else{
        setData([])
      }
 
    }

    useEffect(() => {
      fetchConfirmations()
    }, [])

    const fetchSchedule = async () => {
      const res = await authenticatedRestClient.get<void, IScheduleResponse[]>(
        `/create-schedule`
      )
      if(res){
        setData(res)
      }else{
        setData([])
      }
 
    }

    useEffect(() => {
      fetchConfirmations()
      fetchSchedule()
    }, [])

    
    const transactionColumns: TableColumn<IScheduleResponse>[] = [
      {
        name: 'Schedule ID',
        selector: (row) => row.id ?? "",
      },
      {
        name: 'Schedule Name',
        center: true,
        selector: (row) => row.scheduleName ?? "",
      },
      {
        name: 'Created Date',
        center: true,
        selector: (row) => row.createDate ?? "",
      },
    ]


    return (
       <Wrapper>
        <Text size={20  } weight={500} family="LexendDeca">
        Schedule Page
      </Text>
      <HeaderWrapper>
        <LeadingWrapper>
          <BlueButton
            width={250}
            onClick={() => setCreateScheduleVisibility(true)}
          >
            + New Schedule
          </BlueButton>
        </LeadingWrapper>
      </HeaderWrapper>
    
      <DataTable
        columns={transactionColumns}
        data={data}
        onRowClicked={(row) => {
          navigate(row.id)
        }}
        progressPending={loading}
        progressComponent={
            <Loading color="$c-blue1" height={30} width={30} />
        }
      />


      {createScheduleVisibility && (
        <CreateScheduleModal
          confirmation={confirmationDetail}
          onSuccess={fetchSchedule}
          onClose={() => setCreateScheduleVisibility(false)}
        />
      )}

    </Wrapper>
    )
}

export default SchedulePage
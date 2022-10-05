import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Text from '../ui-kit/Text'
import { Wrapper, HeaderWrapper, LeadingWrapper } from './index.styles'
import { BlueButton } from '../ui-kit/Button'
import AddConfirmationDocModal from './AddConfirmationDocModal'
import { TableColumn } from 'react-data-table-component'
import { IConfirmationDocumentResponse } from './types'
import DataTable from '../ui-kit/DataTable'
import Loading from '../ui-kit/Loading'
import { authenticatedRestClient } from '../api/RestClient'

function ConfirmationPage(){
    const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =  useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<IConfirmationDocumentResponse[]>([])
    const navigate = useNavigate()

    const fetchConfirmations = async () => {
      const res = await authenticatedRestClient.get<void, IConfirmationDocumentResponse[]>(
        `/confirmation`
      )
      if(res){
        const newRes = res.sort((a,b)=>
        a.createDate.localeCompare(b.createDate)||a.createDate.localeCompare(b.createDate));
        setData(newRes)
      }else{
        setData([])
      }
 
    }

    useEffect(() => {
      fetchConfirmations()
    }, [])
  

    const transactionColumns: TableColumn<IConfirmationDocumentResponse>[] = [
      {
        name: 'Confirmation ID',
        selector: (row) => row.id ?? "",
      },
      {
        name: 'Confirmation Description',
        center: true,
        selector: (row) => row.confirmationName ?? "",
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
        Confirmation Page
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
        onRowClicked={(row) => {
          navigate(row.id)
        }}
        progressPending={loading}
        progressComponent={
            <Loading color="$c-blue1" height={30} width={30} />
        }
      />


      {addConfirmationDocVisibility && (
        <AddConfirmationDocModal
          onSuccess={fetchConfirmations}
          onClose={() => setAddConfirmationDocVisibility(false)}
        />
      )}

    </Wrapper>
    )
}

export default ConfirmationPage
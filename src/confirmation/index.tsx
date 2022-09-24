import { useState } from 'react'
import Text from '../ui-kit/Text'
import { Wrapper, HeaderWrapper, LeadingWrapper } from './index.styles'
import { BlueButton } from '../ui-kit/Button'
import AddConfirmationDocModal from './AddConfirmationDocModal'


function ConfirmationPage(){

    const [addConfirmationDocVisibility, setAddConfirmationDocVisibility] =  useState(false)

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

      {addConfirmationDocVisibility && (
        <AddConfirmationDocModal
          onClose={() => setAddConfirmationDocVisibility(false)}
        />
      )}

    </Wrapper>
    )
}

export default ConfirmationPage
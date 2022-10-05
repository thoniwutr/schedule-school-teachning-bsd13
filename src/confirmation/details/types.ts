export interface IConfirmationDetailPayload {
    confirmationId : string
    subjectDetailId: string[]
    studentName : string
    level: string
    period: string
}

export interface IConfirmationDetails {
    id: string
    confirmationId : string
    subjectDetailId: string[]
    studentName : string
    level: string
    period: string
}

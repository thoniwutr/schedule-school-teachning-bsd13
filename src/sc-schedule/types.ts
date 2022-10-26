
export interface IScheduleResponse {
    id: string
    confirmationId : string
    createDate : string
    scheduleName : string
    scheduleFinal : IScheduleTable[]
}


export interface IScheduleTable {
    teacherId: string
    teacherName: string
    subjectResp: ISubject[]
    periodMorning: ISubject[]
    periodAfternoon: ISubject[]
}

export interface ISubject {
    subjectId: string
    subjectName: string
}


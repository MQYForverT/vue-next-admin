export interface IFollowUpRecordData {
  desc: string //描述
  trackingType: number | null //跟进方式
  trackingState: number | null //跟进状态
  nextTime: string
}

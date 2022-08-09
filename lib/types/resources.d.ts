// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { situationsLayout } from "./situations"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { individuLayout } from "./individu"

export interface resourceLayout {
  id: string
  label: string
  category: string
  prefix?: string
  isRelevant?(situationsLayout, individuLayout?): boolean
  interuptionQuestionLabel?: string
  positionInList?: string
  hint?: string
  sourceOpenfisca?: string
  isMontantAnnuel?: boolean
  extra?: {
    id: string
    default: string
    openfiscaPeriod: string
  }[]
}
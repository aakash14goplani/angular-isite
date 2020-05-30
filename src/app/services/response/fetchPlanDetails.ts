import { PlanDetailsDataStore, FileDetails} from '../request/createPlanDetailsRequest';

export interface FetchPlanDetailsResponse {
    message: string,
    content: PlanDetailsDataStore[]
}

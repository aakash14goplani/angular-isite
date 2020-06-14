import { MaterialInwardsStructure, Materials } from './../request/createMaterialInwardRequest';

export interface MaterialInwardResponse {
    message: string,
    content: MaterialInwardsStructure[]
}


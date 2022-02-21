export enum RegionsActionTypes {
    ADD_REGION = "ADD_REGION",
    UPLOAD_IMAGE = "UPLOAD_IMAGE"
}

export interface IRegion {
    name: string,
    base64: string
}

export interface IRegionResponse {
    data: IRegion,
}


export interface AddRegionAction {
    type: RegionsActionTypes.ADD_REGION,
    payload: IRegionResponse
}

export interface UploadImageAction {
    type: RegionsActionTypes.UPLOAD_IMAGE,
    payload: string
}

export type RegionActions = AddRegionAction | UploadImageAction;
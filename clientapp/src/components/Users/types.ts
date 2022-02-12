export enum UsersActionTypes {
    GET_USERS = "GET_USERS",
}

export interface IUserItem {
    id: number,
    aboutMe: string | null,
    age: number | null,
    creationDate: string | null,
    displayName: string | null,
    upVotes: number,
    downVotes: number,
    emailHash: string | null,
    lastAccessDate: string | null,
    location: string | null,
    reputation: number,
    views: number,
    websiteUrl: string

}
export interface ISearch {
    page: number | string | null,
    count: number | string | null
}
export interface IUsersResponse {
    content: Array<any>,
    totalPages: number
}
export interface UserState {
    users: Array<IUserItem>
    totalPages: number
}

export interface GetUsersAction {
    type: UsersActionTypes.GET_USERS,
    payload: IUsersResponse
}

export type UserAction = GetUsersAction;
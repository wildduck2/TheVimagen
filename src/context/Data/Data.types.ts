import { UserData } from "../../hooks";

export interface initialStateTypes {
    satatus: 'loading' | 'succeeded' | 'failed';
    userData: UserData | null
    logged: boolean
}

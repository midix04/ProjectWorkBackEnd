import { ContoCorrente } from "../../../api/user/user.entity"

export type UserIdentity = {
    id: string,
    provider: string,
    credentials: {
        Email: string,
        hashedPassword: string
    },
    ContoCorrente: ContoCorrente,
    Reftoken: string
}
import { ContoCorrente } from "../../../api/ContoCorrente/user.entity"

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
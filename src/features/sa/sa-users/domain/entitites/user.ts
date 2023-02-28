export class InputUser {
    login: string
    email: string
    passwordHash: string
    passwordSalt: string
    isActivated: boolean
    code: string
    createdAt: string
}

export class ViewUser {
    id: string
    login: string
    email: string
    createdAt: string
    banInfo: BanInfo
}

export class BanInfo {
    isBanned: boolean
    banDate: string
    banReason: string
}
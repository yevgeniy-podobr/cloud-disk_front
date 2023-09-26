export interface IUser {
  diskSpace: number | null
  email: string
  id: string
  usedSpace: number | null
}

export interface IUserData { 
  currentUser: IUser | {},
  isAuth: boolean
} 

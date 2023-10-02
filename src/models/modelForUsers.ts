export interface IUser {
  diskSpace: number | null
  email: string
  id: string
  usedSpace: number | null
  avatar: string | null
}

export interface IUserData { 
  currentUser: IUser | null,
  isAuth: boolean
} 

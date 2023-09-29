import { EFolderDisplayOptions } from "../utils/constants/fileConstants"

export interface IFile {
  childs: string[]
  name: string
  path: string
  size: number
  date: string
  type: string
  user: string
  _id: string
}
export interface IFiles {
  files: IFile[],
  currentFolder: null | string,
  folderStack: (string | null)[]
  folderDisplay: EFolderDisplayOptions
}

export interface IUploadFile {
  id: number,
  name: string,
  progress: number
}

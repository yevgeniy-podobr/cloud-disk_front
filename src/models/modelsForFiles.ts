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
  currentFolder: null | string
}

export enum TypeResume {
  png = 'image/png',
  jpg = 'image/jpg',
  jpeg = 'image/jpeg',
  gif = 'image/gif',
  heic = 'image/heic',
  doc = 'application/msword',
  pdf = 'application/pdf',
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export enum TypeVideo {
  webm = 'video/webm',
  mp4 = 'video/mp4',
  ogg = 'video/ogg',
  ogv = 'video/ogv',
  avi = 'video/avi',
  mov = 'video/mov',
  quicktime = 'video/quicktime',
  m4v = 'video/m4v',
}

export enum VideoAllTypes {
  all = 'video/mp4,video/x-m4v,video/*',
}

export namespace workWithTypeData {
  export function resumeSupportTypes() {
    return [
      TypeResume.doc,
      TypeResume.docx,
      TypeResume.gif,
      TypeResume.heic,
      TypeResume.jpeg,
      TypeResume.jpg,
      TypeResume.pdf,
      TypeResume.png,
    ]
  }
  export function photoSupportTypes() {
    return [TypeResume.heic, TypeResume.jpeg, TypeResume.jpg, TypeResume.png]
  }

  export function videoSupportTypes() {
    return [
      TypeVideo.webm,
      TypeVideo.ogg,
      TypeVideo.ogv,
      TypeVideo.mp4,
      TypeVideo.mov,
      TypeVideo.quicktime,
      TypeVideo.m4v,
      TypeVideo.avi,
    ]
  }

  export function videoAllTypes() {
    return [VideoAllTypes.all]
  }
}

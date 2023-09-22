import React, { useState } from 'react'
import imgFile from '../../../../assets/icons/other/add_files.png'
import pdfIcon from '../../../../assets/icons/other/pdfImage.svg'
import heicFile from '../../../../assets/icons/other/add_heic-file.png'

interface Props {
  file: File | string
  updatedResume: string | undefined
}

export interface PropsVideo {
  setIsBtnPlay: React.Dispatch<React.SetStateAction<boolean>>
  file: string | File
}

enum TypeExtension {
  msword = 'msword',
  png = 'png',
  jpg = 'jpg',
  jpeg = 'jpeg',
  gif = 'gif',
  heic = 'heic',
  doc = 'doc',
  pdf = 'pdf',
  docx = 'docx',
  mp4 = 'mp4',
  ogg = 'ogg',
  ogv = 'ogv',
  webm = 'webm',
  mov = 'mov',
  quicktime = 'quicktime',
  m4v = 'm4v',
  avi = 'avi',
  MOV = 'MOV',
}
const videoRef = React.createRef<HTMLVideoElement>()

const TypeRender = (props: Props) => {
  const [isBtnPlay, setIsBtnPlay] = useState(true)

  const toggleVideo = () => {
    if (isBtnPlay) videoRef.current?.play()
    else videoRef.current?.pause()
  }

  let regular = /(\.)([0-9a-z]+)$/i
  let regularObjType = /(\/)([0-9a-z]+)$/i
  let extension
  let htmlType

  if (typeof props.file === 'string') {
    extension = props.file.match(regular)?.slice(-1).toString()
  }
  if (typeof props.file === 'object' && props.file?.type) {
    extension = props.file?.type.match(regularObjType)?.slice(-1).toString()
    extension = props.file?.type.match(regularObjType)?.slice(-1).toString()
  }

  switch (extension) {
    case TypeExtension.doc:
    case TypeExtension.docx:
    case TypeExtension.msword:
      htmlType = <img className="upload-file__img" src={imgFile} alt="file" />
      break
    case TypeExtension.png:
    case TypeExtension.jpeg:
    case TypeExtension.gif:
    case TypeExtension.jpg:
      htmlType = (
        <img
          className="upload-file__img"
          src={
            typeof props.file === 'string'
              ? props.updatedResume
              : URL.createObjectURL(props.file)
          }
          alt={`file preview`}
        />
      )
      break
    case TypeExtension.heic:
      htmlType = <img className="upload-file__img" src={heicFile} alt="file" />
      break
    case TypeExtension.pdf:
      const propFileName =
        typeof props.file === 'string'
          ? props.file.split('/')[props.file.split('/').length - 1]
          : ''
      htmlType = (
        <div className="upload-file__pdf-block">
          {typeof props.file === 'string' ? (
            <>
              <img className="" src={pdfIcon} alt="file" />
              {propFileName && propFileName.length <= 30
                ? propFileName
                : `${propFileName.slice(0, 30)}...`}
            </>
          ) : (
            <>
              <img src={pdfIcon} alt="pdf icon" />
              {props.file?.name && props.file?.name.length < 30
                ? props.file?.name
                : `${props.file?.name.slice(0, 30)}...`}
            </>
          )}
        </div>
      )
      break

    case TypeExtension.mp4:
    case TypeExtension.ogg:
    case TypeExtension.ogv:
    case TypeExtension.webm:
    case TypeExtension.mov:
    case TypeExtension.quicktime:
    case TypeExtension.avi:
    case TypeExtension.m4v:
    case TypeExtension.MOV:
      htmlType = (
        <div
          className={`upload-file__video-container ${
            isBtnPlay && 'upload-file__video-hide-controls'
          }`}
        >
          <div
            onClick={() => {
              setIsBtnPlay(false)
              toggleVideo()
            }}
            className={`upload-file__video-control ${
              isBtnPlay && 'upload-file__video-control-show'
            }`}
          ></div>

          <Video file={props.file} setIsBtnPlay={setIsBtnPlay} />
        </div>
      )
      break

    default:
      htmlType = <img className="upload-file__img" src={imgFile} alt="file" />
      break
  }

  return <div>{htmlType}</div>
}

export const TypeRenderMemo = React.memo(TypeRender)
export default TypeRenderMemo

const Video = React.memo((props: PropsVideo) => {
  return (
    <video
      playsInline
      width={'100%'}
      controls
      className="upload-file__video"
      ref={videoRef}
      onPlaying={() => props.setIsBtnPlay(false)}
      onPlay={() => props.setIsBtnPlay(false)}
      height={'188px'}
      onPause={() => {
        props.setIsBtnPlay(true)
      }}
      data-testid="upload-file__video"
    >
      <source
        src={
          typeof props.file === 'string'
            ? props.file
            : URL.createObjectURL(props.file)
        }
      ></source>
    </video>
  )
})

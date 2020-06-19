import { FileType } from '../domain/enums/fileType';

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
const videoExtensions = ['mp4', 'm4v', 'webm', 'ogv', 'mov', 'avi'];
const audioExtensions = ['mp3', 'oga', 'wav'];
const pdfExtensions = ['pdf'];

const getFileType = (fileName: string) => {
  const extension = fileName
    ?.split('.')
    ?.pop()
    ?.toLocaleLowerCase();

  if (!extension) {
    return FileType.Unknown;
  }

  if (imageExtensions.some(x => x === extension)) {
    return FileType.Image;
  }
  if (videoExtensions.some(x => x === extension)) {
    return FileType.Video;
  }
  if (audioExtensions.some(x => x === extension)) {
    return FileType.Audio;
  }
  if (pdfExtensions.some(x => x === extension)) {
    return FileType.Pdf;
  }

  return FileType.Unknown;
};

export { getFileType };

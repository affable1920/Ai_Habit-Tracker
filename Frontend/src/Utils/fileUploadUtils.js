export const getFileType = (type) => {
  if (type.startsWith("image")) return "image";
  if (type.startsWith("video")) return "video";
};

export default { getFileType };

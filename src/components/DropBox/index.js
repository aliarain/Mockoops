import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.scss";

const DropBox = ({
  icon,
  onDrop,
  title,
  subtitle,
  label,
  file,
  fileURL,
  deleteFile,
  ...props
}) => {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  const isFileUploaded =
    fileURL && fileURL?.startsWith("https://") ? true : false;

  if (file || fileURL)
    return (
      <label className={styles.wrapper}>
        {icon}
        <button className={styles.close} onClick={deleteFile}>
          {"×"}
        </button>
        <p className={styles.title}>
          {isFileUploaded ? "Default added" : "File Added"}
        </p>
        <p className={styles.details}>
          {isFileUploaded ? "Double-Click to +" : file?.name}
        </p>
      </label>
    );

  return (
    <label
      {...getRootProps()}
      className={["file", isDragActive ? "active" : ""].join(" ")}
      htmlFor={title}
    >
      <input type="file" {...props} id={title} {...getInputProps()} />
      {icon}
      <span className="title">{title}</span>
      <span className="subtitle">{subtitle}</span>
    </label>
  );
};

export default DropBox;
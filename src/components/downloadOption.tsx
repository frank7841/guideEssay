import React from "react";

const Downloader = ({ files }: { files: [string] }) => {
  return (
    <div>
      {files.map((url: string) => (
        <iframe src={url} title="downloader" />
      ))}
    </div>
  );
};

export default Downloader;

import React from 'react';
import { FileMainEreaBody, FileMainEreaBodyNav, FileMainEreaHeader } from './';

const FileMainErea = () => {
  return (
    <section className="file-mainerea">
      <FileMainEreaHeader />

      <FileMainEreaBody />
      <FileMainEreaBodyNav />
    </section>
  );
};

export default FileMainErea;

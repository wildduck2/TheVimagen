import React from 'react';

import { v4 as ID } from 'uuid';
import {
  Button,
  ContextMenu,
  ContextMenuTrigger,
  Input,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '..';
import { FiUpload } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { supabase } from '../../../supabase/supabase';
import axios from 'axios';

export type AttachmentType = {
  id: string;
  file: File;
  url?: string | undefined;
  name: string;
  type: string;
  size: string;
  progress: number;
  status: string;
};
const user = 'TheVimagen-test-user';

const AddAttachmentSheetWrapper = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<AttachmentType[]>([]);
  const [data, setData] = React.useState<{
    signedUrl: string;
    token: string;
    path: string;
  } | null>(null);

  const getFileDataHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];

    try {
      const filedata: AttachmentType = {
        id: ID(),
        file: file,
        name: file.name.split('/')[0],
        type: file.type.split('/')[1],
        size: `${file.size / 1024}`,
        progress: 0,
        status: 'pending',
      };

      // generate signed url the file and use axios to upload
      const { data, error } = await supabase.storage
        .from('attachment')
        .createSignedUploadUrl(`attachment-${ID()}-${user}-${Date.now()}.${filedata.type}`);
      console.log(data);
      if (error) {
        console.log(error);
      } else {
        setData(data);
        setUploadedFiles([...uploadedFiles, { ...filedata, url: data?.signedUrl }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAllFilesHandler = async (files: AttachmentType[]) => {
    // Use Promise.all to wait for all asynchronous operations to complete

    async function uploadFilesRecursively(files: AttachmentType[], data, index: number) {
      if (files.length === 0) {
        return [];
      }
      const [firstFile, ...remainingFiles] = files;

      const manga = [...uploadedFiles];
      try {
        const res = await axios({
          method: 'put',
          url: firstFile.url,
          data: firstFile.file,
          headers: {
            apikey: data?.token,
            authorization: `Bearer ${data?.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const newState = uploadedFiles[index];
            
            console.log(firstFile.status);
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total!);
            firstFile.progress = percent;
            
            if (total === 100) {
              newState.status = 'Success';
              console.log('success')
            } else{
              newState.status = 'Uploading';
              console.log('uploading')
            }
            
            manga[index] = newState;
            setUploadedFiles(manga);
            console.log(percent, firstFile.id);
          },
        })

        // if one of te reqs is bad all cycle will stop
        return [res, ...(await uploadFilesRecursively(remainingFiles, data, ++index))];
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    await uploadFilesRecursively(files, data, 0);
  };

  return (
    <>
      <div className="add-attachment">
        <div className="add-attachment__header">
          <ContextMenu>
            <ContextMenuTrigger className="add-attachment__header__trigger">
              <div>
                <FiUpload size={30} />
                <span>Click to upload</span>
              </div>
              <Input placeholder="Filter emails..." type="file" onChange={getFileDataHandler} />
            </ContextMenuTrigger>
          </ContextMenu>
        </div>

        <div className="add-attachment__body">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20px] pr-0">Delete</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-left">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedFiles.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium w-[20px] pr-0">
                    <Button variant="ghost">
                      <RiDeleteBin6Fill size={20} />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <span className="inline-block font-medium truncate w-[100px]">{invoice.name}</span>
                  </TableCell>
                  <TableCell>{invoice.type.split('/')[0]}</TableCell>
                  <TableCell className="inline-flex truncate w-[100px] h-[72px] items-center">
                    {parseInt(invoice.size).toFixed(0)}kb
                  </TableCell>
                  <TableCell className="text-left">
                    {invoice.status}
                    {/* <Progress value={invoice.progress} className="w-[90%] h-[4px]" /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <button onClick={() => uploadAllFilesHandler(uploadedFiles)}>Upload</button>
      </div>
    </>
  );
};

export default AddAttachmentSheetWrapper;

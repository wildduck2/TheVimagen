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
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '..';
import { FiUpload } from 'react-icons/fi';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export type AttachmentType = {
    id: string;
    name: string;
    type: string;
    size: string;
    progress: number;
    status: string;
};

const attachments: AttachmentType[] = [
    {
        id: ID(),
        name: 'image.png',
        type: 'image',
        size: '2MB',
        progress: 50,
        status: 'success',
    },
];

const AddAttachmentSheetWrapper = () => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 300);
        return () => clearTimeout(timer);
    }, []);

    const [uploadedFiles, setUploadedFiles] = React.useState<AttachmentType[]>(attachments);

    const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files![0];
        const filedata: AttachmentType = {
            id: '1',
            name: file.name,
            type: file.type,
            size: `${file.size / 1024}`,
            progress: 0,
            status: 'pending',
        };
        setUploadedFiles([...uploadedFiles, filedata]);
    };

    console.log(uploadedFiles);

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
                            <Input placeholder="Filter emails..." type="file" onChange={uploadFileHandler} />
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
                                        <span className="flex font-medium truncate w-[100px]">{invoice.name}</span>
                                    </TableCell>
                                    <TableCell>{invoice.type}</TableCell>
                                    <TableCell className="truncate w-[100px]">{invoice.size}</TableCell>
                                    <TableCell className="text-left">
                                        <Progress value={progress} className="w-[90%] h-[4px]" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default AddAttachmentSheetWrapper;

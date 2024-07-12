'use client';
import React from 'react';
import PageHeader from '@/components/page-header';
import { UploadIcon } from '@/components/ui/icons';
import { FileUploader } from '@/components/file-upload';
import { Dialog } from '@/components/ui/dialog';
import { uploadFile } from '@/services/file';
import { FileTableList } from '@/components/files/file-list';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const columns = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'dateModified',
    header: 'Date Modified',
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    // @ts-ignore
    cell: ({ row }) => {
      const router = useRouter();
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push('/query')}>
              Query Document
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export default function Sources() {
  const [isFileUploadOpen, setFileUploadOpen] = React.useState(false);
  const [files, setFiles] = React.useState<
    Array<{ name: string; status: string }> | undefined
  >(undefined);

  const onUpload = React.useCallback(async (files: File[]) => {
    if (!files.length) return;
    setFiles(files.map((f) => ({ name: f.name, status: 'UPLOADING' }))); // default status

    const uploadResults = await Promise.all(files.map(uploadFile));

    // Update status for each file based on upload results
    setFiles((prevFiles) =>
      prevFiles?.map((f) => {
        const result = uploadResults.find((res) => res.fileName === f.name);
        if (result) {
          return { name: f.name, status: result.status };
        }
        return f;
      }),
    );
  }, []);

  const getDocuments = async () => {
    const res = await fetch('/api/document', { method: 'GET' });
    const documents = await res.json();
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <PageHeader pageName="Documents">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFileUploadOpen(true)}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </PageHeader>
      <Dialog
        open={isFileUploadOpen}
        onOpenChange={() => setFileUploadOpen(!isFileUploadOpen)}
      >
        <FileUploader
          onUpload={onUpload}
          maxNumFiles={2}
          acceptedFileTypes={{
            'application/pdf': ['.pdf'],
          }}
          maxFileSize={MAX_FILE_SIZE}
          files={files}
        />
      </Dialog>

      <br />

      <div className=" mt-2">
        <FileTableList
          columns={columns}
          data={[
            {
              name: 'Apple Report ESG.pdf',
              dateModified: '2021-09-01 12:00:00',
            },
          ]}
        />
      </div>
    </>
  );
}

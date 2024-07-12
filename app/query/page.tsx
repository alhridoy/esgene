'use client';
import ChatPanel from '@/components/chat/chat-panel';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { FormEvent, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useChat } from 'ai/react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Example() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat();

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => {
    setNumPages(nextNumPages);
  };
  return (
    <ResizablePanelGroup direction="horizontal" className="fixed mt-[54px]">
      <ResizablePanel className="border" defaultSize={65}>
        <div className="bg-background flex h-12 w-full items-center p-5">
          <p className="text-sm font-semibold">Apple ESG</p>
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-600">
              {pageNumber} of {numPages}
            </p>
          </div>
        </div>
        <div className="bg-secondary flex h-full w-full flex-col items-center justify-center p-8">
          <Document
            file={'/assets/apple_esg_report.pdf'}
            renderMode="canvas"
            onLoadSuccess={onDocumentLoadSuccess}
            className="bg-secondary w-full"
          >
            <div className="h-[calc(100vh-104px)] w-full overflow-y-auto">
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page-${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={800}
                  className="mt-2"
                />
              ))}
            </div>
          </Document>
        </div>
      </ResizablePanel>

      <ResizablePanel className="border p-2">
        <div className="mt-4">
          <ChatPanel
            messages={messages}
            isLoading={isLoading}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={(e: FormEvent<HTMLFormElement>) =>
              handleSubmit(e, {
                options: {
                  body: {
                    input,
                  },
                },
              })
            }
            stop={stop}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

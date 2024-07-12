import * as React from 'react';
import { type UseChatHelpers } from 'ai/react';
import Textarea from 'react-textarea-autosize';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { ArrowUpIcon, StopIcon } from '@/components/ui/icons';

export interface PromptProps
  extends Pick<
    UseChatHelpers,
    'input' | 'handleInputChange' | 'handleSubmit' | 'isLoading' | 'stop'
  > {}

export function PromptForm({
  isLoading,
  handleInputChange,
  handleSubmit,
  input,
  stop,
}: PromptProps) {
  return (
    <>
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-12 items-center justify-center">
          {isLoading && (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <StopIcon className="mr-2" />
              Stop generating
            </Button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-secondary relative flex max-h-20 w-auto grow flex-col overflow-hidden sm:rounded-md  sm:pr-12">
          <Textarea
            tabIndex={0}
            rows={1}
            value={input}
            onChange={handleInputChange}
            placeholder="Send a message."
            id="promptForm"
            spellCheck={false}
            className="min-h-[16px] w-auto resize-none bg-transparent px-4 py-[0.8rem] focus-within:outline-none sm:text-sm"
          />
          <div className="absolute right-0 top-2 sm:right-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-8 w-8"
                    disabled={isLoading || input === ''}
                  >
                    <ArrowUpIcon className="w-5 " />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isLoading ? 'Stop generating' : 'Send message'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </form>
    </>
  );
}

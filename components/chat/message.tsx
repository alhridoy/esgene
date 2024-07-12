import { Message } from 'ai';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/codeblock';
import { MemoizedReactMarkdown } from '@/components/markdown';
import { ChatMessageActions } from '@/components/chat/message-action';
import { useAuth } from '@/contexts';
import UserAvatar from '../user-avatar/user-avatar';

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const { user } = useAuth();

  return (
    <div className={cn('group relative mb-4 flex w-full  ')} {...props}>
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {message.role === 'user' ? (
          <UserAvatar
            name={`${user?.given_name} ${user?.family_name}`}
            email={user?.email!}
            className="h-6 w-6"
          />
        ) : (
          'ai'
        )}
      </div>
      <div className="ml-4 flex flex-1 flex-col space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 mr-10 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>

        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}

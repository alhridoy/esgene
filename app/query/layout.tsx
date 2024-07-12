import AppBar from '@/components/app-bar/app-bar';

export default function TipTapEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      <div>{children}</div>
    </>
  );
}

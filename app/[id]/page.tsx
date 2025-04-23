const List = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <main className="m-auto flex h-[calc(100vh-68px)] w-full max-w-3xl flex-col items-center justify-center gap-8 p-4">
      <p className="max-w-lg text-sm text-pretty text-black dark:text-white">
        {id}
      </p>
    </main>
  );
};

export default List;

const List = async ({ params }: { params: Promise<{ randomId: string }> }) => {
  const id = (await params).randomId;
  return <div>{id}</div>;
};

export default List;

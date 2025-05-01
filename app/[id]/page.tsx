import { CreateItem, Item, Title } from "@/components/list/list";
import { StartButton } from "@/components/start-button/start-button";
import { prisma } from "@/lib/prisma";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const list = await prisma.list.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
  return (
    <main className="m-auto flex h-[calc(100vh-68px)] w-full max-w-3xl flex-col items-center justify-center gap-8 p-4">
      {list ? <List data={list} /> : <E404 />}
    </main>
  );
};

const E404 = () => {
  return (
    <>
      <StartButton />
      <p className="max-w-lg text-sm text-pretty text-gray-500 dark:text-gray-600">
        En cliquant sur «Create», vous consentez au stockage et à la vente de
        vos données de manière anonyme pour une durée de 2 ans. Ces données sont
        essentielles pour faire vivre notre plateforme. Veuillez noter que
        l’utilisation de l’application implique nécessairement la collecte de
        ces données.
      </p>
    </>
  );
};

const List = ({ data }: { data: { id: string; title: string } }) => {
  return (
    <>
      <Title title={data.title} />

      <ul className="">
        {[
          { food: "chips", qt: "3" },
          { food: "camembert", qt: "1" },
        ].map((item, i) => (
          <Item item={item} key={i} />
        ))}
        <li className="w-full">
          <CreateItem />
        </li>
      </ul>
    </>
  );
};

export default Page;

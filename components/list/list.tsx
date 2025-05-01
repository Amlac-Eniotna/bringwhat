"use client";
import { Check, Pen, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";

export const Item = ({ item }: { item: { food: string; qt: string } }) => {
  const [onModify, setOnModify] = useState(false);
  return (
    <li className="mb-3 flex items-center justify-between gap-6">
      <div className="flex w-full items-center justify-between gap-2">
        <p>{item.food}</p>
        <p>{item.qt}</p>
      </div>
      <ModifyButton onModify={onModify} setOnModify={setOnModify} />
    </li>
  );
};

export const CreateItem = () => {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer backdrop-blur-xs"
    >
      <Plus />
    </Button>
  );
};

export const Title = ({ title }: { title: string }) => {
  const [onModify, setOnModify] = useState(false);
  return (
    <div className="flex items-center">
      <h1 className="mr-6 max-w-lg text-lg text-pretty text-black dark:text-white">
        {title}
      </h1>
      <ModifyButton onModify={onModify} setOnModify={setOnModify} />
    </div>
  );
};

const ModifyButton = ({
  onModify,
  setOnModify,
}: {
  onModify: boolean;
  setOnModify: Dispatch<SetStateAction<boolean>>;
}) => {
  if (onModify) {
    return (
      <Button
        variant="outline"
        className="cursor-pointer backdrop-blur-xs"
        onClick={() => setOnModify(!onModify)}
      >
        <Check />
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      className="cursor-pointer backdrop-blur-xs"
      onClick={() => setOnModify(!onModify)}
    >
      <Pen />
    </Button>
  );
};

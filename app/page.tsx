"use client";

import { Start } from "./components/start";

export default function Home() {
  return (
    <main className="m-auto h-svh w-full max-w-screen-sm px-5">
      <h1 className="py-10 text-4xl font-black">Qui Ramène Quoi ?!</h1>
      <section className="flex h-full flex-col items-center justify-center md:h-4/6">
        <Start />
        <p className="w-full text-xs text-slate-400">
          Créez facilement une liste pour savoir qui ramène quoi à vos soirée !
        </p>
      </section>
    </main>
  );
}

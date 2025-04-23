import { StartButton } from "@/components/start-button/start-button";

export default function Home() {
  return (
    <main className="m-auto flex h-[calc(100vh-68px)] w-full max-w-3xl flex-col items-center justify-center gap-8 p-4">
      <StartButton />
      <p className="max-w-lg text-sm text-pretty text-gray-500 dark:text-gray-600">
        En cliquant sur «Create», vous consentez au stockage et à la vente de
        vos données de manière anonyme pour une durée de 2 ans. Ces données sont
        essentielles pour faire vivre notre plateforme. Veuillez noter que
        l’utilisation de l’application implique nécessairement la collecte de
        ces données.
      </p>
    </main>
  );
}

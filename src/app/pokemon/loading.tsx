import Image from 'next/image';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="min-h-screen p-8 lx:p-0 max-w-7xl mx-auto">
      <header className="flex flex-col mb-6 justify-center">
        <Image
          src="/pokemon-logo.png"
          alt="Pokemon logo"
          className="mx-auto w-32 mb-6"
          width="200"
          height="200"
        />
      </header>
      <p>Loading...</p>
    </main>
  );
}

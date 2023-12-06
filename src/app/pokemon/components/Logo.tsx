import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      src="/pokemon-logo.png"
      alt="Pokemon logo"
      className="mx-auto w-32 mb-6 sm:w-44 md:w-64"
      width="200"
      height="200"
    />
  );
}

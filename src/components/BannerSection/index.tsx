// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BannerSection({ banner }: any) {
  return (
    <div
      className="relative sm:w-full w-full h-[10vh] sm:h-[50vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BannerSection({ banner }: any) {
  return (
    <div
      className="relative w-full h-[50vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>
  );
}

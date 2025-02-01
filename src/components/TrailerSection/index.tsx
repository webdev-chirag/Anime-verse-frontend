export default function TrailerSection({ trailer }: any) {
  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
      <div className="relative w-full md:w-2/3 mx-auto">
        <iframe
          className="w-full aspect-video rounded-lg"
          src={trailer}
          title="Anime Trailer"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

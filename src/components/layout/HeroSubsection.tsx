export default function HeroSubsection({ name }: { name: string }) {
  return (
    <section className='relative min-h-screen overflow-hidden'>
      <div className='relative z-20 pt-16'>
        <div className='mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
          <div className='flex min-h-[80vh] flex-col items-center justify-center text-center'>
            <div className='mb-8'>
              <h1 className='font-agency-fb mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-7xl lg:text-8xl'>
                {name}
              </h1>
              <div className='mb-2 font-mono text-xl text-cyan-100 drop-shadow-md md:text-2xl'>
                Indian Institute of Technology (BHU) Varanasi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

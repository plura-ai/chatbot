

export default function Heading() {

  return <div className='absolute top-2 w-[96%] p-[0.8rem_2rem] flex z-[999]  justify-between bg-secondary/30 
  backdrop-blur-lg supports-[backdrop-filter]:bg-secondary/50 dark:border-border rounded-2xl'>
    <div className='flex flex-row items-center gap-2'>
      <img src="https://www.plura.pro/_next/image?url=%2Fimages%2Fplura-logo.png&w=64&q=75" alt="plura" className="w-8 h-8" />
      <h2 className='font-bold text-xl tracking-tighter'>
        PluraBot
      </h2>
    </div>
    <span
      className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg 
      font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
      disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 
      bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 py-2 h-8 w-8 px-0"
    // onClick={() => { setWindowState(current => !current) }}
    >
      <i className="fa-solid fa-xmark"></i>
    </span>
  </div>
}
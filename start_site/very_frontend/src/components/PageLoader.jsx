
export default function PageLoader() {
  return (
    <section className="fixed max-h-screen inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 bg-lime-400/50 blur-xl rounded-full animate-pulse" />
        </div>

        {/* Cube container */}
        <div className="relative w-31 h-31 perspective-800">
          <div className="relative w-full h-full animate-spin-slow [transform-style:preserve-3d]">
            {/* Front face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'translateZ(64px)' }}>
            </div>
            {/* Back face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'rotateY(180deg) translateZ(64px)' }}>
            </div>
            {/* Right face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'rotateY(90deg) translateZ(64px)' }}>
            </div>
            {/* Left face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'rotateY(-90deg) translateZ(64px)' }}>
              {/* <span className="text-lime-400 text-xs font-mono tracking-wider">d</span> */}
            </div>
            {/* Top face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'rotateX(90deg) translateZ(64px)' }}>
            </div>
            {/* Bottom face */}
            <div className="absolute w-31 h-31 border-2 border-lime-400/80 bg-black/20 backdrop-blur-lg flex rounded-sm items-center justify-center"
                 style={{ transform: 'rotateX(-90deg) translateZ(64px)' }}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
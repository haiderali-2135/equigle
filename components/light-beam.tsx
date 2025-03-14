'use client'

function CenterLightBeam() {
    return (
      <div className="absolute top-21.5 left-0 right-0 flex flex-col items-center justify-center overflow-hidden -z-0">
        <div className="relative flex flex-col items-center">
          <div className="relative h-1 w-40 sm:w-60 md:w-80 lg:w-110 bg-white shadow-[0_0_30px_15px_rgba(255,255,255,0.1)]">
            <div className="absolute inset-0 bg-white blur-sm"></div>
          </div>
          <div
            className="h-[200px] sm:h-[250px] md:h-[300px] w-[300px] sm:w-[450px] md:w-[600px]"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0) 70%)",
            }}
          ></div>
        </div>
      </div>
    )
  }

export default CenterLightBeam
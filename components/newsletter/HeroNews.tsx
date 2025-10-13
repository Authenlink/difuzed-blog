import CTA from "../cta";
import { Ripple } from "../ui/ripple";
import { Spotlight } from "../ui/spotlight";

const HeroNews = () => {
  return (
    <div className="pb-10 pt-20 mb-4 md:mb-16" id="acceuil">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="oklch(var(--primary))"
        />
        <Spotlight
          className="h-[70vh] w-[50vw] top-10 left-full"
          fill="oklch(var(--primary))"
        />
        <Spotlight
          className="left-80 top-28 h-[80vh] w-[50vw]"
          fill="oklch(var(--accent))"
        />
      </div>

      <div className="h-[60vh] md:h-[65vh] w-full bg-background absolute top-10 left-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute inset-0 opacity-30">
          <Ripple />
          {/* <DottedMap markers={markers} /> */}
        </div>
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center text-center">
          <p className="uppercase tracking-widest text-md text-primary max-w-80 mb-5 mt-10">
            AuthenLink Newsletter
          </p>

          <div className="text-4xl md:text-4xl lg:text-5xl leading-tight md:leading-normal font-bold md:font-normal text-foreground">
            L’<span className="text-primary font-bold">IA</span> avance vite. Ne
            restez pas derrière.
          </div>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Recevez chaque semaine notre newsletter pour maîtriser les dernières
            tendances et découvrir les nouveaux éléments de votre future stack.
          </p>

          <div className="mt-6 w-full">
            <CTA />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroNews;

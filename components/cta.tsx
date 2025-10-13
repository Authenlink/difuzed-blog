"use client";

import { useState } from "react";
import MagicButton from "./ui/magicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { toast } from "react-toastify";

const CTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://primary-production-e46f.up.railway.app/webhook/blog-newsletter-add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      // Toast de succès
      toast.success("Merci ! Vous êtes maintenant inscrit à notre newsletter.", {
        autoClose: 5000,
        position: "top-right",
      });

      setEmail("");
    } catch (err) {
      // Toast d'erreur
      toast.error("Une erreur est survenue. Veuillez réessayer.", {
        autoClose: 5000,
        position: "top-right",
      });
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Container avec bordure gradient et background */}
      <div className="relative p-1 rounded-lg bg-card border border-border">
        {/* Inner container avec background */}
        <div className="relative rounded-lg bg-popover">
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="flex-1 w-full relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pavel@gmail.com"
                required
                disabled={isLoading}
                className="relative w-full h-14 px-6 rounded-lg bg-card/80 backdrop-blur-sm border-2 border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-card transition-all duration-300 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <MagicButton
              title={isLoading ? "Envoi..." : "S'abonner"}
              icon={<FaLocationArrow />}
              position="right"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CTA;

"use client"
import { Button } from "@/components/ui/moving-border";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Button as ShadButton } from "@/components/ui/button"

import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea";
import { Check, CircleX, Copy, Cross, RefreshCcw } from "lucide-react";


export default function Home() {
  // États pour les inputs et le message crypté
  const [key, setKey] = useState('');
  const [message, setMessage] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string>('');

  // Fonction pour gérer le chiffrement

  function onSubmit(e: any) {
    e.preventDefault();
    const encryptMessage = async () => {
      if (message && key) {
        try {
          // Utilisation de CryptoJS pour chiffrer le message avec AES
          const encrypted = CryptoJS.AES.encrypt(message, key).toString();
          setEncryptedMessage(encrypted);
        } catch (error) {
          console.error('Erreur de chiffrement', error);
        }
      } else {
        alert('Veuillez entrer un message et une clé.');
      }
    };

    encryptMessage()

    toast({
      title: "Vos informations:",
      className: "text-white bg-white/5 border border-muted-foreground/50",
      description: (
        <div>Votre message a bien été chiffré</div>
      ),
    })
  }

  const handleCopy = async () => {
    try {
      // Utiliser la Clipboard API pour copier le texte
      await navigator.clipboard.writeText(encryptedMessage);
      
      // Optionnel : Retour visuel pour l'utilisateur
      toast({
        className: "text-white bg-white/5 border border-muted-foreground/50",
        description: (
          <div className="flex gap-2 items-center">Copié <Check className="w-4 h-4"/></div>
        ),
      })
    } catch (err) {
      toast({
        className: "text-white bg-white/5 border border-muted-foreground/50",
        description: (
          <div  className="flex gap-2 items-center">Erreur <CircleX className="w-4 h-4"/></div>
        ),
      })
    }
  };

  const people = [
    {
      id: 2,
      name: "marsyiet",
      designation: "Dev",
      image:
        "/marius.png",
    },
  ];

  return (
    <main className="bg-foreground py-10 min-h-screen">

      <div className="flex flex-col justify-center items-center gap-10 w-full lg:max-w-screen-lg mx-auto">
        {encryptedMessage ?
          <motion.div className="flex flex-col justify-center items-center px-10 gap-10 max-w-screen-lg mx-auto w-full"
          initial={{ opacity: 0, y: 50 }}   // État initial (transparent et décalé)
          animate={{ opacity: 1, y: 0 }}    // Révéler l'élément (opacité 1 et position finale)
          transition={{ duration: 1 }}      // Durée de l'animation
          >
            <HeroHighlight>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-xl riking px-4 md:text-4xl lg:text-4xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
              >
                VOTRE <br />
                {" "}
                <Highlight className="text-white text-2xl lg:text-4xl">
                  RESULTAT
                </Highlight>
              </motion.h1>
            </HeroHighlight>
            <Textarea defaultValue={encryptedMessage} id="result" disabled />
            <div className="flex gap-5">
              <ShadButton onClick={() => setEncryptedMessage("")}>Réessayer <RefreshCcw /></ShadButton>
              <ShadButton variant={'outline'} onClick={()=>handleCopy()}>Copier <Copy /></ShadButton>
            </div>
          </motion.div>
          :
          <>
            <HeroHighlight>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-xl riking px-4 md:text-4xl lg:text-4xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
              >
                CHIFFREZ VOTRE MESSAGE <br />
                {" "}
                <Highlight className="text-white text-2xl lg:text-4xl">
                  AVEC AES
                </Highlight>
              </motion.h1>
            </HeroHighlight>
            <form onSubmit={onSubmit} className="w-full px-10 lg:px-2 space-y-6">
              <Input placeholder="Votre message..." type="text" onChange={(e) => setMessage(e.target.value)} />
              <Input placeholder="Votre clé de chiffrement 🗝️" onChange={(e) => setKey(e.target.value)} />
              <div className="flex items-center justify-center">
                <Button
                  type="submit"
                  borderRadius="1.75rem"
                  className="bg-black dark:bg-slate-900 text-white font-bold dark:text-white dark:border-slate-800 flex items-center justify-center"
                >
                  Chiffrer mon message
                </Button>
              </div>
            </form>
          </>
        }
        <div className="w-full px-10 lg:w-4/5">
          <p className="text-center text-sm text-muted-foreground">
            Cette page est une implémentation des connaissances acquises dans le cadre de recherches sur le fonctionnement de l'algorithme de chiffrement symétrique AES et des fonctions homomorphiques.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={people} />
        </div>
        <div className="w-full px-2 lg:w-3/5">
          <p className="font-thin text-xs text-center text-muted-foreground">
            ©marsyiet-2024
          </p>
        </div>
      </div>

    </main>
  );
}

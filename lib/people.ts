import type { StaticImageData } from "next/image";
import khyatiPhoto from "@/public/assets/people/khyati-arora.jpg";
import kartikPhoto from "@/public/assets/people/kartik-sahni.jpg";

/*
  The founders. Photos are the team's own original portraits (from socialguava.com), reused
  with the owner's confirmed authorization. Never replace them with stock or AI portraits.
*/

export type Person = {
  name: string;
  initials: string;
  role: string;
  motto: string;
  bio: string;
  linkedin: string;
  photo?: StaticImageData;
  alt?: string;
  /** CSS object-position keeping the face in frame for any crop. */
  focal?: string;
};

export const PEOPLE: Person[] = [
  {
    name: "Khyati Arora",
    initials: "KA",
    role: "Co-founder",
    motto: "Strategy with soul",
    bio: "With a decade in social media and brand building, Khyati knows how to turn scattered ideas into scroll-stopping stories that stick.",
    linkedin: "https://www.linkedin.com/in/khyati-arora/",
    photo: khyatiPhoto,
    alt: "Khyati Arora, co-founder of SmartWebCare, smiling in front of a wall of magenta bougainvillea",
    focal: "51% 40%",
  },
  {
    name: "Kartik Sahni",
    initials: "KS",
    role: "Co-founder",
    motto: "Marketing with bite",
    bio: "Kartik's been crafting brands from scratch for 5+ years — bringing bold ideas, sharp instincts, and a love for building things that last.",
    linkedin: "https://www.linkedin.com/in/kartik-sahni-5674991ab/",
    photo: kartikPhoto,
    alt: "Kartik Sahni, co-founder of SmartWebCare, smiling in front of magenta bougainvillea",
    focal: "44% 30%",
  },
];

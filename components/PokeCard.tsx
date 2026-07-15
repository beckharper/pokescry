import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${name}`}
      className="
        group
        rounded-2xl
        border
        bg-white/80
        p-6
        shadow-sm
        backdrop-blur
        transition
        hover:-translate-y-1
        hover:shadow-lg
        dark:bg-black/40
      "
    >
      <div className="flex flex-col items-center gap-3">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          width={120}
          height={120}
          className="
            transition
            group-hover:scale-110
          "
        />

        <div className="text-center">
          <h3 className="font-pixel text-lg font-semibold capitalize">
            {name}
          </h3>

          <p className="font-sans text-sm text-zinc-500">
            #{String(id).padStart(3, "0")}
          </p>
        </div>
      </div>
    </Link>
  );
}

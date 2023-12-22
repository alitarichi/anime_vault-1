"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { fetchAnime } from "@/app/action";
import AnimeCard from "./AnimeCard";

export type AnimeCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData((prevData) => [...prevData, ...res]);
        setPage((prevPage) => prevPage + 1);
      });
    }
  }, [inView, page]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
      <div ref={ref}></div>
    </>
  );
}

export default LoadMore;

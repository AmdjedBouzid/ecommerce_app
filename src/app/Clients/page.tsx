import React from "react";
import LinkToprofile from "../_componnets/LinkToprofile";
const Page = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">aur best clients</h2>

          <p className="mt-4 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
          <LinkToprofile />
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-secondry focus:outline-none focus:ring focus:ring-yellow-400"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Page;

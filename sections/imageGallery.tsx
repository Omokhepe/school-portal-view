"use client";

import React from "react";

import Image from "next/image";
import { albums } from "../constant/data";
import { motion } from "framer-motion";

const ImageGallery = () => {
  return (
    <section className="bg-greyGreen px-6 py-16 space-y-16">
      {albums.map((album, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Album header */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-amber-50">
              {album.title}
            </h3>
            <p className="text-sm text-off-white">{album.date}</p>
          </div>

          {/* Album grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {album.images.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/2] rounded-xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${album.title} image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default ImageGallery;

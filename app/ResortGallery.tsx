'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source).width(1200).auto('format').url();
}

export default function ResortGallery({ sections }: { sections: any[] }) {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<any[]>([]);

  const handleOpenGallery = (sanityImages: any[]) => {
    if (!sanityImages) return;
    const gallerySlides = sanityImages.map((img: any) => ({ src: urlFor(img) }));
    setSlides(gallerySlides);
    setOpen(true);
  };

  if (!sections || sections.length === 0) {
    return <div className="text-center py-20 text-gray-500">Loading Sections...</div>;
  }

  return (
    <div className="space-y-20 lg:space-y-32">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const images = section.images || [];
        
        const previewImages = images.map((img: any) => 
          builder.image(img).width(800).auto('format').url()
        );

        return (
          <motion.div 
            key={section._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            // MOBILE: flex-col-reverse (Image Top, Text Bottom)
            // DESKTOP: flex-row (Side by Side)
            className={`flex flex-col-reverse ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 px-6 lg:px-20 overflow-hidden`}
          >
            {/* Text Area */}
            <div className="flex-1 space-y-4 w-full">
              <h2 className="text-3xl lg:text-5xl font-serif text-emerald-950 font-medium">
                {section.title}
              </h2>
              <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-lg">
                {section.description}
              </p>
              <button 
                onClick={() => handleOpenGallery(images)}
                className="group flex items-center gap-2 text-emerald-800 font-bold hover:text-amber-600 transition-colors uppercase tracking-widest text-xs lg:text-sm pt-2"
              >
                View Gallery <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Image Area */}
            <div 
              className="flex-1 w-full h-[300px] lg:h-[450px] relative cursor-pointer group shadow-2xl rounded-2xl overflow-hidden bg-stone-200"
              onClick={() => handleOpenGallery(images)}
            >
              {/* DESKTOP GRID (Hidden on Mobile) */}
              <div className="hidden lg:grid grid-cols-2 gap-2 h-full">
                 <div className="relative h-full w-full row-span-2">
                    {previewImages[0] && <Image src={previewImages[0]} alt="Main" fill className="object-cover" />}
                 </div>
                 <div className="flex flex-col gap-2 h-full">
                    <div className="relative flex-1 bg-stone-300">
                        {previewImages[1] && <Image src={previewImages[1]} alt="Sub 1" fill className="object-cover" />}
                    </div>
                    <div className="relative flex-1 bg-stone-300">
                         {previewImages[2] && <Image src={previewImages[2]} alt="Sub 2" fill className="object-cover" />}
                         <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white font-bold backdrop-blur-[1px]">
                            + More
                         </div>
                    </div>
                 </div>
              </div>

              {/* MOBILE SINGLE HERO IMAGE (Visible only on Mobile) */}
              <div className="lg:hidden relative w-full h-full">
                 {previewImages[0] ? (
                    <>
                      <Image 
                        src={previewImages[0]} 
                        alt={section.title} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                        Tap to view {images.length} photos
                      </div>
                    </>
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image Uploaded
                    </div>
                 )}
              </div>
            </div>
          </motion.div>
        );
      })}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />
    </div>
  );
}

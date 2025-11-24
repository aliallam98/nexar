/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Fancybox } from "@fancyapps/ui";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";

// Define FancyboxOptions type based on the actual Fancybox API
type FancyboxOptions = Parameters<typeof Fancybox.bind>[2];

interface FancyboxGalleryProps {
  children: React.ReactNode;
  options?: Partial<FancyboxOptions>;
  className?: string;
  selector?: string;
}

interface FancyboxImageProps {
  src: string;
  thumb?: string;
  alt: string;
  caption?: string;
  gallery?: string;
  className?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  loading?: "lazy" | "eager";
}

// Custom hook for Fancybox using the npm package
function useFancybox(options: Partial<FancyboxOptions> = {}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (root) {
      const defaultOptions = {
        Toolbar: {
          display: {
            left: ["infobar"],
            middle: [
              "zoomIn",
              "zoomOut",
              "toggle1to1",
              "rotateCCW",
              "rotateCW",
              "flipX",
              "flipY",
            ],
            right: ["slideshow", "thumbs", "download", "fullscreen", "close"],
          },
        },
        Images: {
          zoom: true,
          wheel: "zoom",
          fit: "contain",
          preload: 2,
        },
        Slideshow: {
          autoStart: false,
          speed: 3000,
        },
        Thumbs: {
          autoStart: true,
          minCount: 2,
          key: "t",
        },
        Carousel: {
          infinite: true,
          wheel: "slide",
          Navigation: {
            prevTpl:
              '<button data-fancybox-prev class="f-button" title="Previous"><svg><path d="M15 4l-8 8 8 8"></path></svg></button>',
            nextTpl:
              '<button data-fancybox-next class="f-button" title="Next"><svg><path d="M9 4l8 8-8 8"></path></svg></button>',
          },
        },
        // Keyboard shortcuts are handled at the root level
        keyboard: {
          Escape: "close",
          Delete: "close",
          Backspace: "close",
          PageUp: "next",
          PageDown: "prev",
          ArrowUp: "prev",
          ArrowDown: "next",
          ArrowRight: "next",
          ArrowLeft: "prev",
        },
        Fullscreen: {
          autoStart: false,
        },
        Hash: false, // Set to false to disable hash navigation
        showClass: "fancybox-zoomInUp",
        hideClass: "fancybox-zoomOutDown",
        dragToClose: true,
        hideScrollbar: true,
        closeButton: "auto",
        // on: {
        //   ready: (fancybox) => {
        //     console.log("Fancybox is ready");
        //   },
        //   closing: (fancybox) => {
        //     console.log("Fancybox is closing");
        //   },
        //   done: (fancybox, slide) => {
        //     console.log("Current slide:", slide);
        //   },
        // },
      };

      const mergedOptions = { ...defaultOptions, ...options };

      // Bind Fancybox to the container
      Fancybox.bind(root, "[data-fancybox]", mergedOptions as any);

      // Cleanup function
      return () => {
        Fancybox.unbind(root);
      };
    }
  }, [root, options]);

  return [setRoot] as const;
}

// Main Gallery Component
export function FancyboxGallery({
  children,
  options = {},
  className = "",
}: //   selector = "[data-fancybox]",
FancyboxGalleryProps) {
  const [fancyboxRef] = useFancybox(options);

  return (
    <div ref={fancyboxRef} className={`fancybox-container ${className}`}>
      {children}
    </div>
  );
}

// Fancybox Image Component
export function FancyboxImage({
  src,
  thumb,
  alt,
  caption,
  gallery = "gallery",
  className = "",
  width,
  height,
  children,
  loading = "lazy",
}: FancyboxImageProps) {
  const handleError = useCallback(
    //e: React.SyntheticEvent<HTMLImageElement>
    () => {
      console.warn("Failed to load image:", src);
    },
    [src]
  );

  return (
    <a
      href={src}
      data-fancybox={gallery}
      data-caption={caption || alt}
      data-thumb={thumb || src}
      className={`fancybox-trigger ${className}`}
      title={alt}
      aria-label={`Open ${alt} in gallery`}
    >
      {children || (
        <Image
          src={thumb || src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onError={handleError}
          className="fancybox-thumbnail"
          style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
          }}
        />
      )}
    </a>
  );
}

// Video component for Fancybox
interface FancyboxVideoProps {
  src: string;
  thumb?: string;
  alt: string;
  caption?: string;
  gallery?: string;
  className?: string;
  children?: React.ReactNode;
}

export function FancyboxVideo({
  src,
  thumb,
  alt,
  caption,
  gallery = "gallery",
  className = "",
  children,
}: FancyboxVideoProps) {
  return (
    <a
      href={src}
      data-fancybox={gallery}
      data-caption={caption || alt}
      data-thumb={thumb}
      className={`fancybox-trigger fancybox-video ${className}`}
      title={alt}
      aria-label={`Play ${alt} video`}
    >
      {children || (
        <div className="fancybox-video-thumbnail">
          {thumb && (
            <Image
              src={thumb}
              alt={alt}
              className="video-thumb"
              style={{
                maxWidth: "100%",
                height: "auto",
                display: "block",
              }}
            />
          )}
          <div className="play-button">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </a>
  );
}

// Utility functions for advanced usage
export const FancyboxUtils = {
  // Show a single image
  show: (items: any[], options?: Partial<FancyboxOptions>) => {
    Fancybox.show(items, options);
  },

  // Close current instance
  close: (all = false) => {
    Fancybox.close(all);
  },

  // Get current instance
  getInstance: () => {
    return Fancybox.getInstance();
  },

  // Destroy all instances
  destroy: () => {
    Fancybox.destroy();
  },
};

// Higher-order component for programmatic usage
interface FancyboxWrapperProps {
  children: (api: typeof FancyboxUtils) => React.ReactNode;
  options?: Partial<FancyboxOptions>;
}

export function FancyboxWrapper({
  children,
  options = {},
}: FancyboxWrapperProps) {
  return (
    <FancyboxGallery options={options}>
      {children(FancyboxUtils)}
    </FancyboxGallery>
  );
}

export default FancyboxGallery;

// export function BasicGallery() {
//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">My Photo Gallery</h2>

//       <FancyboxGallery className="grid grid-cols-3 gap-4">
//         <FancyboxImage
//           src="/images/photo1-large.jpg"
//           thumb="/images/photo1-thumb.jpg"
//           alt="Beautiful landscape"
//           caption="A stunning mountain view"
//           width={300}
//           height={200}
//         />
//         <FancyboxImage
//           src="/images/photo2-large.jpg"
//           thumb="/images/photo2-thumb.jpg"
//           alt="City skyline"
//           caption="Downtown at sunset"
//           width={300}
//           height={200}
//         />
//         <FancyboxImage
//           src="/images/photo3-large.jpg"
//           thumb="/images/photo3-thumb.jpg"
//           alt="Nature scene"
//           caption="Forest pathway"
//           width={300}
//           height={200}
//         />
//       </FancyboxGallery>
//     </div>
//   );
// }

// export function CustomGallery() {
//   const customOptions = {
//     Slideshow: {
//       autoStart: true,
//       speed: 2000,
//     },
//     Thumbs: {
//       autoStart: false,
//     },
//     Toolbar: {
//       display: {
//         left: ["infobar"],
//         middle: ["zoomIn", "zoomOut", "rotateCW"],
//         right: ["fullscreen", "close"],
//       },
//     },
//   };

//   return (
//     <FancyboxGallery options={customOptions} className="my-gallery">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//         <FancyboxImage
//           src="/images/img1.jpg"
//           alt="Image 1"
//           width={250}
//           height={250}
//           gallery="custom-gallery"
//         />
//         <FancyboxImage
//           src="/images/img2.jpg"
//           alt="Image 2"
//           width={250}
//           height={250}
//           gallery="custom-gallery"
//         />
//         {/* Add more images... */}
//       </div>
//     </FancyboxGallery>
//   );
// }

// export function MixedGallery() {
//   return (
//     <FancyboxGallery className="mixed-content-gallery">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <FancyboxImage
//           src="/images/photo1.jpg"
//           alt="Photo 1"
//           width={300}
//           height={200}
//           gallery="mixed"
//         />
//         <FancyboxVideo
//           src="/videos/video1.mp4"
//           thumb="/images/video1-thumb.jpg"
//           alt="Sample Video"
//           caption="This is a sample video"
//           gallery="mixed"
//         />
//         <FancyboxImage
//           src="/images/photo2.jpg"
//           alt="Photo 2"
//           width={300}
//           height={200}
//           gallery="mixed"
//         />
//       </div>
//     </FancyboxGallery>
//   );
// }

// export function CustomTriggers() {
//   return (
//     <FancyboxGallery>
//       <div className="flex flex-wrap gap-4">
//         {/* Custom button trigger */}
//         <FancyboxImage
//           src="/images/large-photo.jpg"
//           alt="Large Photo"
//           gallery="custom-triggers"
//         >
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             View Large Photo
//           </button>
//         </FancyboxImage>

//         {/* Custom card trigger */}
//         <FancyboxImage
//           src="/images/another-photo.jpg"
//           alt="Another Photo"
//           gallery="custom-triggers"
//         >
//           <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow">
//             <img
//               src="/images/another-photo-thumb.jpg"
//               alt="Thumbnail"
//               className="w-full h-32 object-cover rounded"
//             />
//             <h3 className="mt-2 font-semibold">Click to enlarge</h3>
//           </div>
//         </FancyboxImage>
//       </div>
//     </FancyboxGallery>
//   );
// }

// export function ProgrammaticGallery() {
//   const images = [
//     { src: "/images/img1.jpg", caption: "Image 1" },
//     { src: "/images/img2.jpg", caption: "Image 2" },
//     { src: "/images/img3.jpg", caption: "Image 3" },
//   ];

//   const handleShowGallery = () => {
//     FancyboxUtils.show(images);
//   };

//   const handleCloseGallery = () => {
//     FancyboxUtils.close();
//   };

//   return (
//     <FancyboxWrapper>
//       {(api) => (
//         <div className="p-4">
//           <button
//             onClick={handleShowGallery}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//           >
//             Show Gallery
//           </button>
//           <button
//             onClick={handleCloseGallery}
//             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Close Gallery
//           </button>

//           <div className="mt-4 grid grid-cols-3 gap-2">
//             {images.map((img, index) => (
//               <img
//                 key={index}
//                 src={img.src}
//                 alt={img.caption}
//                 className="w-full h-24 object-cover cursor-pointer rounded"
//                 onClick={() => api.show([img], { startIndex: 0 })}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </FancyboxWrapper>
//   );
// }

// export function MultipleGalleries() {
//   return (
//     <div className="space-y-8">
//       {/* Nature Gallery */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Nature Photos</h3>
//         <FancyboxGallery>
//           <div className="grid grid-cols-4 gap-2">
//             <FancyboxImage
//               src="/images/nature1.jpg"
//               alt="Nature 1"
//               gallery="nature"
//               width={200}
//               height={150}
//             />
//             <FancyboxImage
//               src="/images/nature2.jpg"
//               alt="Nature 2"
//               gallery="nature"
//               width={200}
//               height={150}
//             />
//           </div>
//         </FancyboxGallery>
//       </div>

//       {/* Architecture Gallery */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Architecture</h3>
//         <FancyboxGallery>
//           <div className="grid grid-cols-4 gap-2">
//             <FancyboxImage
//               src="/images/arch1.jpg"
//               alt="Architecture 1"
//               gallery="architecture"
//               width={200}
//               height={150}
//             />
//             <FancyboxImage
//               src="/images/arch2.jpg"
//               alt="Architecture 2"
//               gallery="architecture"
//               width={200}
//               height={150}
//             />
//           </div>
//         </FancyboxGallery>
//       </div>
//     </div>
//   );
// }

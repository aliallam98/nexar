import { ArrowLeft, ChevronRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "../lib/utils";

export const MobileMenu = () => {
  const [activePanel, setActivePanel] = useState<"main" | "collection">("main");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  console.log({ activePanel, selectedCollection });

  const collections = [
    {
      name: "Collection 1",
      children: ["Item 1-1", "Item 1-2", "Item 1-3"],
    },
    {
      name: "Collection 2",
      children: ["Item 2-1", "Item 2-2", "Item 2-3"],
    },
    {
      name: "Collection 3",
      children: ["Item 3-1", "Item 3-2", "Item 3-3"],
    },
  ];

  const onSheetClose = () => {
    setActivePanel("main");
    setSelectedCollection(null);
  };

  return (
    <Sheet onOpenChange={onSheetClose}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="pr-0 pt-20 rounded-4xl h-[85vh] overflow-hidden"
      >
        <div className="relative h-full">
          {/* Main Panel */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ${
              activePanel === "main" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-2 space-y-4 overflow-y-auto h-full">
              {collections.map((collection) => (
                <div key={collection.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-3xl font-bold"
                    onClick={() => {
                      setSelectedCollection(collection.name);
                      setActivePanel("collection");
                    }}
                  >
                    <span>{collection.name}</span>
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Collection Detail Panel */}
          {
            <div
              className={`absolute inset-0 z-50 transition-transform duration-300 ${
                activePanel === "collection"
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
            >
              <div className="p-2 space-y-4 overflow-y-auto h-full">
                <Button
                  variant="ghost"
                  className="text-3xl font-bold p-0 mb-4"
                  onClick={onSheetClose}
                >
                  <ArrowLeft className="h-8 w-8 mr-2" />
                  {selectedCollection}
                </Button>

                {collections
                  .find((c) => c.name === selectedCollection)
                  ?.children.map((child) => (
                    <Button
                      key={child}
                      variant="ghost"
                      className="w-full justify-start text-xl pl-4"
                    >
                      {child}
                    </Button>
                  ))}
                {selectedCollection && <ImageGallery />}
              </div>
            </div>
          }
        </div>
      </SheetContent>
    </Sheet>
  );
};

function ImageGallery() {
  const [isMounted, setIsMounted] = useState(false);
  const images = [
    "https://picsum.photos/400/300?1",
    "https://picsum.photos/400/300?2",
    "https://picsum.photos/400/300?3",
    "https://picsum.photos/400/300?4",
  ];

  console.log({ isMounted });

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      {images.map((img, index) => (
        <div
          key={index}
          className={cn(
            "w-full transform transition-all duration-1000 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
            "origin-center hover:z-10",
            isMounted
              ? "opacity-100 translate-y-0 scale-100 rotate-0"
              : "opacity-0 translate-y-12 scale-75 -rotate-6"
          )}
          style={{
            transitionDelay: `${index * 75}ms`,
            perspective: "1000px",
          }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Image
              width={35}
              height={35}
              src={""}
              alt={`Gallery image ${index + 1}`}
              className={cn(
                "object-cover w-full h-48 transform transition-transform duration-500",
                "hover:scale-110 hover:rotate-1"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

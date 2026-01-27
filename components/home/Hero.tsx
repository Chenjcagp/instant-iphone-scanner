"use client";

import { jsPDF } from "jspdf";
import { useTranslations } from "next-intl"; // 引入翻译钩子
import { useEffect, useRef, useState } from "react";

interface ScannedImage {
  id: string;
  url: string;
  width: number;
  height: number;
  file: File;
}

export default function Hero() {
  // 1. 初始化翻译钩子，读取 "Home.Hero" 下的内容
  const t = useTranslations("Home.Hero");

  const [images, setImages] = useState<ScannedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (previewIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [previewIndex]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const processFile = (file: File): Promise<ScannedImage> => {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      objectUrlsRef.current.push(objectUrl);

      const img = new Image();
      img.onload = () => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          url: objectUrl,
          width: img.width,
          height: img.height,
          file: file
        });
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image"));
      };
      img.src = objectUrl;
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 30) {
      alert("You can only upload up to 30 images.");
      return;
    }

    setIsProcessing(true);
    try {
      const newImages: ScannedImage[] = [];
      for (let i = 0; i < files.length; i++) {
        const imgData = await processFile(files[i]);
        newImages.push(imgData);
      }
      setImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to load images.");
    } finally {
      setIsProcessing(false);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  const handleDelete = (id: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    URL.revokeObjectURL(url);
    objectUrlsRef.current = objectUrlsRef.current.filter(u => u !== url);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    setImages(newImages);
  };

  const moveRight = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
    setImages(newImages);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const doc = new jsPDF({
        orientation: "p",
        unit: "px",
        hotfixes: ["px_scaling"]
      });

      doc.deletePage(1);

      for (const img of images) {
        const base64Data = await fileToBase64(img.file);
        const imgWidth = img.width;
        const imgHeight = img.height;
        doc.addPage([imgWidth, imgHeight], imgWidth > imgHeight ? "l" : "p");
        doc.addImage(base64Data, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      doc.save(`scan-${Date.now()}.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please try fewer images.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNextPreview = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (previewIndex !== null && previewIndex < images.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const handlePrevPreview = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (previewIndex !== null && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (previewIndex === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      if (previewIndex < images.length - 1) {
        setPreviewIndex(previewIndex + 1);
      }
    } else if (distance < -minSwipeDistance) {
      if (previewIndex > 0) {
        setPreviewIndex(previewIndex - 1);
      }
    }
  };

  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 px-4 bg-white text-center min-h-[60vh]">
      <div className="max-w-4xl mx-auto">

        {/* 2. 替换标题文案 */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          {t("title_1")} <br className="hidden md:block" />
          <span className="text-blue-600">{t("title_2")}</span>
        </h1>
        <p className="text-slate-500 mb-8 max-w-xl mx-auto text-sm md:text-base">
          {t("subtitle")}
        </p>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleUpload}
          disabled={isProcessing}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center gap-4 mb-8">
          {images.length === 0 ? (
            <div className="flex flex-col w-full max-w-xs gap-3">
              {/* 3. 替换按钮文案 */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {t("btn_photo")}
              </button>
              <button
                onClick={() => galleryInputRef.current?.click()}
                className="bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg py-3 rounded-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                {t("btn_gallery")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full max-w-xs gap-3">
              <button
                onClick={generatePDF}
                disabled={isProcessing}
                className={`w-full ${isProcessing ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>{t("generating")}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>{t("btn_download")}</span>
                  </>
                )}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={images.length >= 30 || isProcessing}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {t("btn_photo")}
                </button>
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={images.length >= 30 || isProcessing}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Gallery
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-3 md:p-6 min-h-[160px]">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t("preview")}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${images.length >= 30 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              {images.length} / 30
            </span>
          </div>

          {images.length === 0 && !isProcessing ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-6">
              <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="text-sm">Ready to scan</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
              {images.map((img, index) => (
                <div key={img.id} className="relative group bg-white p-1 rounded-lg shadow-sm border border-slate-200">
                  <button
                    onClick={(e) => handleDelete(img.id, img.url, e)}
                    className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 z-10 bg-white text-red-500 rounded-full p-0.5 md:p-1 shadow-md border border-slate-100 hover:bg-red-50"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>

                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded cursor-zoom-in bg-slate-100"
                    onClick={() => setPreviewIndex(index)}
                  >
                    <img src={img.url} alt="scan" className="w-full h-full object-cover" />
                    <div className="absolute top-0.5 left-0.5 bg-black/50 text-white text-[10px] px-1.5 rounded backdrop-blur-sm">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-1.5">
                    <button onClick={() => moveLeft(index)} disabled={index === 0} className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button onClick={() => moveRight(index)} disabled={index === images.length - 1} className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="relative bg-slate-100 p-1 rounded-lg border border-slate-200 animate-pulse">
                  <div className="aspect-[3/4] bg-slate-200 rounded"></div>
                  <div className="mt-2 h-4 bg-slate-200 rounded w-full"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {previewIndex !== null && images[previewIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setPreviewIndex(null)}
        >
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md z-[110] border border-white/10">
            {previewIndex + 1} / {images.length}
          </div>

          <button
            className="fixed top-6 right-6 z-[110] text-white/80 hover:text-white p-2 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex(null);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <button
            className={`fixed left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-white bg-black/30 md:bg-white/10 rounded-full backdrop-blur-sm hover:bg-black/50 transition-all z-[110] ${previewIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={handlePrevPreview}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <button
            className={`fixed right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-white bg-black/30 md:bg-white/10 rounded-full backdrop-blur-sm hover:bg-black/50 transition-all z-[110] ${previewIndex === images.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={handleNextPreview}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={images[previewIndex].url}
              alt={`Page ${previewIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}

    </section>
  );
}
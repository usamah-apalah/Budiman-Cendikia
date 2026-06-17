"use client";

import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";

export default function AdminSettingsEdit() {
  const params = useParams();
  const unit = params.unit as "sd" | "smp";

  const [activeTab, setActiveTab] = useState<"logo" | "instagram">("logo");
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Instagram Settings States
  const [instagramTitle, setInstagramTitle] = useState("");
  const [instagramDescription, setInstagramDescription] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [isUpdatingInstagram, setIsUpdatingInstagram] = useState(false);

  // Cropper states and refs
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [libraryReady, setLibraryReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperInstanceRef = useRef<any>(null);

  // Load Cropper.js from CDN dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js";
    script.onload = () => setLibraryReady(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!unit) return;

    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/settings");
        if (res.data) {
          setLogoPreviewUrl(res.data.site_logo || null);
          setInstagramTitle(res.data.instagram_title || "");
          setInstagramDescription(res.data.instagram_description || "");
          setInstagramUrl(res.data.instagram_url || "");
          setInstagramUsername(res.data.instagram_username || "");
        }
      } catch (err) {
        console.error("Gagal memuat logo website:", err);
        toast.error("Gagal memuat logo website.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [unit]);

  // Handle cropper initialization
  useEffect(() => {
    if (showCropper && imageRef.current && selectedImage && libraryReady && (window as any).Cropper) {
      if (cropperInstanceRef.current) {
        cropperInstanceRef.current.destroy();
      }
      const CropperClass = (window as any).Cropper;
      cropperInstanceRef.current = new CropperClass(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "move",
        background: false,
        autoCropArea: 0.9,
        zoomable: true,
        cropBoxMovable: false,
        cropBoxResizable: false,
        ready() {
          // Circular mask styling in Cropper
          const cropperBox = document.querySelector(".cropper-view-box");
          const cropperFace = document.querySelector(".cropper-face");
          if (cropperBox) cropperBox.setAttribute("style", "border-radius: 50%;");
          if (cropperFace) cropperFace.setAttribute("style", "border-radius: 50%;");
        }
      });
    }

    return () => {
      if (cropperInstanceRef.current) {
        cropperInstanceRef.current.destroy();
        cropperInstanceRef.current = null;
      }
    };
  }, [showCropper, selectedImage, libraryReady]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoomIn = () => {
    if (cropperInstanceRef.current) {
      cropperInstanceRef.current.zoom(0.1);
    }
  };

  const handleZoomOut = () => {
    if (cropperInstanceRef.current) {
      cropperInstanceRef.current.zoom(-0.1);
    }
  };

  const handleSaveCrop = () => {
    if (cropperInstanceRef.current) {
      const canvas = cropperInstanceRef.current.getCroppedCanvas({
        width: 300,
        height: 300,
      });

      canvas.toBlob(async (blob: Blob | null) => {
        if (!blob) {
          toast.error("Gagal memproses gambar.");
          return;
        }

        try {
          setIsUpdating(true);
          const formData = new FormData();
          formData.append("logo", blob, "logo.png");

          const res = await api.post("/settings/update", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Logo website berhasil diperbarui!");
          
          if (res.data?.data?.site_logo) {
            setLogoPreviewUrl(res.data.data.site_logo);
          }
          
          setShowCropper(false);
          setSelectedImage(null);
          
          // Force reload to update sidebar/header instantly
          window.location.reload();
        } catch (err: any) {
          console.error(err);
          toast.error(err.response?.data?.message || "Gagal memperbarui logo.");
        } finally {
          setIsUpdating(false);
        }
      }, "image/png");
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleSaveInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdatingInstagram(true);
      const res = await api.post("/settings/update", {
        instagram_title: instagramTitle,
        instagram_description: instagramDescription,
        instagram_url: instagramUrl,
        instagram_username: instagramUsername,
      });
      toast.success("Pengaturan Instagram berhasil diperbarui!");
      if (res.data?.data) {
        setInstagramTitle(res.data.data.instagram_title);
        setInstagramDescription(res.data.data.instagram_description);
        setInstagramUrl(res.data.data.instagram_url);
        setInstagramUsername(res.data.data.instagram_username);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal memperbarui pengaturan Instagram.");
    } finally {
      setIsUpdatingInstagram(false);
    }
  };

  return (
    <AdminLayout unit={unit} title="Pengaturan Website">
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-tosca-500 border-gray-200"></div>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-6">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-tosca-600 font-bold uppercase tracking-widest text-[10px]">Panel Admin</span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-1">Pengaturan Website</h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100 w-full mb-8 justify-center gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("logo")}
                className={`pb-3 text-xs uppercase tracking-wider transition-all focus:outline-none ${
                  activeTab === "logo"
                    ? "text-tosca-600 border-b-2 border-tosca-600 font-black"
                    : "text-gray-400 border-b-2 border-transparent font-bold hover:text-gray-600"
                }`}
              >
                Logo Sekolah
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("instagram")}
                className={`pb-3 text-xs uppercase tracking-wider transition-all focus:outline-none ${
                  activeTab === "instagram"
                    ? "text-tosca-600 border-b-2 border-tosca-600 font-black"
                    : "text-gray-400 border-b-2 border-transparent font-bold hover:text-gray-600"
                }`}
              >
                Instagram & Media
              </button>
            </div>

            {/* Tab 1: Logo Content */}
            {activeTab === "logo" && (
              <div className="w-full flex flex-col items-center">
                {/* Circular Logo Area */}
                {!showCropper ? (
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-tosca-50 flex items-center justify-center bg-gray-50 shadow-inner mb-8">
                    {logoPreviewUrl ? (
                      <img src={logoPreviewUrl} alt="Logo Website" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-tosca-600 flex items-center justify-center text-white text-7xl font-black">
                        B
                      </div>
                    )}
                  </div>
                ) : (
                  /* Cropper Container */
                  <div className="w-64 h-64 border-2 border-dashed border-gray-200 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center mb-6 relative">
                    {selectedImage && (
                      <img
                        ref={imageRef}
                        src={selectedImage}
                        alt="Image to crop"
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                  </div>
                )}

                {/* Controls */}
                {!showCropper ? (
                  <div className="w-full flex flex-col items-center">
                    <label className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl text-xs tracking-wider uppercase cursor-pointer transition-all mb-4">
                      Pilih Gambar
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-gray-400 font-bold">PNG, JPG, JPEG maks. 2MB</p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    {/* Zoom Buttons */}
                    <div className="flex gap-3 mb-6 justify-center">
                      <button
                        type="button"
                        onClick={handleZoomIn}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-lg text-xs border border-gray-100"
                      >
                        Perbesar (+)
                      </button>
                      <button
                        type="button"
                        onClick={handleZoomOut}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-lg text-xs border border-gray-100"
                      >
                        Perkecil (-)
                      </button>
                    </div>

                    {/* Crop Action Buttons */}
                    <div className="w-full flex gap-3">
                      <button
                        type="button"
                        onClick={handleCancelCrop}
                        className="flex-1 py-4 border border-gray-200 text-gray-500 font-bold rounded-2xl text-xs tracking-widest uppercase hover:bg-gray-50 transition-all"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCrop}
                        disabled={isUpdating}
                        className="flex-1 py-4 bg-tosca-600 hover:bg-tosca-700 text-white font-black rounded-2xl text-xs tracking-widest uppercase transition-all shadow-lg shadow-tosca-500/20 disabled:opacity-50"
                      >
                        {isUpdating ? "Menyimpan..." : "Simpan"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Instagram Content */}
            {activeTab === "instagram" && (
              <form onSubmit={handleSaveInstagram} className="w-full space-y-4">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2 text-center">Pengaturan Instagram</h3>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Judul Instagram</label>
                  <input
                    type="text"
                    value={instagramTitle}
                    onChange={(e) => setInstagramTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-tosca-500 transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Deskripsi Instagram</label>
                  <textarea
                    value={instagramDescription}
                    onChange={(e) => setInstagramDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-tosca-500 transition-all font-medium leading-relaxed"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Link Profil Instagram</label>
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-tosca-500 transition-all font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Username Instagram</label>
                  <input
                    type="text"
                    value={instagramUsername}
                    onChange={(e) => setInstagramUsername(e.target.value)}
                    placeholder="sat_almanshurah"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-tosca-500 transition-all font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isUpdatingInstagram}
                  className="w-full py-3.5 bg-tosca-600 hover:bg-tosca-700 disabled:opacity-50 text-white font-black rounded-xl text-[10px] tracking-widest uppercase transition-all shadow-md shadow-tosca-500/20 cursor-pointer"
                >
                  {isUpdatingInstagram ? "Menyimpan..." : "Simpan Pengaturan Instagram"}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </AdminLayout>
  );
}

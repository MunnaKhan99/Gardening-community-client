import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import axios from "axios";

const TipsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true); // লোডিং স্টেট
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        if (!id) return;

        setLoading(true); // ডেটা ফেচ শুরু হওয়ার আগে লোডিং ট্রু
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/tips`)
            .then(res => {
                const singleTip = res.data.find(t => t._id === id);
                if (singleTip) {
                    setTip(singleTip);
                    setLikeCount(singleTip.likes || 0); // আপনার ব্যাকেন্ডে ফিল্ডটি সম্ভবত 'likes'
                }
                setLoading(false); // ডেটা পাওয়ার পর লোডিং ফলস
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleLike = () => {
        if (isLiked) return;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);

        axios
            .patch(`${import.meta.env.VITE_SERVER_URL}/tips/like/${id}`)
            .catch(err => {
                console.error(err);
                setIsLiked(false);
                setLikeCount(prev => prev - 1);
            });
    };

    // --- লোডিং অবস্থা ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <p className="text-sm font-medium animate-pulse" style={{ color: "var(--color-text-muted)" }}>
                    Loading tip details...
                </p>
            </div>
        );
    }

    // --- ডেটা না পাওয়া গেলে ---
    if (!tip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Tip not found!</p>
            </div>
        );
    }

    return (
        <section
            className="min-h-screen py-4 px-4"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Back Button */}
            <div className="max-w-3xl mx-auto mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm flex items-center gap-2 border py-2 px-4 rounded-full transition-all hover:bg-gray-100 active:scale-95 shadow-sm"
                    style={{
                        color: "var(--color-text-secondary)",
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border)"
                    }}
                >
                    ← Back
                </button>
            </div>

            {/* Content Card */}
            <div
                className="max-w-3xl mx-auto rounded-3xl overflow-hidden"
                style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-soft)"
                }}
            >
                {/* Image Section */}
                <div className="relative h-64 md:h-96">
                    <img
                        src={tip.images?.[0] || "https://via.placeholder.com/800x400?text=No+Image"}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-700">
                        {tip.category}
                    </div>
                </div>

                {/* Content Details */}
                <div className="p-8 space-y-6">
                    <h1
                        className="text-3xl font-bold leading-tight"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        {tip.title}
                    </h1>

                    {/* Meta Info & Like Button */}
                    <div
                        className="flex flex-wrap gap-6 text-sm border-y py-4 items-center justify-between"
                        style={{
                            color: "var(--color-text-muted)",
                            borderColor: "var(--color-border)"
                        }}
                    >
                        <div className="flex gap-4">
                            <span><strong>By</strong> {tip.author_name}</span>
                            <span>{new Date().toDateString()}</span>
                        </div>

                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-90 ${isLiked ? 'bg-red-50' : 'bg-gray-50 hover:bg-gray-100'}`}
                            style={{
                                color: isLiked ? "#dc2626" : "var(--color-text-muted)"
                            }}
                        >
                            {isLiked ? <MdFavorite size={22} /> : <MdFavoriteBorder size={22} />}
                            <span className="font-bold">{likeCount}</span>
                        </button>
                    </div>

                    {/* Plant Type Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <h3 className="text-xs uppercase font-bold text-gray-400 mb-1">
                                Plant Type
                            </h3>
                            <p className="font-medium text-green-700">{tip.plant_type_or_topic}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <h3 className="text-xs uppercase font-bold text-gray-400 mb-1">
                                Difficulty
                            </h3>
                            <p className="font-medium">{tip.difficulty || "Medium"}</p>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="pt-2">
                        <h3 className="text-lg font-bold mb-3" style={{ color: "var(--color-text-primary)" }}>
                            Gardeners Guide
                        </h3>
                        <p className="text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--color-text-secondary)" }}>
                            {tip.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TipsDetails;
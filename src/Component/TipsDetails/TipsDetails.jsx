import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const TipsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tip, setTip] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetch("https://cultiv8-server.vercel.app/tips")
            .then(res => res.json())
            .then(data => {
                const singleTip = data.find(t => t._id === id);
                setTip(singleTip);
                setLikeCount(singleTip?.liked || 0);
            });
    }, [id]);

    const handleLike = () => {
        if (isLiked) return; // prevent multiple clicks

        // 🔹 Optimistic UI
        setIsLiked(true);
        setLikeCount(prev => prev + 1);

        fetch(`https://cultiv8-server.vercel.app/tips/like/${id}`, {
            method: "PATCH"
        });
    };

    if (!tip) return null;

    return (
        <section
            className="min-h-screen py-14"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Back */}
            <div className="max-w-3xl mx-auto mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm flex items-center gap-2 border py-2 px-3 rounded-2xl"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    ← Back
                </button>
            </div>

            {/* Card */}
            <div
                className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
                style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-soft)"
                }}
            >
                {/* Image */}
                <div className="relative h-72">
                    <img
                        src={tip.images?.[0]}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        {tip.title}
                    </h1>

                    {/* Meta */}
                    <div
                        className="flex flex-wrap gap-6 text-sm border-b pb-4 items-center"
                        style={{
                            color: "var(--color-text-muted)",
                            borderColor: "var(--color-border)"
                        }}
                    >
                        <span>By {tip.author_name}</span>
                        <span>{new Date().toDateString()}</span>

                        {/* LIKE */}
                        <butt
                            onClick={handleLike}
                            className="flex items-center gap-1 transition"
                            style={{
                                color: isLiked ? "#dc2626" : "var(--color-text-muted)"
                            }}
                        >
                            {isLiked ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
                            {likeCount}
                        </butt>
                    </div>

                    {/* Plant Type */}
                    <div>
                        <h3 className="text-sm font-semibold mb-1">
                            Plant Type
                        </h3>
                        <p>{tip.plant_type_or_topic}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-semibold mb-1">
                            Description
                        </h3>
                        <p className="text-sm leading-relaxed">
                            {tip.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TipsDetails;

import { useEffect, useState } from "react";
import { Link } from "react-router";

const GardenTips = () => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        fetch("https://cultiv8-server.vercel.app/tips")
            .then(res => res.json())
            .then(data => setTips(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section
            className="py-20"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <span
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm mb-4"
                    style={{
                        backgroundColor: "var(--color-primary-soft)",
                        color: "var(--color-primary)"
                    }}
                >
                    Popular
                </span>

                <h2
                    className="text-3xl md:text-4xl font-bold mb-3"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Top Trending Garden Tips
                </h2>

                <p
                    className="text-base"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Discover the most loved gardening tips from our community
                </p>
            </div>

            {/* Tips Grid */}
            <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tips
                    .filter(tip => tip.availability === "Public")
                    .slice(0, 6)
                    .map(tip => (
                        <div
                            key={tip._id}
                            className="rounded-2xl overflow-hidden transition hover:-translate-y-1"
                            style={{
                                backgroundColor: "var(--color-bg-secondary)",
                                boxShadow: "var(--shadow-soft)"
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-48">
                                <img
                                    src={tip.images?.[0]}
                                    alt={tip.title}
                                    className="w-full h-full object-cover"
                                />

                                {/* Category */}
                                <span
                                    className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: "var(--color-primary-soft)",
                                        color: "var(--color-primary)"
                                    }}
                                >
                                    {tip.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                {/* Difficulty + Topic */}
                                <div className="flex items-center gap-2 text-xs">
                                    <span
                                        className="px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor:
                                                tip.difficulty === "Easy"
                                                    ? "var(--color-primary-soft)"
                                                    : tip.difficulty === "Medium"
                                                        ? "var(--color-warning)"
                                                        : "#fecaca",
                                            color:
                                                tip.difficulty === "Easy"
                                                    ? "var(--color-primary)"
                                                    : "#78350f"
                                        }}
                                    >
                                        {tip.difficulty}
                                    </span>

                                    <span style={{ color: "var(--color-text-muted)" }}>
                                        {tip.plant_type_or_topic}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-base font-semibold"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {tip.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    {tip.description.slice(0, 110)}...
                                </p>

                                {/* Author */}
                                <p
                                    className="text-xs pt-2 border-t"
                                    style={{
                                        borderColor: "var(--color-border)",
                                        color: "var(--color-text-muted)"
                                    }}
                                >
                                    By {tip.author_name}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Button */}
            <div className="text-center mt-14">
                <Link
                    to="/browse-tips"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition"
                    style={{ backgroundColor: "var(--color-primary)" }}
                >
                    Browse All Tips →
                </Link>
            </div>
        </section>
    );
};

export default GardenTips;

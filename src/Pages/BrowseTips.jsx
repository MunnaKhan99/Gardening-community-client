import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BrowseTips = () => {
    const navigate = useNavigate();
    const [tips, setTips] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetch("http://localhost:5000/tips")
            .then(res => res.json())
            .then(data => {
                const publicTips = data.filter(
                    tip => tip.availability === "Public"
                );
                setTips(publicTips);
            })
            .catch(err => console.error(err));
    }, []);

    const filteredTips =
        filter === "All"
            ? tips
            : tips.filter(tip => tip.difficulty === filter);

    return (
        <section
            className="min-h-screen py-16"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Browse Garden Tips
                </h1>
                <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Explore gardening tips shared by our community
                </p>
            </div>

            {/* Filter */}
            <div
                className="max-w-6xl mx-auto mb-8 rounded-xl p-5"
                style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-soft)"
                }}
            >
                <p
                    className="mb-3 text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Filter by Difficulty Level
                </p>

                <div className="flex gap-3 flex-wrap">
                    {["All", "Easy", "Medium", "Hard"].map(level => (
                        <button
                            key={level}
                            onClick={() => setFilter(level)}
                            className="px-4 py-1.5 rounded-full text-sm transition"
                            style={{
                                backgroundColor:
                                    filter === level
                                        ? "var(--color-primary)"
                                        : "var(--color-bg-secondary)",
                                color:
                                    filter === level
                                        ? "#ffffff"
                                        : "var(--color-text-primary)"
                            }}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div
                className="max-w-6xl mx-auto rounded-xl overflow-hidden"
                style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-soft)"
                }}
            >
                <table className="w-full text-sm">
                    <thead
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        <tr className="text-white text-left">
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Difficulty</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTips.map(tip => (
                            <tr
                                key={tip._id}
                                className="border-b last:border-none"
                                style={{ borderColor: "var(--color-border)" }}
                            >
                                {/* Image */}
                                <td className="px-4 py-3">
                                    <img
                                        src={tip.images?.[0]}
                                        alt={tip.title}
                                        className="w-12 h-12 rounded-md object-cover"
                                    />
                                </td>

                                {/* Title */}
                                <td
                                    className="px-4 py-3 max-w-xs truncate"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    {tip.title}
                                </td>

                                {/* Category */}
                                <td className="px-4 py-3">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary-soft)",
                                            color: "var(--color-primary)"
                                        }}
                                    >
                                        {tip.category}
                                    </span>
                                </td>

                                {/* Difficulty */}
                                <td className="px-4 py-3">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs"
                                        style={{
                                            backgroundColor:
                                                tip.difficulty === "Easy"
                                                    ? "var(--color-primary-soft)"
                                                    : "var(--color-warning)",
                                            color:
                                                tip.difficulty === "Easy"
                                                    ? "var(--color-primary)"
                                                    : "#78350f"
                                        }}
                                    >
                                        {tip.difficulty}
                                    </span>
                                </td>

                                {/* Author */}
                                <td
                                    className="px-4 py-3"
                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    {tip.author_name}
                                </td>

                                {/* Action */}
                                <td className="px-4 py-3">
                                    <button
                                     onClick={()=> navigate(`/tips/${tip._id}`)}

                                        className="px-4 py-1.5 rounded-full text-xs text-white transition"
                                        style={{
                                            backgroundColor:
                                                "var(--color-primary)"
                                        }}
                                    >
                                        See More
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default BrowseTips;

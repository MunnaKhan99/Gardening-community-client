import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const TipsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tip, setTip] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/tips")
            .then(res => res.json())
            .then(data => {
                const singleTip = data.find(t => t._id === id);
                setTip(singleTip);
            })
            .catch(err => console.error(err));
    }, [id]);

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

                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <span
                            className="px-3 py-1 rounded-full text-xs"
                            style={{
                                backgroundColor: "var(--color-primary-soft)",
                                color: "var(--color-primary)"
                            }}
                        >
                            {tip.category}
                        </span>

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
                    </div>
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
                        className="flex flex-wrap gap-6 text-sm border-b pb-4"
                        style={{
                            color: "var(--color-text-muted)",
                            borderColor: "var(--color-border)"
                        }}
                    >
                        <span>By {tip.author_name}</span>
                        <span>{new Date().toDateString()}</span>
                        <span>❤️ 187</span>
                    </div>

                    {/* Plant Type */}
                    <div>
                        <h3
                            className="text-sm font-semibold mb-1"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Plant Type
                        </h3>
                        <p style={{ color: "var(--color-text-secondary)" }}>
                            {tip.plant_type_or_topic}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3
                            className="text-sm font-semibold mb-1"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Description
                        </h3>
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            {tip.description}
                        </p>
                    </div>

                    {/* Tips box */}
                    <div
                        className="rounded-xl p-4 text-sm"
                        style={{
                            backgroundColor: "var(--color-primary-soft)",
                            color: "var(--color-text-secondary)"
                        }}
                    >
                        <h4
                            className="font-semibold mb-2"
                            style={{ color: "var(--color-primary)" }}
                        >
                            Gardening Tips
                        </h4>
                        <ul className="list-disc ml-5 space-y-1">
                            <li>Save this tip to try it in your own garden</li>
                            <li>Share your results with the community</li>
                            <li>Like the tip if you found it helpful</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TipsDetails;

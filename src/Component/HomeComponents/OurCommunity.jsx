import { useEffect, useState } from "react";
import { Link } from "react-router";

const OurCommunity = () => {
    const [gardeners, setGardeners] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/gardener")
            .then(res => res.json())
            .then(data => {
                const activeGardeners = data.filter(
                    gardener => gardener.status === "Active"
                );
                setGardeners(activeGardeners);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <section
            className="py-20"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
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
                    Our Community test
                </span>

                <h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Featured Active Gardeners
                </h2>

                <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Meet our most active community members who are passionate
                    about sharing their gardening expertise
                </p>
            </div>

            {/* Cards */}
            <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {gardeners.slice(0, 6).map(gardener => (
                    <div
                        key={gardener._id}
                        className="rounded-2xl overflow-hidden transition hover:-translate-y-1"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            boxShadow: "var(--shadow-soft)"
                        }}
                    >
                        {/* Image */}
                        <div className="relative h-52">
                            <img
                                src={gardener.image}
                                alt={gardener.name}
                                className="w-full h-full object-cover"
                            />

                            <span
                                className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white"
                                style={{ backgroundColor: "var(--color-success)" }}
                            >
                                Active
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                            <h3
                                className="text-lg font-semibold"
                                style={{ color: "var(--color-text-primary)" }}
                            >
                                {gardener.name}
                            </h3>

                            <p
                                className="text-sm"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                {gardener.age} years • {gardener.gender}
                            </p>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                {gardener.bio}
                            </p>

                            <div
                                className="flex justify-between pt-3 border-t text-sm"
                                style={{ borderColor: "var(--color-border)" }}
                            >
                                <span style={{ color: "var(--color-primary)" }}>
                                    📖 {gardener.total_shared_tips} tips
                                </span>

                                <span style={{ color: "var(--color-primary)" }}>
                                    {gardener.experience_years} years
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="text-center mt-14">
                <Link
                    to="/explore-gardener"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition"
                    style={{
                        backgroundColor: "var(--color-primary)"
                    }}
                >
                    Explore More →
                </Link>
            </div>
        </section>
    );
};

export default OurCommunity;

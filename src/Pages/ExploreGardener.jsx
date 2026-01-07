import { useContext, useEffect, useState } from "react";
import { authContext } from "../Layout/RootLayout";

const ExploreGardener = () => {
    const [gardeners, setGardeners] = useState([]);
    const { loading, setLoading } = useContext(authContext);

    useEffect(() => {
        fetch("http://localhost:5000/gardener")
            .then(res => res.json())
            .then(data => {
                setGardeners(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="min-h-screen">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto my-12">
                <h1
                    className="text-3xl md:text-4xl font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Explore Gardeners
                </h1>

                <p
                    className="mt-3 text-sm md:text-base"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    Connect with gardening enthusiasts from around the world
                </p>

                <div
                    className="w-20 h-1 mx-auto mt-4 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
            </div>

            {/* Cards */}
            <div className="w-11/12 mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {gardeners.map(gardener => (
                    <div
                        key={gardener._id}
                        className="rounded-2xl overflow-hidden transition hover:-translate-y-1"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            boxShadow: "var(--shadow-soft)"
                        }}
                    >
                        {/* Image */}
                        <div className="relative h-56">
                            <img
                                src={gardener.image}
                                alt={gardener.name}
                                className="w-full h-full object-cover grayscale"
                            />

                            {/* Status */}
                            <span
                                className="absolute bottom-3 left-3 text-white text-xs px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor:
                                        gardener.status === "Active"
                                            ? "var(--color-success)"
                                            : "var(--color-text-muted)"
                                }}
                            >
                                {gardener.status}
                            </span>

                            {/* Tips */}
                            <span
                                className="absolute bottom-3 right-3 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    color: "var(--color-text-primary)",
                                    boxShadow: "var(--shadow-soft)"
                                }}
                            >
                                📖 {gardener.total_shared_tips}
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
                                className="text-sm flex gap-2"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                <span>👤 {gardener.age} years</span>
                                <span>•</span>
                                <span>{gardener.gender}</span>
                            </p>

                            <span
                                className="inline-block text-sm px-4 py-1 rounded-full"
                                style={{
                                    backgroundColor: "var(--color-primary-soft)",
                                    color: "var(--color-primary)"
                                }}
                            >
                                {gardener.experience_years} years experience
                            </span>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                {gardener.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreGardener;

import { useContext, useEffect, useState } from "react";
import { authContext } from "../Layout/RootLayout";
import { Link, useNavigate } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const MyTips = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(authContext);
    const [tips, setTips] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        // যদি ইউজার লোড হয়ে যায় এবং ইমেইল থাকে, তবেই ডাটা ফেচ করবে
        if (!loading && user?.email) {
            axios
                .get(`${import.meta.env.VITE_SERVER_URL}/tips`, {
                    params: { author_email: user.email }
                })
                .then(res => {
                    setTips(res.data);
                    setIsFetching(false);
                })
                .catch(err => {
                    console.error("Fetch Error:", err);
                    setIsFetching(false);
                });
        } else if (!loading && !user) {
            // যদি ইউজার লগইন করা না থাকে
            setIsFetching(false);
        }
    }, [user?.email, loading]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${import.meta.env.VITE_SERVER_URL}/tips/${id}`)
                    .then(res => {
                        // আপনার ব্যাকেন্ড 'res.send(result)' পাঠাচ্ছে, তাই সরাসরি deletedCount পাওয়া যাবে
                        if (res.data?.deletedCount > 0) {
                            setTips(prev => prev.filter(tip => tip._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your garden tip has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#16a34a"
                            });
                        }
                    })
                    .catch(err => {
                        console.error("Delete Error:", err);
                        Swal.fire("Error!", "Failed to delete tip.", "error");
                    });
            }
        });
    };

    // লোডিং অবস্থা
    if (loading || isFetching) {
        return (
            <div className="h-auto flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <section
            className="h-auto py-16"
            style={{ backgroundColor: "var(--color-bg)" }}
        >
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8 px-4">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    My Garden Tips
                </h1>
                <p
                    className="mt-1"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    Manage all your shared gardening tips ({tips.length})
                </p>
            </div>

            {/* EMPTY STATE */}
            {tips.length === 0 ? (
                <div className="max-w-6xl mx-auto px-4">
                    <div
                        className="rounded-2xl p-16 text-center"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            boxShadow: "var(--shadow-soft)"
                        }}
                    >
                        <p className="mb-6" style={{ color: "var(--color-text-muted)" }}>
                            You haven't shared any garden tips yet.
                        </p>
                        <Link
                            to="/share-tips"
                            className="inline-block px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "var(--color-primary)" }}
                        >
                            Share Your First Tip
                        </Link>
                    </div>
                </div>
            ) : (
                /* TABLE VIEW */
                <div
                    className="max-w-6xl mx-auto px-4 rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: "var(--color-surface)",
                        boxShadow: "var(--shadow-soft)"
                    }}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead style={{ backgroundColor: "var(--color-primary)" }}>
                                <tr className="text-white text-left">
                                    <th className="px-4 py-4">Image</th>
                                    <th className="px-4 py-4">Title</th>
                                    <th className="px-4 py-4">Category</th>
                                    <th className="px-4 py-4">Difficulty</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Likes</th>
                                    <th className="px-4 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tips.map(tip => (
                                    <tr
                                        key={tip._id}
                                        className="border-b last:border-none hover:bg-gray-50/50 transition-colors"
                                        style={{ borderColor: "var(--color-border)" }}
                                    >
                                        <td className="px-4 py-3">
                                            <img
                                                src={tip.images?.[0] || "https://via.placeholder.com/150"}
                                                alt={tip.title}
                                                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                                            />
                                        </td>
                                        <td className="px-4 py-3" style={{ color: "var(--color-text-primary)" }}>
                                            <p className="font-semibold">{tip.title}</p>
                                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                {tip.plant_type_or_topic}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: "var(--color-primary-soft)",
                                                    color: "var(--color-primary)"
                                                }}
                                            >
                                                {tip.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 capitalize">{tip.difficulty}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className="flex items-center gap-1 text-xs font-medium"
                                                style={{ color: "var(--color-success)" }}
                                            >
                                                <FaEye /> {tip.availability}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{tip.likes || 0}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => navigate(`/update-tip/${tip._id}`)}
                                                    className="p-2 rounded-lg hover:brightness-95 transition-all"
                                                    style={{ backgroundColor: "#e0f2fe" }}
                                                    title="Edit"
                                                >
                                                    <FaEdit className="text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tip._id)}
                                                    className="p-2 rounded-lg hover:brightness-95 transition-all"
                                                    style={{ backgroundColor: "#fee2e2" }}
                                                    title="Delete"
                                                >
                                                    <FaTrash className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyTips;
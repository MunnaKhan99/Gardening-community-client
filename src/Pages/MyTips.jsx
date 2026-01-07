import { useContext, useEffect, useState } from "react";
import { authContext } from "../Layout/RootLayout";
import { Link, useNavigate } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const MyTips = () => {
    const navigate = useNavigate();
    const { user, loading, setLoading } = useContext(authContext);
    const [tips, setTips] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch("http://localhost:5000/tips")
            .then(res => res.json())
            .then(data => {
                const myTips = data.filter(
                    tip => tip.author_email === user.email
                );
                setTips(myTips);
                setLoading(false);
            });
    }, [user, setLoading]);

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
                fetch(`http://localhost:5000/tips/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            // UI update
                            setTips(prev => prev.filter(tip => tip._id !== id));

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your garden tip has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#16a34a"
                            });
                        }
                    });
            }
        });
    };

    if (loading) return null;

    return (
        <section
            className="min-h-screen py-16"
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
                    Manage all your shared gardening tips
                </p>
            </div>

            {/* EMPTY STATE */}
            {tips.length === 0 && (
                <div className="max-w-6xl mx-auto px-4">
                    <div
                        className="rounded-2xl p-16 text-center"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            boxShadow: "var(--shadow-soft)"
                        }}
                    >
                        <p
                            className="mb-6"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            You haven't shared any garden tips yet.
                        </p>

                        <Link
                            to="/share-tips"
                            className="inline-block px-6 py-3 rounded-full text-white font-medium"
                            style={{ backgroundColor: "var(--color-primary)" }}
                        >
                            Share Your First Tip
                        </Link>
                    </div>
                </div>
            )}

            {/* TABLE VIEW */}
            {tips.length > 0 && (
                <div
                    className="max-w-6xl mx-auto px-4 rounded-2xl overflow-hidden"
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
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Likes</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tips.map(tip => (
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
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </td>

                                    {/* Title */}
                                    <td
                                        className="px-4 py-3"
                                        style={{ color: "var(--color-text-primary)" }}
                                    >
                                        <p className="font-medium">{tip.title}</p>
                                        <p
                                            className="text-xs"
                                            style={{ color: "var(--color-text-muted)" }}
                                        >
                                            {tip.plant_type_or_topic}
                                        </p>
                                    </td>

                                    {/* Category */}
                                    <td className="px-4 py-3">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs"
                                            style={{
                                                backgroundColor: "var(--color-primary-soft)",
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
                                                backgroundColor: "var(--color-primary-soft)",
                                                color: "var(--color-primary)"
                                            }}
                                        >
                                            {tip.difficulty}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className="flex items-center gap-1 text-sm"
                                            style={{ color: "var(--color-success)" }}
                                        >
                                            <FaEye /> {tip.availability}
                                        </span>
                                    </td>

                                    {/* Likes */}
                                    <td className="px-4 py-3">
                                        {tip.likes || 0}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/update-tip/${tip._id}`)}
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: "#e0f2fe" }}
                                            >
                                                <FaEdit className="text-blue-600" />
                                            </button>


                                            <button
                                                onClick={() => handleDelete(tip._id)}
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: "#fee2e2" }}
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
            )}
        </section>
    );
};

export default MyTips;

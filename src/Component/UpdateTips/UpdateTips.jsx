import { useContext, useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { authContext } from "../../Layout/RootLayout";

const UpdateTips = () => {
    const { user } = useContext(authContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        plant_type_or_topic: "",
        difficulty: "Easy",
        description: "",
        image: "",
        category: "Seasonal Tips",
        availability: "Public",
    });

    // 🔹 Load existing tip data
    useEffect(() => {
        fetch("https://cultiv8-server.vercel.app/tips")
            .then(res => res.json())
            .then(data => {
                const tip = data.find(t => t._id === id);
                if (tip) {
                    setFormData({
                        title: tip.title,
                        plant_type_or_topic: tip.plant_type_or_topic,
                        difficulty: tip.difficulty,
                        description: tip.description,
                        image: tip.images?.[0],
                        category: tip.category,
                        availability: tip.availability,
                    });
                }
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTip = {
            title: formData.title,
            plant_type_or_topic: formData.plant_type_or_topic,
            difficulty: formData.difficulty,
            description: formData.description,
            images: [formData.image],
            category: formData.category,
            availability: formData.availability,
        };

        const res = await fetch(`https://cultiv8-server.vercel.app/tips/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTip),
        });

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Your garden tip has been updated.",
                confirmButtonColor: "#16a34a",
            });
            navigate("/my-tips");
        }
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center px-4 pt-10"
            style={{
                background:
                    "linear-gradient(180deg, var(--color-bg-secondary), var(--color-bg))",
            }}
        >
            <div
                className="w-full max-w-lg p-6 rounded-2xl"
                style={{
                    backgroundColor: "var(--color-surface)",
                    boxShadow: "var(--shadow-soft)",
                }}
            >
                {/* Header */}
                <div className="flex items-start gap-3 mb-6">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        <FaSeedling className="text-white" />
                    </div>
                    <div>
                        <h2
                            className="font-semibold"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Update Garden Tip
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Modify your shared gardening tip
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
                    <Input label="Plant Type / Topic" name="plant_type_or_topic" value={formData.plant_type_or_topic} onChange={handleChange} required />
                    <Select label="Difficulty Level" name="difficulty" value={formData.difficulty} onChange={handleChange} options={["Easy", "Medium", "Hard"]} />
                    <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} required />
                    <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} required />
                    <Select label="Category" name="category" value={formData.category} onChange={handleChange}
                        options={[
                            "Plant Care",
                            "Composting",
                            "Vertical Gardening",
                            "Indoor Gardening",
                            "Hydroponics",
                            "Pest Control",
                            "Soil Management",
                            "Seasonal Tips",
                        ]}
                    />
                    <Select label="Availability" name="availability" value={formData.availability} onChange={handleChange}
                        options={["Public", "Hidden"]}
                    />

                    {/* User info (readonly) */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Your Name" value={user?.displayName || ""} readOnly />
                        <Input label="Your Email" value={user?.email || ""} readOnly />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-medium"
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        Update Garden Tip
                    </button>
                </form>
            </div>
        </section>
    );
};

/* ---------- Reusable Inputs ---------- */

const baseStyle = {
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
};

const Input = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium text-red-500">{label} *</label>
        <input {...props} className="w-full mt-1 p-3 rounded-lg outline-none" style={baseStyle} />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div>
        <label className="text-sm font-medium text-red-500">{label} *</label>
        <select {...props} className="w-full mt-1 p-3 rounded-lg outline-none" style={baseStyle}>
            {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium text-red-500">{label} *</label>
        <textarea {...props} rows="4" className="w-full mt-1 p-3 rounded-lg outline-none resize-none" style={baseStyle} />
    </div>
);

export default UpdateTips;

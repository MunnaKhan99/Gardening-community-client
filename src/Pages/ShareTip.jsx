import { useContext, useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { authContext } from "../Layout/RootLayout";

const ShareTip = () => {
    const { user } = useContext(authContext);
    console.log(user);

    const [formData, setFormData] = useState({
        title: "",
        plant_type_or_topic: "",
        difficulty: "Easy",
        description: "",
        image: "",
        category: "Seasonal Tips",
        availability: "Public",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tipData = {
            title: formData.title,
            plant_type_or_topic: formData.plant_type_or_topic,
            difficulty: formData.difficulty,
            description: formData.description,
            images: [formData.image],
            category: formData.category,
            availability: formData.availability,
            author_name: user?.displayName || "Anonymous",
            author_email: user?.email || "N/A",
        };

        const res = await fetch("https://cultiv8-server.vercel.app/tips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tipData),
        });

        if (res.ok) {
            alert("Garden tip shared successfully");
            setFormData({
                title: "",
                plant_type_or_topic: "",
                difficulty: "Easy",
                description: "",
                image: "",
                category: "Seasonal Tips",
                availability: "Public",
            });
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
                            Share a Garden Tip
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            Help others grow by sharing your knowledge
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <Input
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. How I Grow Tomatoes Indoors"
                        required
                    />

                    {/* Plant Type */}
                    <Input
                        label="Plant Type / Topic"
                        name="plant_type_or_topic"
                        value={formData.plant_type_or_topic}
                        onChange={handleChange}
                        placeholder="e.g. Tomatoes, Herbs, Succulents"
                        required
                    />

                    {/* Difficulty */}
                    <Select
                        label="Difficulty Level"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        options={["Easy", "Medium", "Hard"]}
                    />

                    {/* Description */}
                    <Textarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Share your gardening tips and experience..."
                        required
                    />

                    {/* Image */}
                    <Input
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />

                    {/* Category */}
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
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

                    {/* Availability */}
                    <Select
                        label="Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        options={["Public", "Hidden"]}
                    />

                    {/* User */}
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Your Name" value={user?.displayName || ""} readOnly />
                        <Input label="Your Email" value={user?.email || ""} readOnly />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-medium"
                        style={{ backgroundColor: "var(--color-primary)" }}
                    >
                        Share Garden Tip
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
        <input
            {...props}
            className="w-full mt-1 p-3 rounded-lg outline-none"
            style={baseStyle}
        />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div>
        <label className="text-sm font-medium text-red-500">{label} *</label>
        <select
            {...props}
            className="w-full mt-1 p-3 rounded-lg outline-none"
            style={baseStyle}
        >
            {options.map((opt) => (
                <option key={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium text-red-500">{label} *</label>
        <textarea
            {...props}
            rows="4"
            className="w-full mt-1 p-3 rounded-lg outline-none resize-none"
            style={baseStyle}
        />
    </div>
);

export default ShareTip;

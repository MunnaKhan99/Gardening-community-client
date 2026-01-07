import { useEffect, useState } from "react";

const StatItem = ({ end, label, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500; // ms
        const stepTime = 20;
        const increment = Math.ceil(end / (duration / stepTime));

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [end]);

    return (
        <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white">
                {count.toLocaleString()}{suffix}
            </h3>
            <p className="mt-2 text-sm text-white/90">{label}</p>
        </div>
    );
};

const CommunityStats = () => {
    return (
        <section
            className="py-16"
            style={{ backgroundColor: "var(--color-primary)" }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                <StatItem end={5000} suffix="+" label="Active Members" />
                <StatItem end={2500} suffix="+" label="Garden Tips" />
                <StatItem end={150} suffix="+" label="Events Hosted" />
                <StatItem end={98} suffix="%" label="Satisfaction Rate" />
            </div>
        </section>
    );
};

export default CommunityStats;

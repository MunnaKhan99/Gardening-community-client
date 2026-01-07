import React, { useContext } from 'react';
import { authContext } from '../Layout/RootLayout';
import { useNavigate } from 'react-router';
const Register = () => {
    const { handleSignUP } = useContext(authContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("successfully tapped");
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;

        const user = {
            name,
            email,
            photoUrl,
            password
        }
        console.log(user);


        if (password.length < 6) {
            alert("The length is below 6");
            return
        }
        if (!/[a-z]/.test(password)) {
            alert("Password must contain at least one lowercase letter");
            return
        }
        if (!/[A-Z]/.test(password)) {
            alert("Password must contain at least one uppercase letter");
            return
        }
        if (!/[@#$%^&]/.test(password)) {
            alert("Password must contain at least one special character");
            return
        }

        handleSignUP(email, password, name, photoUrl)
        navigate('/')

    }
    return (
        <div className="max-w-md mx-auto mt-12 p-6 rounded-md border shadow-[var(--shadow-soft)] bg-[var(--bg-surface)]">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-[var(--text-primary)]">
                    Sign Up
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                    Create your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 rounded-md border bg-[var(--bg-input)] 
                   border-[var(--border-color)] text-[var(--text-primary)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 rounded-md border bg-[var(--bg-input)] 
                   border-[var(--border-color)] text-[var(--text-primary)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                        Photo URL *
                    </label>
                    <input
                        type="text"
                        name="photoUrl"
                        required
                        className="w-full px-3 py-2 rounded-md border bg-[var(--bg-input)] 
                   border-[var(--border-color)] text-[var(--text-primary)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                        Password *
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 rounded-md border bg-[var(--bg-input)] 
                   border-[var(--border-color)] text-[var(--text-primary)]
                   focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-md font-semibold text-white
                 bg-[var(--btn-primary)] hover:bg-[var(--btn-primary-hover)]"
                >
                    Sign Up
                </button>

                <p className="text-sm text-center text-[var(--text-muted)]">
                    Already have an account?
                    <a
                        type="button"
                        onClick={() => navigate('/login')}
                        className="ml-1 font-medium text-[var(--btn-primary)] hover:underline"
                    >
                        Sign in
                    </a>
                </p>
            </form>
        </div>

    );
};

export default Register;
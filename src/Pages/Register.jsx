import React from 'react';
const Register = () => {
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

    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md mt-12 sm:p-10 bg-black text-white">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-sm dark:text-gray-600">Sign up you account </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="john doe"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Photo URL</label>
                        <input
                            type="text"
                            name="photoUrl"
                            id="photoUrl"
                            placeholder="https://example.com/photo.jps"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="*****"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign up</button>
                    </div>
                    <p className="px-6 text-sm text-center dark:text-gray-600">Already have an account?
                        <a rel="noopener noreferrer" href="#" className="hover:underline dark:text-violet-600">Sign in</a>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
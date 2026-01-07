import React, { useContext } from 'react';
import { authContext } from '../Layout/RootLayout';
import { useNavigate } from 'react-router';


const Login = () => {
    const navigate = useNavigate();
    const { handleSignIn } = useContext(authContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log({ email, password });

        handleSignIn(email, password)
        navigate('/')
    }
    return (
        <div className="w-full max-w-md p-4 rounded-md  shadow-2xl sm:p-8 mx-auto text-white pt-10">
            <h1 className="mb-3 text-3xl font-semibold text-(--text-primary) text-center pb-10">Login to your account</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address  <span className='text-red-700'>*</span></label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="leroy@jenkins.com"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm"
                            >Password  <span className='text-red-700'>*</span></label>

                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="*****"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md">Sign up</button>
                    </div>
                    <p className="px-6 text-sm text-center dark:text-gray-600">Don't have an account?
                        <a type='button' onClick={() => navigate('/register')} className="hover:underline dark:text-violet-600"> Sign Up.</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
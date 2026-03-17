import React, { useState, useRef } from 'react';

const Logo = () => (
    <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-brand-coral rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L20 18H4L12 3Z" fill="white" />
                <path d="M12 10L15 16H9L12 10Z" fill="#D97706" />
            </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Welcome back</h1>
    </div>
);

const SocialLoginButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full h-12 flex items-center px-6 mb-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-coral active:bg-gray-100"
    >
        <div className="w-5 h-5 flex items-center justify-center">
            {icon}
        </div>
        <span className="flex-1 text-center">{label}</span>
    </button>
);

const Divider = () => (
    <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-400 font-medium">OR</span>
        </div>
    </div>
);

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert('Email sent to ' + email);
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="me@example.com"
                    className={`w-full h-12 px-4 rounded-xl border transition-all duration-150 outline-none
            ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/20'}
          `}
                />
                {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center bg-brand-coral text-white font-semibold rounded-xl hover:bg-brand-hover transition-all duration-150 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Continue with email'
                )}
            </button>
        </form>
    );
};

const AuthFooter = () => (
    <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-brand-coral hover:text-brand-hover underline-offset-4 hover:underline">
                Sign up
            </a>
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
        </div>
    </div>
);

const LoginCard = () => (
    <div className="w-full max-w-[420px] bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 mx-4">
        <Logo />
        <div className="space-y-4">
            <SocialLoginButton
                icon={
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                }
                label="Continue with Google"
                onClick={() => console.log('Google login')}
            />
            <SocialLoginButton
                icon={
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05 1.78-3.19 1.76-1.14-.02-1.54-.74-2.89-.74-1.36 0-1.8.72-2.87.76-1.07.04-2.2-.84-3.19-1.76-2.02-2.34-3.56-6.61-1.47-10.19 1.03-1.78 2.85-2.91 4.82-2.94 1.5-.02 2.92 1.02 3.83 1.02.92 0 2.64-1.24 4.43-1.06 1.79.18 3.16.82 4.01 2.05-1.74 1.04-1.45 3.34.28 4.09 1.73.75 3.12 1.95 3.12 1.95s-0.01 0.04-0.03 0.1C21.49 16.5 20.03 18.5 17.05 20.28zM14.91 4.65c-1.12 1.35-2.73 2.13-4.23 2.02-0.15-1.5 0.53-3.03 1.51-4.04 1.08-1.12 2.65-1.92 4.1-1.81 0.15 1.51-0.27 2.48-1.38 3.83z" />
                    </svg>
                }
                label="Continue with Apple"
                onClick={() => console.log('Apple login')}
            />
        </div>
        <Divider />
        <EmailForm />
        <AuthFooter />
    </div>
);

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F9F9F8] py-12">
            <LoginCard />
        </div>
    );
}

"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { authService } from '@/lib/api/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            await authService.login(data);
            const user = await authService.getProfile();
            toast.success('Connexion réussie !');

            if (user.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
            router.refresh();
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error(
                error.response?.data?.message ||
                'Échec de la connexion. Veuillez vérifier vos identifiants.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[10vh] flex items-center justify-center mt-0  py-4 px-4 sm:px-6 lg:px-4">

            <div className="w-1/3  grid grid-cols-1 md:grid-cols-0 gap-2 bg-white rounded-2xl shadow-xl overflow-hidden">


                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full sm:p-8 flex flex-col items-center justify-center"
                >
                    <div className="mb-2">
                        <h1 className="text-3xl font-bold text-gray-900 ">Bon retour !</h1>
                        <p className="text-gray-600">
                            Entrez vos coordonnées pour accéder à votre compte
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="exemple@email.com"
                            icon={Mail}
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div className="space-y-1">
                            <Input
                                label="Mot de passe"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <div className="flex justify-end">
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs font-medium text-blue-600 hover:text-blue-500 hover:underline"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            isLoading={isLoading}
                            className="mt-6"
                        >
                            <LogIn className="mr-2 h-5 w-5" />
                            Se connecter
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Vous n'avez pas encore de compte ?{' '}
                        <Link
                            href="/auth/register"
                            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all"
                        >
                            Inscrivez-vous gratuitement
                        </Link>
                    </p>
                </motion.div>

            </div>
        </div>
    );
}

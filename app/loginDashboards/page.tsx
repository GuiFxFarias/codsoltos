'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const routerPages = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    setError('');

    try {
      // Envia credenciais ao servidor
      const response = await axios.post(
        'http://localhost:3333/loginDashboards',
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true, // Permite envio de cookies com a requisição
        }
      );

      // Simula geração de token
      const { token } = response.data;

      // Armazena o token no localStorage
      localStorage.setItem('authToken', token);

      alert('Login realizado com sucesso!');
      routerPages.push('/dashboards');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-semibold text-center'>Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='seuemail@exemplo.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='••••••' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Form>
        <div className='mt-4 text-center'>
          <p>
            Não tem uma conta?{' '}
            <Link
              href='loginDashboards/register'
              className='text-blue-500 hover:underline'
            >
              Cadastrar
            </Link>
          </p>
        </div>
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      </div>
    </div>
  );
}

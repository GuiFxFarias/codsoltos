'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PageDash() {
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const response = await axios.get('http://localhost:3333/cryptoDash', {
          withCredentials: true, // Envia cookies com a requisição
        });
        console.log(response.data); // Exibe mensagem de sucesso
      } catch (err) {
        console.error(err.response.data); // Exibe erro
        router.push('/loginDashboards'); // Redireciona para a página de login
      }
    };

    verifyAccess();
  }, [router]);

  return (
    <div>
      <iframe
        title='Dashboard RH - MVP'
        width='600'
        height='373.5'
        src='https://app.powerbi.com/view?r=eyJrIjoiOGJkZjg5YTktNGYzYi00NmZiLWI5OGYtZDE3MTA3MzEyYzQyIiwidCI6Ijg5MTczNjczLTdjNDEtNDhjOC1hNzc1LTJlZjU1M2JlYTNmOSJ9'
        allowFullScreen={true}
      ></iframe>
    </div>
  );
}

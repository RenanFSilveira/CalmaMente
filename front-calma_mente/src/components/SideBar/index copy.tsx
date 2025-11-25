// components/SideBar.tsx

'use client';
import Link from "next/link";
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from "next/navigation"; // Para saber a página ativa
import { url } from "inspector";




// Definição dos Itens de Navegação (Mapeando seus links e ícones)
const NAVIGATION_ITEMS = [
    { name: 'Home', href: '/', Icon: './SideBar/home.svg', pageKey: 'home' },
    { name: 'Calendário', href: '/calendario', Icon: './SideBar/calendario.svg', pageKey: 'calendario' },
    { name: 'Diário Emocional', href: '/diario', Icon: './SideBar/diario.svg', pageKey: 'diario' },
    { name: 'Conteúdos', href: '/conteudos', Icon: './SideBar/conteudos.svg', pageKey: 'conteudos' }, 
    { name: 'Perfil', href: '/perfil', Icon: './SideBar/perfil.svg', pageKey: 'perfil' },
    { name: 'Jardim', href: '/jardim', Icon: './SideBar/jardim.svg', pageKey: 'jardim' }
];

interface Props {    
    pagina?: string; 
}

export default function SideBar({ pagina }: Props){    
    const [fechado, setFechado] = useState(true);
    
 
    const pathname = usePathname();

 
    const activeColor = 'text-black bg-violet-300 ';
    const baseColor = 'text-white hover:bg-violet-200 '; 
    const bgColor = 'bg-violet-400';
    const transition = 'transition-all duration-300 ease-in-out';
    
    const isLinkActive = (href: string, pageKey: string) => {

        return pathname === href || pathname.includes(pageKey) || pagina === pageKey;
    };


    return(
        <nav 
            
            className={`
                fixed top-0 left-0 h-full ${bgColor} 
                flex flex-col justify-between p-4 ${transition} z-40
                shadow-xl
            `}
        >
            <div className={`flex flex-col gap-6 w-full ${transition}`}>
                {/* 1. LOGO E HOME */}
                <Link href={'/'} className="flex justify-center">
                    <Image  src={'/logo-calmamente.png'} alt='Yelly Logo' width={40} height={40} />
                </Link>

                <hr className="border-t border-violet-500" />
                
                {/* 2. ITENS DE NAVEGAÇÃO PRINCIPAIS (styles.links) */}
                {NAVIGATION_ITEMS.map((item) => {
                    const isActive = isLinkActive(item.href, item.pageKey);
                    
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href} 
                            className={`
                                flex items-center rounded-md py-8 px-16 gap-8  ${transition}
                                ${isActive ? activeColor : baseColor}
                            `}
                        >
                           
                            <Image src={item.Icon} alt={item.name}  width={40} height={40}/>

                            
                            {/* Texto (apenasTelaCheia) */}
                            <span 
                                className={`
                                    whitespace-nowrap overflow-hidden text-base font-medium
                                    ${fechado ? 'hidden opacity-0' : 'block opacity-100'} 
                                    ${transition}
                                `}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
                <hr className="border-t border-violet-500" />
            </div>

            {/* 3. SEÇÃO DE RODAPÉ (CONFIGURAÇÕES E PERFIL) */}
            <div className={`flex flex-col gap-6 w-full ${transition}`}>
                <hr className="border-t border-violet-500" />

                {/* Link de Configuração */}
                <Link href={"/admin/config"} className={`
                    flex items-center h-10 rounded-lg p-2 gap-4 ${transition}
                    ${isLinkActive('/admin/config', 'config') ? activeColor : baseColor}
                `}>
                    
                    <Image src={'./SideBar/config.svg'} alt="Config"  width={40} height={40}/>
                    <span className={`whitespace-nowrap overflow-hidden text-sm font-medium ${fechado ? 'hidden opacity-0' : 'block opacity-100'} ${transition}`}>
                        Configuração
                    </span>
                </Link>

                {/* Perfil e Botão de Fechar */}
                <div className={`flex justify-between items-center w-full gap-8`}>
                    
                    {/* Perfil do Usuário (apenasTelaCheia) */}
                    <Link href={'/admin/user'} className={`
                        flex items-center gap-2 p-1 rounded-lg w-full max-w-[calc(100%-40px)]
                        ${isLinkActive('/admin/user', 'user') ? 'bg-violet-500' : 'hover:bg-violet-300'}
                        ${fechado ? 'hidden opacity-0' : 'flex opacity-100'} ${transition}
                    `}>
                        <Image src={'/logoYellyAmarelo.jpg'} alt='usuário' width={40} height={40} className='rounded-full border border-black/20'/>
                        <div className="flex flex-col text-xs leading-tight">
                            <span className="font-bold">Nome</span>
                            <p className="text-gray-700">nome@gmail.com.br</p>
                        </div>
                    </Link>

                    {/* Botão de Fechar/Abrir (styles.sair) */}
                    <button 
                        className={`
                            flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 
                            
                            ${fechado ? 'w-full' : 'w-auto'} ${transition}
                        `} 
                        onClick={() => setFechado(!fechado)}
                        title={fechado ? 'Expandir Menu' : 'Recolher Menu'}
                    >
                        {/* Ícone de Sair/Recolher */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM5 5H14V19H5V5ZM16 19V5H19V19H16Z" fill="white"/>
                        </svg>

                    </button>
                </div>
            </div>
        </nav>
    );
}
/* eslint-disable jsx-a11y/no-autofocus, @typescript-eslint/no-unsafe-assignment */
'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Sun, Moon, Github, Linkedin, Mail, Coffee, ChevronRight } from 'lucide-react'

const ASCII_ART = `

██████╗ ███████╗██╗   ██╗██╗   ██╗██╗    ███████╗ █████╗ ███╗   ██╗ ██████╗██╗  ██╗███████╗███████╗
██╔══██╗██╔════╝╚██╗ ██╔╝██║   ██║██║    ██╔════╝██╔══██╗████╗  ██║██╔════╝██║  ██║██╔════╝╚══███╔╝
██║  ██║█████╗   ╚████╔╝ ██║   ██║██║    ███████╗███████║██╔██╗ ██║██║     ███████║█████╗    ███╔╝ 
██║  ██║██╔══╝    ╚██╔╝  ╚██╗ ██╔╝██║    ╚════██║██╔══██║██║╚██╗██║██║     ██╔══██║██╔══╝   ███╔╝  
██████╔╝███████╗   ██║    ╚████╔╝ ██║    ███████║██║  ██║██║ ╚████║╚██████╗██║  ██║███████╗███████╗
╚═════╝ ╚══════╝   ╚═╝     ╚═══╝  ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝

`

const THEMES = {
  dark: {
    bg: 'bg-gray-900',
    text: 'text-green-400',
    prompt: 'text-cyan-400',
    accent: 'text-yellow-300',
    secondary: 'text-purple-400',
    tertiary: 'text-pink-400',
    highlight: 'bg-gray-800',
    shadow: 'shadow-lg shadow-green-500/20',
  },
  light: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    prompt: 'text-blue-600',
    accent: 'text-indigo-600',
    secondary: 'text-purple-600',
    tertiary: 'text-pink-600',
    highlight: 'bg-white',
    shadow: 'shadow-lg shadow-indigo-500/20',
  },
  retro: {
    bg: 'bg-amber-100',
    text: 'text-amber-900',
    prompt: 'text-red-700',
    accent: 'text-red-600',
    secondary: 'text-green-700',
    tertiary: 'text-blue-700',
    highlight: 'bg-amber-200',
    shadow: 'shadow-lg shadow-amber-500/20',
  },
}

const COMMANDS = {
  whois: 'quien es Deyvi?',
  whoami: 'quien eres tú?',
  projects: 'lista de mis proyectos',
  email: 'enviame un correo',
  social: 'mis redes',
  secret: 'encuentra la contraseña',
  clear: 'limpia la terminal',
  theme: 'cambia el tema de la terminal (dark/light/retro)',
  banner: 'bienvenida',
}

export default function TerminalPortfolio() {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState<string[]>([])
    const [theme, setTheme] = useState<keyof typeof THEMES>('dark')
    const [awaitingPassword, setAwaitingPassword] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const [userScrolled, setUserScrolled] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
    setOutput([
      ASCII_ART,
      '¡BBienvenido a mi portfolio! :D',
      'Paara ver la lista de comandos disponibles, escribe "help".',
      '',
    ])
  }, [])

  useEffect(() => {
    const currentOutputRef = outputRef.current;

    const handleScroll = () => {
        if (currentOutputRef) {
            const { scrollTop, scrollHeight, clientHeight } = currentOutputRef;
            const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
            setUserScrolled(!isScrolledToBottom);
        }
    };

    currentOutputRef?.addEventListener('scroll', handleScroll);
    return () => currentOutputRef?.removeEventListener('scroll', handleScroll);
}, [outputRef]);
  

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (awaitingPassword) {
      checkPassword(input);
  } else {
      processCommand(input);
  }
  setInput('');
  setUserScrolled(false);
};
  

  const processCommand = (cmd: string): void => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let response: string | object = ''

    switch (trimmedCmd) {
      case 'help':
        response = COMMANDS
        break
      case 'whois':
        response = {
          nombre: "Deyvi Sanchez",
          rol: "Front End Developer",
          descripcion: [
            "He liderado el área de front-end en los equipos en los que he trabajado",
            "A pesar de estar en 5to ciclo me gusta asumir grandes retos que impulsen mis habilidades",
            "Combino creatividad y tecnología para resolver problemas y optimizar procesos",
            "Me siento comprometido con la innovación y quiero que mis habilidades ayuden a las personas."
          ],
          habilidades: [
            "JavaScript", "ViteJs", "React", "Next.js", "Docker", "Github",
            "Python", "Google Cloud Run", "HTML / CSS", "Bootstrap", "Git"
          ]
        }
        break
      case 'whoami':
        response = "Laa paradoja de '¿Quién soy yo?' es: nunca lo sabemos, pero lo descubrimos constantemente."
        break
      case 'projects':
        response = [
          {
            nombre: "Forua",
            tecnologias: ["HTML", "CSS", "JavaScript", "Python", "FastAPI"],
            descripcion: "Foro universitario con la facilidad de conocer y evaluar a los docentes"
          },
          {
            nombre: "Superlearner",
            tecnologias: ["React", "Material UI", "Vite JS", "Docker", "Python", "Django"],
            descripcion: "Aplicación de gestión y asistencia de profesores"
          },
          {
            nombre: "Portfolio Terminal",
            tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            descripcion: "Portfolio con temática de terminal"
          }
        ]
        break
      case 'email':
        response = {
            email: "deeyvioscarzanches@gmail.com"
        }
        break
      case 'social':
        response = {
          github: "https://github.com/IvyedSG",
          linkedin: "https://linkedin.com/in/deyvisanchez",
        }
        break
    case 'secret':
            setAwaitingPassword(true)
            response = "coontraseña:"
            break
      case 'clear':
        setOutput([])
        return
      case 'theme':
        setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'retro' : 'dark')
        response = `Teema cambiado a ${theme === 'dark' ? 'light' : theme === 'light' ? 'retro' : 'dark'}`
        break
      case 'banner':
        response = ASCII_ART
        break
      default:
        response = `El comando no reconocido es: &quot;{trimmedCmd}&quot;. Escribe &quot;help&quot; para ver los comandos disponibles.`
    }

    setOutput((prev) => [...prev, `viisitor@deyvi:~$ ${cmd}`, ...(typeof response === 'string' ? [response] : [JSON.stringify(response, null, 2)]), ''])
  }


  const checkPassword = (password: string) => {
    setAwaitingPassword(false)
    if (password === 'deyvi') {
      setOutput((prev) => [...prev, "feelicidades! te acuerdas mi nombre"])
    } else {
      setOutput((prev) => [...prev, "coontraseña incorrecta"])
    }
  }

  return (
    <motion.div 
      className={`min-h-screen ${THEMES[theme].bg} ${THEMES[theme].text} p-4 font-mono overflow-hidden flex flex-col`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header 
        className={`flex justify-between items-center mb-4 p-4 rounded-lg ${THEMES[theme].highlight} ${THEMES[theme].shadow}`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <Terminal className="inline-block" size={24} />
          <span className="text-xl font-bold">My Terminal</span>
        </div>
        <div className="flex space-x-2">
          <motion.a 
            href="https://github.com/IvyedSG" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${THEMES[theme].accent} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a 
            href="https://linkedin.com/in/deyvisanchez" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${THEMES[theme].accent} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a 
            href="mailto:deyvioscarzanches@gmail.com" 
            className={`${THEMES[theme].accent} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail size={20} />
          </motion.a>
          <motion.button 
            onClick={() => processCommand('secret')} 
            className={`${THEMES[theme].accent} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Coffee size={20} />
          </motion.button>
          <motion.button 
            onClick={() => processCommand('theme')} 
            className={`${THEMES[theme].accent} hover:opacity-80 transition-opacity`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </motion.header>
      <motion.div 
        className={`flex-grow overflow-hidden rounded-lg ${THEMES[theme].highlight} ${THEMES[theme].shadow}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div
          ref={outputRef}
          className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent p-4"
        >
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TypewriterText text={line} theme={THEMES[theme]} outputRef={outputRef} userScrolled={userScrolled} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.form 
        onSubmit={handleSubmit} 
        className={`mt-4 flex items-center p-2 rounded-lg ${THEMES[theme].highlight} ${THEMES[theme].shadow}`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <ChevronRight className={`mr-2 ${THEMES[theme].prompt}`} size={20} />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-grow bg-transparent outline-none ${THEMES[theme].text}`}
          placeholder="Escribe un comando..."
          autoFocus
        />
      </motion.form>
    </motion.div>
  )
}

function TypewriterText({
  text,
  theme,
  outputRef,
  userScrolled,
}: {
  text: string;
  theme: typeof THEMES['dark'];
  outputRef: React.RefObject<HTMLDivElement>;
  userScrolled: boolean;
}) {
  const [displayText, setDisplayText] = useState('');

  // Función scrollToBottom usando useCallback
  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputRef]);

  useEffect(() => {
    let content = text;
    if (text.startsWith('{') || text.startsWith('[')) {
      try {
        const parsed = JSON.parse(text);
        content = JSON.stringify(parsed, null, 2);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }

    let i = 0;
    const timer = setInterval(() => {
      if (i < content.length) {
        setDisplayText((prev) => prev + content.charAt(i));
        i++;
        if (!userScrolled) {
          scrollToBottom(); // Llamamos a la función callback
        }
      } else {
        clearInterval(timer);
        if (!userScrolled) {
          scrollToBottom(); // Llamamos a la función callback
        }
      }
    }, 1);

    return () => clearInterval(timer);
  }, [text, userScrolled, scrollToBottom]); // Asegúrate de incluir scrollToBottom como dependencia

  if (text.startsWith('{') || text.startsWith('[')) {
    try {
      const jsonObj = JSON.parse(text);
      return <JSONDisplay json={jsonObj} theme={theme} />;
    } catch {
      return (
        <pre className={`whitespace-pre-wrap ${text.startsWith('visitor@') ? theme.prompt : ''}`}>
          {displayText}
        </pre>
      );
    }
  }

  return (
    <div className={`whitespace-pre-wrap ${text.startsWith('visitor@') ? theme.prompt : ''}`}>
      {displayText}
    </div>
  );
}

function JSONDisplay({ json, theme }: { json: string; theme: typeof THEMES['dark'] }) {
  const renderJSON = (obj: unknown, level = 0) => {
    if (typeof obj !== 'object' || obj === null) {
      return <span className={theme.accent}>{JSON.stringify(obj)}</span>
    }

    return (
      <motion.div 
        style={{ marginLeft: `${level * 20}px` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: level * 0.1 }}
      >
        {level === 0 && <span className={theme.tertiary}>{'{'}</span>}
        {Object.entries(obj).map(([key, value], index, arr) => (
          <motion.div  

            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span className={theme.secondary}>"{key}"</span>: {' '}
            {Array.isArray(value) ? (
              <>
                <span className={theme.tertiary}>[</span>
                <div style={{ marginLeft: '20px' }}>
                  {value.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      {renderJSON(item, level + 1)}
                      {i < value.length - 1 && <span className={theme.tertiary}>,</span>}
                    </motion.div>
                  ))}
                </div>
                <span className={theme.tertiary}>]</span>{index < arr.length - 1 && <span className={theme.tertiary}>,</span>}
              </>
            ) : typeof value === 'object' && value !== null ? (
              <>
                <span className={theme.tertiary}>{'{'}</span>
                {renderJSON(value, level + 1)}
                <span className={theme.tertiary}>{'}'}</span>
                {index < arr.length - 1 && <span className={theme.tertiary}>,</span>}
              </>
            ) : (
              <>
                <span className={theme.accent}>{JSON.stringify(value)}</span>
                {index < arr.length - 1 && <span className={theme.tertiary}>,</span>}
              </>
            )}
          </motion.div>
        ))}
        {level === 0 && <span className={theme.tertiary}>{'}'}</span>}
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`${theme.highlight} p-2 rounded my-2 overflow-x-auto`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre className="whitespace-pre-wrap">{renderJSON(json)}</pre>
    </motion.div>
  )
}
'use client'
import { createContext, useState } from "react";
import "./globals.css"; import "./globals.css";
// import { Inter } from "next/font/google";

import Link from "next/link";

import { UseContext } from "./contexts/authContext";
import { useRouter } from "next/navigation";



// export const UseContext: any = createContext(null);
const { Provider } = UseContext



// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;


}) {


  // const urlPrimeraOpcion = "http://localhost:3000";
  // const urlSegundaOpcion = "https://nest-online-build.onrender.com";

  const [authState, setAuthState] = useState(false)
  const [perfilAuth, setPerfilAuth] = useState(false)

  const [userAuth, setUserAuth] = useState({})

  const [testState, setTestState] = useState('desde el inicio')


  const route = useRouter()

  return (<>
    <Provider value={{ authState, setAuthState, testState, perfilAuth, setPerfilAuth, userAuth, setUserAuth }}>

      <html lang="en">
        {/* <body className={inter.className}> */}
        <body >

          <div className=" flex justify-end items-center gap-5 relative bg-blue-800	pr-5 w-full h-16  ">

            {/* <Link className="text-white font-bold" href="/perfil">
            perfil
          </Link> */}
            <div className="text-white font-bold"> <Link rel="preload" href="/contactos">
              contactos
            </Link></div>

            {/* <button className="text-white font-bold" onClick={() => route.push('/contactos')}>contactos</button> */}
            <div className="text-white font-bold"> <Link rel="preload" href="/productos">
              productos
            </Link></div>
            {/* <button className="text-white font-bold" onClick={() => route.push('/productos')}>productos</button> */}
            {!authState && <div className="text-white font-bold" ><Link rel="preload" href="/login">
              login
            </Link></div>
            }
            {/* {!authState && <button className="text-white font-bold" onClick={() => route.push('/login')}>login</button>
            } */}
            {authState && <div className="text-white font-bold"><Link rel="preload" href="/crud">
              crud
            </Link></div>
            }
            {perfilAuth && <div className="text-white font-bold"><Link rel="preload" href="/perfil">
              perfil
            </Link></div>
            }

            {/* {authState && <button className="text-white font-bold" onClick={() => route.push('/crud')}>crud</button>
            } */}
          </div>



          {children}


        </body>
      </html>
    </Provider>
  </>
  );
}

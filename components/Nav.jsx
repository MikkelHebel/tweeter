"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg" className="object-contain" width={50} height={50} alt="Tweeter logo" />
            <p className="logo_text">Tweeter</p>
        </Link>

        {/* Desktop Nav */}
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-post" className="black_btn">
                        Post tweet
                    </Link>

                    <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>

                    <Link href="/profile" className="flex gap-2 flex-center">
                        <Image src={session?.user.image} className="rounded-full" width={37} height={37} alt="User avatar" />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && 
                    Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: '/' })} className="black_btn">
                            Sign in
                        </button>
                    )
                    )}
                </>
            )}
        </div>

        {/* Mobile Nav */}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image src={session?.user.image} className="rounded-full" width={37} height={37} alt="User avatar" onClick={() => setToggleDropdown((prev) => (!prev))} />

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-post" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                                Post tweet
                            </Link>
                            <button type="button" className="mt-5 w-full black_btn" onClick={() => {setToggleDropdown(false); signOut();}}>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {providers && 
                    Object.values(providers).map((provider) => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id, { callbackUrl: '/' })} className="black_btn">
                            Sign in
                        </button>
                    )
                    )}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav
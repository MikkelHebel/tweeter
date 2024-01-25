import '@styles/globals.css'

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: 'Tweeter',
    description: 'Tweeter a project for sending tweets, just like twitter!',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <link rel="icon" href="assets/images/favicon.ico" sizes="any" />
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout
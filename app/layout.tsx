import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'Dribbler',
  description: 'Dribbler is a clone website of Dribble made by Ali Raza. You can share your amazing developer projects with public on dribbler and many more features.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> 
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

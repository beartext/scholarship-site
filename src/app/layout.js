import "./globals.css"

export const metadata = {
  title: "Scholarship Research Generator",
  description: "AI generated research summaries",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Next13NProgress } from 'nextjs13-progress';

import Header from './Header';
import Starfield from 'react-starfield';
import GitHubButton from './components/GitHubButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Jay's Next.js Component Portfolio",
	description: 'A portfolio of components built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
				<meta name="msapplication-TileColor" content="#000000" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body className={inter.className}>
				<GitHubButton />
				<main className="flex flex-col min-h-screen text-white bg-zinc-950">
					<Header />
					{children}
				</main>
				<Starfield
				starCount={5000}
				/>
				<Next13NProgress color="#7644FF" height={6} />
			</body>
		</html>
	);
}

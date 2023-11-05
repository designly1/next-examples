import React from 'react';
import { Link } from 'nextjs13-progress';

export default function Home() {
	return <div className="glow-card w-full max-w-5xl mx-auto p-8 mt-20 flex flex-col">
		<h1 className="text-2xl font-bold mb-10 border-b-2 border-b-white/50">Designly Next.js Example Gallery!</h1>
		<ul className="list-disc list-inside">
			<li>
				<Link className="link-primary" href="/examples/swiper">A Simple Mobile-Friend Swiper</Link>
			</li>
		</ul>
	</div>;
}

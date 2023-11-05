import React from 'react';
import { Link } from 'nextjs13-progress';
import Logo from '@/components/images/Logo';

export default function Header() {
	return (
		<>
			<div className="text-white h-20 flex items-center pl-4 pr-8 fixed top-0 right-0 left-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800">
				<Link href="/">
					<Logo width={200} />
				</Link>
			</div>
			<div className="h-28"></div>
		</>
	);
}

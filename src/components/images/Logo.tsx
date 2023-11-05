import React from 'react';
import Image from 'next/image';

import logo from '@/assets/svg/designly-logo-white.svg';

interface Props {
	width?: number;
	className?: string;
}

const origWidth = 300;
const origHeight = 105;

export default function Logo(props: Props) {
	const { width = origWidth, className = '' } = props;
	const height = (width / origWidth) * origHeight;

	return <Image src={logo} width={width} height={height} className={className} alt="Designly Logo" />;
}

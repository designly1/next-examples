import React from 'react';
import Image from 'next/image';
import Swiper from '@/app/components/Swiper';

import pup1 from '@/assets/img/pup1.jpg';
import pup2 from '@/assets/img/pup2.jpg';
import pup3 from '@/assets/img/pup3.jpg';
import pup4 from '@/assets/img/pup4.jpg';
import pup5 from '@/assets/img/pup5.jpg';

const pups = [pup1, pup2, pup3, pup4, pup5];

export default function SwiperPage() {
	return (
		<div className="w-full max-w-7xl m-auto flex flex-col">
			<h1 className="text-2xl font-bold text-center mb-6">Mobile-Responsive Swiper Example</h1>
			<p className="text-center mb-10">Try resizing the window and watch the number of frames in view change accordingly!</p>
			<Swiper
				breakpoints={{
					'640': 1,
					'768': 2,
					'1024': 3,
					'1280': 4,
				}}
			>
				{pups.map((pup, index) => (
					<div key={index} className="flex items-center justify-center">
						<Image src={pup} width={400} height={400} alt="Pup" />
					</div>
				))}
			</Swiper>
		</div>
	);
}

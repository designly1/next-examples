'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaBan } from 'react-icons/fa';

// Define prop types
interface Props {
	children: React.ReactNode[]; // React Children
	breakpoints?: Record<number, number>; // Breakpoints and their corresponding framesInView values
	gap?: number; // Space between slides
	buttonSize?: 'sm' | 'md' | 'lg'; // Button size
}

// Define Swiper Component
export default function Swiper(props: Props) {
	// Destructure props and set up states
	const { children, breakpoints = { 0: 1 }, gap = 0, buttonSize = 'md' } = props;
	const [containerWidth, setContainerWidth] = useState(0);
	const [framesInView, setFramesInView] = useState(breakpoints[0] || 1);
	const [slideIndex, setSlideIndex] = useState(0); // State for current slide index
	const [startX, setStartX] = useState(0); // State for touch start position X
	const [isSwiping, setIsSwiping] = useState(false); // State indicating whether there is a swipe in action
	const [dragOffset, setDragOffset] = useState(0); // State for how much the user has dragged

	const swiperRef = useRef<HTMLDivElement>(null); // Ref for the swiper container

	// Set up ResizeObserver to observe the container's width
	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				setContainerWidth(entry.contentRect.width);
			}
		});

		if (swiperRef.current) {
			resizeObserver.observe(swiperRef.current);
		}

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		// Determine the framesInView based on the container's width and the defined breakpoints
		const sortedBreakpoints = Object.keys(breakpoints)
			.map(k => parseInt(k))
			.sort((a, b) => a - b);
		for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
			const breakpoint = sortedBreakpoints[i];
			if (containerWidth >= breakpoint) {
				setFramesInView(breakpoints[breakpoint]);
				break;
			}
		}
	}, [containerWidth, breakpoints]);

	// Function to handle 'Next' action
	const handleNext = () => {
		if (slideIndex < children.length - framesInView) {
			setSlideIndex(slideIndex + 1);
		}
	};

	// Function to handle 'Previous' action
	const handlePrev = () => {
		if (slideIndex > 0) {
			setSlideIndex(slideIndex - 1);
		}
	};

	// Touch event handlers for touch devices
	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setStartX(e.touches[0].clientX);
		setIsSwiping(true);
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		const endX = e.changedTouches[0].clientX;
		handleSwipe(endX);
	};

	const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
		if (isSwiping) {
			const currentX = e.touches[0].clientX;
			setDragOffset(currentX - startX);
		}
	};

	// Mouse event handlers for non-touch devices
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setStartX(e.clientX);
		setIsSwiping(true);
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleSwipe(e.clientX);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isSwiping) {
			const currentX = e.clientX;
			setDragOffset(currentX - startX);
		}
	};

	// Function to handle swiping action
	const handleSwipe = (endX: number) => {
		const deltaX = endX - startX;
		setIsSwiping(false);
		setDragOffset(0); // Reset drag offset when swipe ends

		if (deltaX > 50) {
			// If swiped to the right
			handlePrev();
		} else if (deltaX < -50) {
			// If swiped to the left
			handleNext();
		}
	};

	// Function to calculate position of a slide
	const calculateXPosition = () => {
		const baseX = `calc(-${(slideIndex * 100) / framesInView}% - ${slideIndex * gap}px)`;
		return `calc(${baseX} + ${dragOffset}px)`;
	};

	// Determine width of the child based on framesInView and the gap
	const childWidth = `calc(${100 / framesInView}% - ${(gap * (framesInView - 1)) / framesInView}px)`;

	// Configure the style for navigation button based on chosen size
	const buttonStyle = {
		width: buttonSize === 'sm' ? '40px' : buttonSize === 'md' ? '50px' : '60px',
		height: buttonSize === 'sm' ? '40px' : buttonSize === 'md' ? '50px' : '60px',
		fontSize: buttonSize === 'sm' ? '20px' : buttonSize === 'md' ? '25px' : '30px',
	};

	// Render the Swiper Component
	return (
		<div className="flex items-center w-full text-zinc-700" ref={swiperRef}>
			{slideIndex > 0 ? (
				<button
					onClick={handlePrev}
					className="bg-white p-2 rounded-full shadow-lg z-10 flex items-center justify-center"
					style={buttonStyle}
				>
					<FaChevronLeft />
				</button>
			) : (
				<button
					className="bg-white/40 p-2 rounded-full shadow-lg z-10 flex items-center justify-center"
					style={buttonStyle}
				>
					<FaBan />
				</button>
			)}
			<div
				className="relative w-full overflow-hidden"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchMove={handleTouchMove}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onMouseLeave={() => isSwiping && setIsSwiping(false)} // Cancel swipe if mouse leaves the component
			>
				<motion.div
					className="flex"
					style={{ marginLeft: `-${slideIndex * gap}px` }}
					initial={false}
					animate={{ x: calculateXPosition() }}
					transition={{ type: 'tween', duration: 0.5 }}
				>
					{children.map((child, index) => (
						<motion.div
							key={index}
							className="flex-shrink-0"
							style={{ width: childWidth, marginRight: `${index < children.length - 1 ? gap : 0}px` }}
						>
							{child}
						</motion.div>
					))}
				</motion.div>
			</div>
			{slideIndex < children.length - framesInView ? (
				<button
					onClick={handleNext}
					className="bg-white p-2 rounded-full shadow-lg z-10 flex items-center justify-center"
					style={buttonStyle}
				>
					<FaChevronRight />
				</button>
			) : (
				<button
					className="bg-white/40 p-2 rounded-full shadow-lg z-10 flex items-center justify-center"
					style={buttonStyle}
				>
					<FaBan />
				</button>
			)}
		</div>
	);
}

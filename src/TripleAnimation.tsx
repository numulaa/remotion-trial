import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const TripleAnimation: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	// Duration for one cycle of animation
	const cycleDuration = 60; // e.g., 60 frames per cycle

	// Calculate the total duration for three cycles
	const totalDuration = cycleDuration * 3;

	// Calculate progress within the current cycle
	const cycleProgress = frame % cycleDuration;

	// Calculate the interpolation value based on cycle progress
	const animationValue = interpolate(
		durationInFrames / cycleProgress,
		[0, cycleDuration / 2, cycleDuration],
		[0, 100, 0],
		{
			easing: Easing.ease,
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	// Stop the animation after three cycles
	const isAnimationActive = frame < totalDuration;

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				fontSize: '3rem',
				color: 'white',
				transform: `translateY(${isAnimationActive ? animationValue : 0}px)`,
			}}
		>
			Animated Text
		</div>
	);
};

import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/HindSiliguri';

const { fontFamily } = loadFont();

const COLORS = {
  bgLight: '#F5F2EB',
  bgDark: '#1B2028',
  amber: '#F4B41A',
  maroon: '#6B1A24',
  ink: '#1B2028',
  white: '#FFFFFF',
};

const TopHUD: React.FC<{ chapterNum: string; chapterTitle: string }> = ({
  chapterNum,
  chapterTitle,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * 100;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 8,
          width: `${progress}%`,
          backgroundColor: COLORS.amber,
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: COLORS.ink,
          color: COLORS.white,
          padding: '8px 18px',
          borderRadius: 4,
          fontFamily,
          fontWeight: 700,
          fontSize: 22,
          boxShadow: `4px 4px 0px ${COLORS.amber}`,
          zIndex: 40,
        }}
      >
        <span
          style={{
            backgroundColor: COLORS.amber,
            color: COLORS.ink,
            padding: '2px 10px',
            marginRight: 10,
            borderRadius: 2,
          }}
        >
          {chapterNum}
        </span>
        {chapterTitle}
      </div>
    </>
  );
};

const HighlightText: React.FC<{
  text: string;
  highlight: string;
  dark?: boolean;
  fontSize?: number;
}> = ({ text, highlight, dark = false, fontSize = 64 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 700,
        color: dark ? COLORS.white : COLORS.ink,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        transform: `scale(${scale})`,
      }}
    >
      <span>{text}</span>
      {highlight && (
        <span
          style={{
            backgroundColor: COLORS.amber,
            color: COLORS.ink,
            padding: '4px 22px',
            borderRadius: 4,
            boxShadow: `5px 5px 0px ${dark ? '#000000' : COLORS.ink}`,
          }}
        >
          {highlight}
        </span>
      )}
    </div>
  );
};

const CutoutVisual: React.FC<{ src: string; label?: string }> = ({ src, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15 } });
  const floatY = Math.sin(frame / 15) * 8;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translateY(${floatY}px) scale(${enter})`,
      }}
    >
      <div
        style={{
          border: `4px solid ${COLORS.ink}`,
          boxShadow: `10px 10px 0px ${COLORS.amber}`,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: COLORS.white,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: 420, height: 420, objectFit: 'cover', display: 'block' }}
        />
      </div>
      {label && (
        <div
          style={{
            marginTop: 20,
            backgroundColor: COLORS.ink,
            color: COLORS.white,
            fontFamily,
            fontSize: 28,
            fontWeight: 700,
            padding: '8px 24px',
            borderRadius: 4,
            border: `2px solid ${COLORS.amber}`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export const ExplainerVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const counterVal = Math.min(
    740,
    Math.floor(interpolate(frame - 270, [0, 60], [0, 740], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgLight }}>
      {/* আপনার voiceover.mp3 ফাইলটি public ফোল্ডারে থাকতে হবে */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* সিন ১ */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.bgLight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 90px',
          }}
        >
          <CutoutVisual src="product1.png" label="হানি নাটস (Honey Nuts)" />
          <div style={{ maxWidth: 850 }}>
            <HighlightText text="সাধারণ খাবার নাকি" highlight="একটি ব্র্যান্ড?" />
            <p style={{ fontFamily, fontSize: 34, color: '#333', marginTop: 28, lineHeight: 1.5 }}>
              মধু আর বাদামের একটি কাঁচের বয়াম কীভাবে তৈরি করল বাংলাদেশের অন্যতম পরিচিত ফুড ব্র্যান্ডের পরিচয়!
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* সিন ২ */}
      <Sequence from={150} durationInFrames={120}>
        <AbsoluteFill style={{ backgroundColor: COLORS.bgDark, justifyContent: 'center', alignItems: 'center' }}>
          <HighlightText text="অথচ মজার ব্যাপার" highlight="কী জানেন?" dark fontSize={76} />
        </AbsoluteFill>
      </Sequence>

      {/* সিন ৩ */}
      <Sequence from={270} durationInFrames={150}>
        <AbsoluteFill style={{ backgroundColor: COLORS.bgLight, justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: COLORS.white,
              border: `4px solid ${COLORS.ink}`,
              boxShadow: `12px 12px 0px ${COLORS.amber}`,
              padding: '50px 90px',
              textAlign: 'center',
              fontFamily,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.ink, marginBottom: 16 }}>
              ফেসবুকে সক্রিয় বিজ্ঞাপন
            </div>
            <div style={{ fontSize: 120, fontWeight: 700, color: COLORS.ink }}>{counterVal}+</div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* সিন ৪ */}
      <Sequence from={420} durationInFrames={255}>
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.bgLight,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 90px',
          }}
        >
          <CutoutVisual src="person1.png" label="জামশেদ মজুমদার" />
          <div style={{ maxWidth: 850 }}>
            <HighlightText text="ব্র্যান্ডের পেছনের" highlight="মাস্টারমাইন্ড" fontSize={60} />
          </div>
        </AbsoluteFill>
      </Sequence>

      <TopHUD chapterNum="০১" chapterTitle="শুরুর গল্প" />
    </AbsoluteFill>
  );
};
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
} from "remotion";

function BuildingIcon({ frame }: { frame: number }) {
  const opacity = spring({ frame, fps: 30, config: { damping: 15 } });
  const scale = interpolate(opacity, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="25" y="35" width="70" height="70" rx="4" fill="#6366F1" opacity="0.3" stroke="#6366F1" strokeWidth="2" />
        <rect x="35" y="45" width="16" height="16" rx="2" fill="#6366F1" opacity="0.8" />
        <rect x="69" y="45" width="16" height="16" rx="2" fill="#6366F1" opacity="0.8" />
        <rect x="35" y="69" width="16" height="16" rx="2" fill="#6366F1" opacity="0.8" />
        <rect x="69" y="69" width="16" height="16" rx="2" fill="#6366F1" opacity="0.8" />
        <rect x="42" y="93" width="36" height="12" rx="2" fill="#6366F1" opacity="0.5" />
        <rect x="10" y="55" width="12" height="50" rx="2" fill="#6366F1" opacity="0.2" />
        <rect x="98" y="55" width="12" height="50" rx="2" fill="#6366F1" opacity="0.2" />
        <rect x="0" y="105" width="120" height="15" rx="2" fill="#6366F1" opacity="0.15" />
      </svg>
      <p style={{ margin: "12px 0 0", color: "#A1A1AA", fontSize: 20, fontFamily: "Inter, sans-serif" }}>Tu Negocio</p>
    </div>
  );
}

function LaptopWebsite({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 12 } });
  const y = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{
        width: 320, height: 200,
        background: "#1a1a2e",
        borderRadius: 8,
        border: "2px solid #6366F1",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}>
        <div style={{ height: 20, background: "#6366F1", borderRadius: 4, width: "40%" }} />
        <div style={{ height: 10, background: "#06B6D4", borderRadius: 4, width: "60%" }} />
        <div style={{ flex: 1, display: "flex", gap: 6 }}>
          <div style={{ flex: 1, background: "#1E1E32", borderRadius: 4, display: "flex", flexWrap: "wrap", gap: 4, padding: 6 }}>
            <div style={{ width: "100%", height: 8, background: "#06B6D4", borderRadius: 2, opacity: 0.5 }} />
            <div style={{ width: "45%", height: 8, background: "#52525B", borderRadius: 2 }} />
            <div style={{ width: "45%", height: 8, background: "#52525B", borderRadius: 2 }} />
            <div style={{ width: "30%", height: 8, background: "#6366F1", borderRadius: 2, opacity: 0.7 }} />
          </div>
          <div style={{ width: 80, background: "#1E1E32", borderRadius: 4 }} />
        </div>
        <div style={{ height: 8, background: "#10B981", borderRadius: 4, width: "30%", opacity: 0.7 }} />
      </div>
      <div style={{ width: 340, height: 12, background: "#1a1a2e", borderRadius: "0 0 4px 4px", border: "2px solid #6366F1", borderTop: "none" }} />
      <div style={{ width: 40, height: 4, background: "#52525B", borderRadius: 2, marginTop: 4 }} />
    </div>
  );
}

function ConnectionRays({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 10, stiffness: 60 } });
  const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <div style={{ opacity, position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 200;
        const y = Math.sin(rad) * 200;
        const dotProgress = spring({ frame: frame - 10 - i * 5, fps: 30, config: { damping: 12 } });
        const dotOpacity = interpolate(dotProgress, [0, 1], [0, 1]);

        return (
          <div key={angle} style={{ position: "absolute", left: "50%", top: "50%" }}>
            <div style={{
              position: "absolute",
              width: 2, height: Math.abs(y) * dotProgress,
              background: `linear-gradient(to top, #6366F1, transparent)`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "0 0",
              opacity: dotProgress * 0.5,
            }} />
            <div style={{
              position: "absolute",
              transform: `translate(${x * dotProgress - 12}px, ${y * dotProgress - 12}px)`,
              opacity: dotOpacity,
              transition: "all 0.3s",
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="8" r="3" fill="#0A0A0F" />
                <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="#0A0A0F" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FloatingIcons({ frame }: { frame: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
      <div style={{
        position: "absolute", bottom: "20%", left: "15%",
        transform: `translateY(${Math.sin(frame * 0.02) * 10}px)`,
        display: "flex", alignItems: "center", gap: 4,
        background: "rgba(16, 185, 129, 0.1)", padding: "8px 12px", borderRadius: 8,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
        <span style={{ color: "#10B981", fontSize: 12, fontFamily: "Inter, sans-serif" }}>Crecimiento</span>
      </div>
      <div style={{
        position: "absolute", top: "15%", right: "10%",
        transform: `translateY(${Math.sin(frame * 0.03 + 1) * 8}px)`,
        display: "flex", alignItems: "center", gap: 4,
        background: "rgba(6, 182, 212, 0.1)", padding: "8px 12px", borderRadius: 8,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
        <span style={{ color: "#06B6D4", fontSize: 12, fontFamily: "Inter, sans-serif" }}>24/7</span>
      </div>
    </div>
  );
}

export const WebPagesDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0F", fontFamily: "Inter, sans-serif" }}>
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          transform: "scale(2.5)",
          transformOrigin: "center center",
          width: 768,
          height: 432,
          position: "relative",
        }}>
          <Sequence from={0} durationInFrames={75}>
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <BuildingIcon frame={frame} />
            </div>
          </Sequence>

          <Sequence from={60} durationInFrames={75}>
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <LaptopWebsite frame={frame - 60} />
            </div>
          </Sequence>

          <Sequence from={120} durationInFrames={90}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ConnectionRays frame={frame - 120} />
            </div>
          </Sequence>

          <Sequence from={180} durationInFrames={120}>
            <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, textAlign: "center" }}>
              <div style={{ opacity: spring({ frame: frame - 180, fps: 30, config: { damping: 12 } }) }}>
                <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#F8FAFC" }}>Tu negocio en línea</p>
                <p style={{ margin: "8px 0 0", fontSize: 22, color: "#06B6D4", fontWeight: 500 }}>
                  Al alcance de todos
                </p>
              </div>
            </div>
            <FloatingIcons frame={frame - 180} />
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

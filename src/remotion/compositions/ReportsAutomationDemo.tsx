import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
} from "remotion";

function DataIcons({ frame }: { frame: number }) {
  const items = [
    { label: "CSV", color: "#10B981", x: -120, delay: 0 },
    { label: "DB", color: "#6366F1", x: 0, delay: 8 },
    { label: "API", color: "#06B6D4", x: 120, delay: 16 },
  ];

  return (
    <div style={{ display: "flex", gap: 20 }}>
      {items.map((item, i) => {
        const progress = spring({ frame: frame - item.delay, fps: 30, config: { damping: 12 } });
        const x = interpolate(progress, [0, 1], [-60, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: `${item.color}15`,
              border: `1px solid ${item.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: item.color,
              fontFamily: "JetBrains Mono, monospace",
            }}>
              {item.label}
            </div>
            <span style={{ color: item.color, fontSize: 10, fontFamily: "Inter, sans-serif", opacity: 0.7 }}>{item.label === "CSV" ? "Archivos" : item.label === "DB" ? "Base de Datos" : "Web Service"}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProcessingApp({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 12 } });
  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const bars = [30, 55, 80, 45, 70];
  const currentBar = Math.min(Math.floor((frame - 10) / 12), bars.length - 1);

  return (
    <div style={{ opacity, transform: `scale(${scale})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        width: 280, background: "#12121A", borderRadius: 16,
        border: "1px solid #1E1E32", padding: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" style={{ animation: "spin 2s linear infinite" }}>
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
          <span style={{ color: "#6366F1", fontSize: 13, fontFamily: "JetBrains Mono, monospace" }}>Procesando...</span>
        </div>
        {bars.map((height, i) => {
          const barProgress = spring({ frame: frame - 10 - i * 12, fps: 30, config: { damping: 15 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ color: "#52525B", fontSize: 11, width: 60, fontFamily: "JetBrains Mono, monospace" }}>
                Paso {i + 1}
              </span>
              <div style={{ flex: 1, height: 8, background: "#1E1E32", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${height * barProgress}%`,
                  background: i === currentBar && frame > 10 ? "linear-gradient(90deg, #6366F1, #06B6D4)" : "#6366F1",
                  borderRadius: 4,
                  boxShadow: i === currentBar ? "0 0 12px #6366F1" : "none",
                }} />
              </div>
              <span style={{ color: "#A1A1AA", fontSize: 11, width: 30, fontFamily: "JetBrains Mono, monospace" }}>
                {Math.round(height * barProgress)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OutputResults({ frame }: { frame: number }) {
  const items = [
    { label: "PDF", icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6", color: "#EF4444", delay: 0 },
    { label: "Gráfico", icon: "M18 20V10M12 20V4M6 20v-6", color: "#10B981", delay: 10 },
    { label: "Reporte", icon: "M9 12h6M9 16h6M9 8h6M4 6h16M4 18h16", color: "#06B6D4", delay: 20 },
  ];

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {items.map((item, i) => {
        const progress = spring({ frame: frame - item.delay, fps: 30, config: { damping: 10 } });
        const x = interpolate(progress, [0, 1], [60, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);

        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 14,
              background: `${item.color}15`,
              border: `1px solid ${item.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
            </div>
            <span style={{ color: item.color, fontSize: 11, fontFamily: "Inter, sans-serif" }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function AnimatedCharts({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 12 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const barHeights = [60, 90, 40, 75, 100, 55, 85];
  const colors = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

  return (
    <div style={{ opacity, display: "flex", gap: 8, alignItems: "flex-end", height: 100 }}>
      {barHeights.map((h, i) => {
        const barProgress = spring({ frame: frame - i * 4, fps: 30, config: { damping: 14 } });
        const height = interpolate(barProgress, [0, 1], [0, h]);
        return (
          <div key={i} style={{
            width: 16, height, background: colors[i],
            borderRadius: "4px 4px 0 0", opacity: 0.8,
            boxShadow: `0 0 10px ${colors[i]}40`,
          }} />
        );
      })}
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: "conic-gradient(#6366F1 0% 30%, #06B6D4 30% 55%, #10B981 55% 75%, #F59E0B 75% 100%)",
        opacity: 0.7,
      }} />
    </div>
  );
}

export const ReportsAutomationDemo: React.FC = () => {
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
          <Sequence from={0} durationInFrames={60}>
            <div style={{ position: "absolute", top: "25%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <DataIcons frame={frame} />
            </div>
            <div style={{ position: "absolute", top: "40%", left: 0, right: 0, textAlign: "center" }}>
              <p style={{
                margin: 0, fontSize: 14, color: "#52525B", fontFamily: "Inter, sans-serif",
                opacity: spring({ frame: frame - 5, fps: 30, config: { damping: 12 } }),
              }}>
                Datos de entrada
              </p>
            </div>
          </Sequence>

          <Sequence from={55} durationInFrames={85}>
            <div style={{ position: "absolute", top: "25%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <ProcessingApp frame={frame - 55} />
            </div>
          </Sequence>

          <Sequence from={130} durationInFrames={80}>
            <div style={{ position: "absolute", top: "28%", left: 0, right: 0, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <OutputResults frame={frame - 130} />
              <p style={{
                margin: 0, fontSize: 14, color: "#52525B", fontFamily: "Inter, sans-serif",
                opacity: spring({ frame: frame - 130, fps: 30, config: { damping: 12 } }),
              }}>
                Resultados generados
              </p>
            </div>
          </Sequence>

          <Sequence from={190} durationInFrames={110}>
            <div style={{ position: "absolute", bottom: "20%", left: 0, right: 0, textAlign: "center" }}>
              <div style={{ opacity: spring({ frame: frame - 190, fps: 30, config: { damping: 12 } }) }}>
                <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#F8FAFC" }}>Decisiones basadas</p>
                <p style={{ margin: "8px 0 20px", fontSize: 22, color: "#F59E0B", fontWeight: 500 }}>
                  en datos reales
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AnimatedCharts frame={frame - 190} />
              </div>
            </div>
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

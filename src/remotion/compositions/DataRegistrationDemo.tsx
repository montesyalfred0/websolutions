import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
} from "remotion";

function FallingDocs({ frame }: { frame: number }) {
  const docs = [
    { x: -80, y: -100, rot: 15, delay: 0 },
    { x: 40, y: -140, rot: -10, delay: 5 },
    { x: -30, y: -80, rot: 5, delay: 10 },
    { x: 60, y: -60, rot: -20, delay: 15 },
  ];

  return (
    <div style={{ position: "relative", width: 300, height: 200 }}>
      {docs.map((doc, i) => {
        const progress = spring({ frame: frame - doc.delay, fps: 30, config: { damping: 14 } });
        const y = interpolate(progress, [0, 1], [doc.y, 0]);
        const rot = interpolate(progress, [0, 1], [doc.rot, 0]);
        const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.8, 0.6]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(${doc.x}px, ${y}px) rotate(${rot}deg)`,
              opacity,
              width: 80,
              height: 100,
              background: "#1E1E32",
              borderRadius: 6,
              border: "1px solid #6366F140",
              display: "flex",
              flexDirection: "column",
              padding: 8,
              gap: 4,
            }}
          >
            <div style={{ height: 6, background: "#52525B", borderRadius: 2, width: "60%" }} />
            <div style={{ height: 4, background: "#52525B", borderRadius: 2, opacity: 0.5 }} />
            <div style={{ height: 4, background: "#52525B", borderRadius: 2, opacity: 0.5 }} />
            <div style={{ height: 4, background: "#52525B", borderRadius: 2, opacity: 0.5, width: "80%" }} />
            <div style={{ flex: 1 }} />
            <div style={{ height: 4, background: "#52525B", borderRadius: 2, opacity: 0.3, width: "40%" }} />
          </div>
        );
      })}
    </div>
  );
}

function WebForm({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 12 } });
  const y = interpolate(progress, [0, 1], [80, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const fields = ["Nombre completo", "Correo electrónico", "Teléfono", "Mensaje"];
  const activeField = Math.min(Math.floor((frame - 10) / 10), fields.length - 1);

  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        width: 320,
        background: "#12121A",
        borderRadius: 16,
        border: "1px solid #1E1E32",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        <div style={{ height: 6, background: "#6366F1", borderRadius: 3, width: "40%", marginBottom: 8 }} />
        {fields.map((field, i) => {
          const fieldOpacity = interpolate(frame - 10, [i * 10, i * 10 + 5], [0, 1]);
          const isActive = i === activeField && frame > 10;

          return (
            <div key={i} style={{ opacity: fieldOpacity, position: "relative" }}>
              <div style={{
                height: 12, background: "#1E1E32", borderRadius: 6,
                border: isActive ? "1px solid #6366F1" : "1px solid transparent",
                padding: "8px 12px", display: "flex", alignItems: "center",
              }}>
                <span style={{ fontSize: 12, color: isActive ? "#F8FAFC" : "#52525B", fontFamily: "Inter, sans-serif" }}>
                  {field}
                </span>
              </div>
              {isActive && (
                <div style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  width: 6, height: 6, borderRadius: "50%", background: "#6366F1",
                  boxShadow: "0 0 8px #6366F1",
                }} />
              )}
            </div>
          );
        })}
        <div style={{
          height: 36, background: "linear-gradient(135deg, #6366F1, #06B6D4)",
          borderRadius: 8, marginTop: 4,
          opacity: interpolate(frame - 10, [(fields.length - 1) * 10 + 10, (fields.length - 1) * 10 + 15], [0, 1]),
        }} />
      </div>
    </div>
  );
}

function DataToDB({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 10 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const dots: { x: number; y: number; delay: number }[] = [];
  for (let i = 0; i < 12; i++) {
    dots.push({ x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 100 + 20, delay: i * 3 });
  }

  return (
    <div style={{ opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{
        width: 100, height: 140,
        background: "linear-gradient(180deg, #6366F1 0%, #06B6D4 100%)",
        borderRadius: "20px 20px 12px 12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
        <div style={{
          position: "absolute", bottom: -8, right: -8,
          width: 28, height: 28, borderRadius: "50%", background: "#10B981",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: spring({ frame: frame - 20, fps: 30, config: { damping: 12 } }),
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <div style={{ position: "relative", height: 40, width: 200 }}>
        {dots.map((dot, i) => {
          const dotOpacity = spring({ frame: frame - 10 - dot.delay, fps: 30, config: { damping: 12 } });
          return (
            <div key={i} style={{
              position: "absolute", left: "50%", top: "50%",
              transform: `translate(${dot.x * dotOpacity}px, ${dot.y * dotOpacity}px)`,
              opacity: dotOpacity,
              width: 4, height: 4, borderRadius: "50%", background: "#6366F1",
              boxShadow: "0 0 6px #6366F1",
            }} />
          );
        })}
      </div>

      <p style={{
        margin: 0, fontSize: 16, color: "#10B981", fontFamily: "Inter, sans-serif",
        opacity: spring({ frame: frame - 30, fps: 30, config: { damping: 12 } }),
      }}>
        Datos guardados
      </p>
    </div>
  );
}

function DataTable({ frame }: { frame: number }) {
  const progress = spring({ frame, fps: 30, config: { damping: 12 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const rows = [
    ["Ana López", "ana@email.com", "55-1234-5678", "Cliente"],
    ["Carlos Ruiz", "carlos@email.com", "55-9876-5432", "Proveedor"],
    ["María Paz", "maria@email.com", "55-4567-8901", "Cliente"],
  ];

  return (
    <div style={{ opacity, width: 400, background: "#12121A", borderRadius: 12, border: "1px solid #1E1E32", overflow: "hidden" }}>
      <div style={{ display: "flex", background: "#1E1E32", padding: "8px 12px", gap: 12 }}>
        {["Nombre", "Email", "Teléfono", "Tipo"].map((h) => (
          <div key={h} style={{ flex: 1, fontSize: 11, color: "#6366F1", fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>{h}</div>
        ))}
      </div>
      {rows.map((row, i) => {
        const rowOpacity = spring({ frame: frame - 5 - i * 8, fps: 30, config: { damping: 12 } });
        return (
          <div key={i} style={{ opacity: rowOpacity, display: "flex", padding: "8px 12px", gap: 12, borderTop: "1px solid #1E1E32" }}>
            {row.map((cell, j) => (
              <div key={j} style={{ flex: 1, fontSize: 12, color: "#F8FAFC", fontFamily: "Inter, sans-serif" }}>
                {j === 3 ? <span style={{ color: "#10B981", fontSize: 11 }}>{cell}</span> : cell}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export const DataRegistrationDemo: React.FC = () => {
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
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FallingDocs frame={frame} />
            </div>
          </Sequence>

          <Sequence from={50} durationInFrames={80}>
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <WebForm frame={frame - 50} />
            </div>
          </Sequence>

          <Sequence from={120} durationInFrames={80}>
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <DataToDB frame={frame - 120} />
            </div>
          </Sequence>

          <Sequence from={180} durationInFrames={120}>
            <div style={{ position: "absolute", bottom: "12%", left: 0, right: 0, textAlign: "center" }}>
              <div style={{ opacity: spring({ frame: frame - 180, fps: 30, config: { damping: 12 } }) }}>
                <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "#F8FAFC" }}>Datos organizados</p>
                <p style={{ margin: "8px 0 0", fontSize: 22, color: "#10B981", fontWeight: 500 }}>
                  Siempre accesibles
                </p>
              </div>
            </div>
            <div style={{ position: "absolute", top: "18%", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <DataTable frame={frame - 180} />
            </div>
          </Sequence>
        </div>
      </div>
    </AbsoluteFill>
  );
};

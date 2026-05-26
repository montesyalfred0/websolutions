import { Composition } from "remotion";
import { WebPagesDemo } from "./compositions/WebPagesDemo";
import { DataRegistrationDemo } from "./compositions/DataRegistrationDemo";
import { ReportsAutomationDemo } from "./compositions/ReportsAutomationDemo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="WebPagesDemo"
        component={WebPagesDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataRegistrationDemo"
        component={DataRegistrationDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ReportsAutomationDemo"
        component={ReportsAutomationDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

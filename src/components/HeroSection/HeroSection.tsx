import { ClientComponet } from "./ClientComponet";
import { heading1, section2 } from "./ServerComponent";

export const HeroSection = () => {
  return <ClientComponet section2={section2} heading1={heading1} />;
};

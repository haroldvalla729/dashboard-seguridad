import Nav from "./components/Nav";
import SeccionEmpresa from "./components/SeccionEmpresa";
import SeccionSeguridad from "./components/SeccionSeguridad";
import SeccionISO from "./components/SeccionISO";
import SeccionRiesgos from "./components/SeccionRiesgos";
import SeccionPlan from "./components/SeccionPlan";
import Footer from "./components/Footer";
import './App.css'

export default function App() {
  return (
    <>
      <Nav />
      <header className="hero">
        <h1>Dashboard de Seguridad de la Información</h1>
      </header>
      <SeccionEmpresa />
      <SeccionSeguridad />
      <SeccionISO />
      <SeccionRiesgos />
      <SeccionPlan />
      <Footer />
    </>
  );
}

export default function Footer() {
    return (
      <footer className="bg-zinc-900 text-gray-400 w-screen py-8 mt-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sección Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/ayuda/avisoLegal" className="hover:text-white">Aviso Legal</a></li>
              <li><a href="/ayuda/politicaPrivacidad" className="hover:text-white">Política de Privacidad</a></li>
              <li><a href="/ayuda/terminosServicio" className="hover:text-white">Términos de Servicio</a></li>
              <li><a href="/ayuda/condicionesSuscripcion" className="hover:text-white">Condiciones de Suscripción</a></li>
              <li><a href="/ayuda/politicaDonaciones" className="hover:text-white">Política de Donaciones</a></li>
            </ul>
          </div>
  
          {/* Sección Suscripción & Mecenazgo */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suscripción & Mecenazgo</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/ayuda/planes" className="hover:text-white">Planes y Precios</a></li>
              <li><a href="/ayuda/metodosDePago" className="hover:text-white">Métodos de Pago</a></li>
              <li><a href="/ayuda/apoyarArtistas" className="hover:text-white">Cómo Apoyar a Artistas</a></li>
              <li><a href="/ayuda/beneficiosMecenas" className="hover:text-white">Beneficios para Mecenas</a></li>
            </ul>
            
          </div>
          <div>
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Contacto</h4>
              <p className="text-sm"><a href="mailto:soporte@zaptune.com" className="hover:text-white">soporte@zaptune.com</a></p>
              <p className="text-sm">+34 600 000 000</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
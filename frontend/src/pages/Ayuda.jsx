import { useParams } from 'react-router-dom'

const ayudas = {
  avisoLegal: {
    titulo: 'Aviso Legal',
    contenido: [
    <>
    <p>El presente sitio web, <strong>ZapTune</strong>, es un servicio digital gestionado por [Tu Nombre o Nombre Legal], con NIF [XXXXXXX-X] y domicilio en [Dirección física o sede online]. El uso de esta plataforma implica la aceptación de las condiciones recogidas en este aviso.</p>
    <h2>Responsabilidades:</h2>
    <ul>
    <li>ZapTune no se responsabiliza del mal uso del servicio por parte de los usuarios.</li>
    <li>Las canciones subidas por artistas son responsabilidad exclusiva de sus autores.</li>
    <li>ZapTune se compromete a retirar contenido tras recibir denuncia justificada.</li>
    </ul> </> ],
  },
  politicaPrivacidad: {
    titulo: 'Politica de Privacidad',
    contenido: [
        <>
            <p>ZapTune respeta la privacidad de sus usuarios y cumple con el Reglamento General de Protección de Datos (RGPD).</p>
            <h2>Qué datos recogemos:</h2>
            <ul>
            <li>Datos de registro: nombre, correo electrónico y contraseña.</li>
            <li>Contenido subido por artistas.</li>
            <li>Información de uso (reproducciones, interacciones, etc.).</li>
            </ul>
            <h2>Uso de los datos:</h2>
            <ul>
            <li>Mejorar la experiencia del usuario.</li>
            <li>Contacto con los usuarios cuando sea necesario.</li>
            <li>No se ceden datos a terceros, salvo obligación legal.</li>
            </ul>
        </>
    ],
  },
  terminosServicio: {
    titulo: 'Terminos de Servicio',
    contenido: [
        <>
            <h2>Registro:</h2>
            <ul>
            <li>Solo se permite un usuario por persona.</li>
            <li>Es responsabilidad del usuario mantener la confidencialidad de sus datos.</li>
            </ul>
            <h2>Contenido:</h2>
            <ul>
            <li>El usuario debe tener derechos sobre el contenido que sube.</li>
            <li>Se prohíbe la subida de contenido ofensivo o con copyright no autorizado.</li>
            </ul>
            <h2>Suspensión de cuentas:</h2>
            <ul>
            <li>ZapTune puede suspender cuentas que incumplan las normas de uso sin previo aviso.</li>
            </ul>
        </>
    ],
  },
  condicionesSuscripcion: {
    titulo: 'Condiciones de Suscripción',
    contenido: [
      <>
        <ul>
        <li>Suscripción mensual: <strong>8€</strong>, promoción inicial: <strong>4€</strong> los primeros 3 meses.</li>
        <li>Se puede cancelar en cualquier momento antes de la siguiente renovación.</li>
        <li>El pago se realiza mediante métodos seguros y validados (Stripe).</li>
        </ul>
      </>
    ],
  },
  politicaDonaciones: {
    titulo: 'Politica de Donaciones',
    contenido: [
      <>
        <ul>
        <li>Las donaciones a artistas son <strong>voluntarias y no reembolsables</strong>.</li>
        <li>ZapTune retiene una comisión del <strong>5%</strong> sobre cada donación.</li>
        <li>Los artistas deben declarar los ingresos según la legislación de su país.</li>
        </ul>
      </>
    ],
  },
  planes: {
    titulo: 'Planes y Precios',
    contenido: [
        <>
            <table className='border border-collapse'>
            <tr><th className='border border-collapse'>Plan</th><th className='border border-collapse'>Precio mensual</th><th className='border border-collapse'>Características</th></tr>
            <tr><td className='border border-collapse'>Gratuito</td><td className='border border-collapse'>0 €</td><td className='border border-collapse'>Con anuncios, sin mecenazgo</td></tr>
            <tr><td className='border border-collapse'>Premium</td><td className='border border-collapse'>8 € (4 € promo)</td><td className='border border-collapse'>Sin anuncios, acceso completo</td></tr>
            <tr><td className='border border-collapse'>Mecenas</td><td className='border border-collapse'>+ Donación</td><td className='border border-collapse'>Apoyo directo, recompensas</td></tr>
            </table>
        </>
    ],
  },
  metodosDePago: {
    titulo: 'Métodos de Pago',
    contenido: [
      <>
        <ul>
        <li>Pagos mediante <strong>Stripe</strong> (tarjeta o billetera virtual).</li>
        <li>Todos los pagos están cifrados.</li>
        <li>No almacenamos información bancaria directamente.</li>
        </ul>
      </>
    ],
  },
  comoApoyarArtista: {
    titulo: 'Cómo Apoyar a los Artistas',
    contenido: [
        <>
            <ul>
            <li>Haz una donación libre a tu artista favorito.</li>
            <li>Donando más de <strong>5€</strong>, escuchas sin anuncios durante 1 año.</li>
            <li>Algunos artistas ofrecen recompensas especiales.</li>
            </ul>
        </>
    ],
  },
  beneficiosMecenas: {
    titulo: 'Beneficios para Mecenas',
    contenido: [
        <>
            <ul>
            <li>Escucha sin publicidad al artista que has apoyado.</li>
            <li>Acceso prioritario a eventos y contenido exclusivo.</li>
            <li>Distintivo especial en tu perfil de usuario.</li>
            </ul>
        </>
    ],
  },
}

export default function Ayuda() {
  const { seccion } = useParams()
  const ayuda = ayudas[seccion] || ayudas.general

  return (
    <div className="max-w-3xl mx-auto h-screen p-6 panel">
      <h1 className="text-2xl font-bold mb-4">{ayuda.titulo}</h1>
      <ul className="list-disc pl-6 space-y-2">
        {ayuda.contenido.map((linea, i) => (
          <div key={i}>{linea}</div>
        ))}
      </ul>
    </div>
  )
}

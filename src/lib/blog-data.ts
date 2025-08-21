export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'top-5-rutas-sierra-nevada',
    title: 'Top 5 Rutas para Principiantes en Sierra Nevada',
    author: 'Ana García',
    date: '26 de Octubre, 2023',
    excerpt:
      '¿Acabas de empezar en el mundo del senderismo? Aquí tienes cinco rutas impresionantes y asequibles en Sierra Nevada para empezar con buen pie.',
    content: `
      <h2>Introducción</h2>
      <p>Sierra Nevada puede ser imponente, pero está llena de senderos perfectos para quienes se inician en el senderismo. Esta guía te mostrará cinco de nuestros favoritos en la zona de Granada.</p>
      <h3>1. Ruta del Colesterol, Monachil</h3>
      <p>Un paseo impresionante junto al río Monachil, famoso por sus puentes colgantes. Es mayormente llano y ofrece oportunidades fotográficas increíbles. Ideal para familias.</p>
      <h3>2. Hoya de la Mora - Posiciones del Veleta</h3>
      <p>Una ruta panorámica que ofrece vistas espectaculares de las altas cumbres. El camino está bien señalizado y es apto para la mayoría de los niveles, aunque la altitud puede ser un factor.</p>
      <h3>3. Vereda de la Estrella, Güéjar Sierra</h3>
      <p>Este sendero histórico en el corazón de Sierra Nevada ofrece vistas icónicas de las caras norte del Mulhacén y el Alcazaba. Es una experiencia gratificante para cualquier principiante con ganas de un reto.</p>
      <h3>4. Lavaderos de la Reina, Güéjar Sierra</h3>
      <p>Una de las rutas más bonitas en primavera, cuando los "borreguiles" (prados de alta montaña) están en su máximo esplendor y el agua del deshielo corre por todas partes.</p>
      <h3>5. Fuente del Avellano y Silla del Moro, Granada</h3>
      <p>Una ruta periurbana, perfecta para una escapada rápida desde Granada. Ofrece vistas espectaculares de la Alhambra y la ciudad, mezclando naturaleza e historia.</p>
    `,
  },
  {
    slug: 'review-forclaz-trek-100',
    title: 'Análisis: Zapatillas de Trekking Forclaz Trek 100',
    author: 'Juan Pérez',
    date: '2 de Noviembre, 2023',
    excerpt:
      "¿Son las Forclaz Trek 100 de Decathlon una buena opción para nuestras rutas por Andalucía? Las hemos puesto a prueba en una travesía de 3 días.",
    content: `
      <h2>Primeras Impresiones</h2>
      <p>Las Forclaz Trek 100 tienen fama de ser duraderas y asequibles. El agarre de la suela CrossContact parece prometedor para los terrenos de nuestra sierra.</p>
      <h3>Comodidad y Ajuste</h3>
      <p>El ajuste es bueno desde el primer momento. Tras largas jornadas en la montaña, no hemos experimentado rozaduras ni molestias significativas. El sistema de lazada es sencillo pero efectivo.</p>
      <h3>Rendimiento y Durabilidad</h3>
      <p>Con una capacidad de resistencia notable, se han comportado bien en terreno seco y rocoso. La impermeabilidad es suficiente para lluvias ligeras, pero pueden no ser la mejor opción para condiciones muy húmedas.</p>
      <h2>El Veredicto</h2>
      <p>Estas zapatillas cumplen lo que prometen. Son una inversión excelente para senderistas que busquen una opción fiable y económica para la mayoría de condiciones que encontramos en España.</p>
    `,
  },
  {
    slug: 'decalogo-montanero',
    title: 'El Decálogo del Buen Montañero',
    author: 'Club Alpine-Hike',
    date: '10 de Noviembre, 2023',
    excerpt:
      'El senderismo responsable significa proteger nuestros espacios naturales. Conoce las reglas básicas para minimizar tu impacto en la montaña.',
    content: `
      <h2>Por Qué Es Importante</h2>
      <p>A medida que más gente descubre el placer de la naturaleza, nuestro impacto colectivo crece. Seguir unos principios básicos es crucial para preservar la naturaleza para futuras generaciones.</p>
      <h3>Los Principios</h3>
      <ol>
        <li><strong>Planifica tu actividad:</strong> Infórmate sobre la ruta, la méteo y tus propias capacidades.</li>
        <li><strong>Viaja y acampa en superficies resistentes:</strong> Usa los senderos y zonas de acampada habilitadas.</li>
        <li><strong>Gestiona tus residuos adecuadamente:</strong> Lo que lleves a la montaña, debe volver contigo.</li>
        <li><strong>Deja lo que encuentres:</strong> Permite que otros disfruten de la belleza de la naturaleza tal como la encontraste. No te lleves piedras, plantas ni otros "recuerdos".</li>
        <li><strong>Minimiza el impacto de las hogueras:</strong> Usa un hornillo. Si haces fuego, que sea en lugares permitidos y de forma segura.</li>
        <li><strong>Respeta la fauna salvaje:</strong> Obsérvala desde la distancia. No alimentes a los animales.</li>
        <li><strong>Sé considerado con otros visitantes:</strong> Respeta a los demás y protege la calidad de su experiencia en la naturaleza.</li>
      </ol>
    `,
  },
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

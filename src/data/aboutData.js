export const PROGRAM = {
  title: "Armonía Animal Radio y TV",
  tagline: "Un programa creado para educar sobre bienestar animal y su relación con el bien vivir de las personas.",
  host: "Marleny Aguilar",
  hostRole: "Conductora",
  description:
    "Es un programa radial educativo en su versión radial y televisiva. A través de entrevistas, reportajes e historias, buscamos promover relaciones sanas de los seres humanos con todas las especies.",
  format: ["Entrevistas", "Reportajes", "Historias"],
  segments: [
    {
      id: "michis",
      title: "Cosas de Michis y Chuchis",
      iconId: "paw",
      description:
        "Segmento de cápsulas en formato de radioteatro con duración de un minuto, en donde se abordan temas para erradicar el maltrato y abandono de mascotas.",
    },
    {
      id: "experto",
      title: "Entrevista con el Experto",
      iconId: "user-tie",
      description:
        "Segmento de entrevistas con veterinarios, directores de asociaciones, rescatistas, directores de instituciones animalistas y ambientales y otros expertos en la salud y cuidado de todos los animales con el fin de promover relaciones sanas de los seres humanos con todas las especies.",
    },
    {
      id: "perspectiva",
      title: "En perspectiva",
      iconId: "tv",
      description:
        "Segmento mensual de micro reportajes sobre temas relevantes de problemáticas específicas de los animales en Guatemala y el mundo.",
    },
    {
      id: "agenda",
      title: "La agenda",
      iconId: "calendar",
      description:
        "Segmento dedicado a difundir eventos de campañas de castración, jornadas de adopción y eventos sociales que tengan relación con el ámbito animalista.",
    },
  ],
  schedule: {
    radio: {
      title: "Radio Sónica 106.9 FM",
      time: "Viernes 13:30 hrs",
      url: "https://sonica.gt/",
      color: "var(--color-hv-primary)",
    },
    tv: {
      title: "Canal Más Guatemala",
      detail: "Canal 28 Tigo · Canal 81 Claro",
      time: "Viernes 13:30 hrs",
      url: "#",
      color: "var(--color-hv-accent-emerald)",
    },
  },
};

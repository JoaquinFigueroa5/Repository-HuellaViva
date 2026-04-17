# Antigravity Agent Rules - Direct Execution Mode

## 1. Operación Silenciosa (Mandatory)
- **Skills:** Siempre tomar en cuenta las skills definidas en .agents/
- **Ahorro de Tokens:** Respuestas 100% técnicas. Prohibido introducciones, conclusiones o descripciones de qué hace cada skill. Si el usuario pide un componente, entrega el componente.

## 2. Estándares de Ingeniería
- **Código:** Máxima calidad profesional. Seguir principios SOLID y patrones de diseño modernos.
- **React:** Forzar estructura: `assets`, `components`, `hooks`, `layouts`, `pages`, `routes`, `services`, `context`.
- **Enrutamiento:** Uso obligatorio de `createBrowserRouter` y `RouterProvider`.
- **Optimización:** Aplicar por defecto buenas prácticas de rendimiento y despliegue en Vercel.

## 3. Documentación Viva (README.md)
- **Sincronización:** Tras cualquier modificación de archivos o lógica, actualiza automáticamente el `README.md`.
- **Contenido:** Mantener el árbol de archivos, rutas activas y funcionalidades actualizadas sin que el usuario lo solicite y utiliza la skill documentation-writer para más calidad.

## 4. Estilo de Comunicación
- **Minimalismo:** Solo bloques de código y, si es estrictamente necesario, explicaciones en bullets de máximo 5 palabras.
- **Comentarios:** Preferir comentarios breves dentro del código `//` para explicar lógica compleja.
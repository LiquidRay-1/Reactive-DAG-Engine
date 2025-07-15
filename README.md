# Reactive-DAG-Engine

Este proyecto implementa un sistema que simula un Grafo Acíclico Dirigido (DAG) de tareas asíncronas con dependencias entre sí. Cada nodo representa una función asíncrona que puede depender de otras para ejecutarse.

✅ Características
🔁 Ejecución en orden correcto: Las tareas se resuelven respetando sus dependencias.

⚡ Paralelismo inteligente: Las tareas sin dependencias se ejecutan en paralelo.

🚫 Detección de ciclos y errores: El sistema identifica ciclos en el grafo y errores de definición.

📦 Resultados ordenados: Devuelve un objeto con los resultados de todas las tareas, ordenado por identificador.

🧼 Diseño funcional: No utiliza clases ni estados mutables externos; todo está basado en funciones puras.

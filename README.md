# Reactive-DAG-Engine

Implementa un sistema que simule un grafo acíclico dirigido (DAG) de tareas asincrónicas dependientes entre sí, donde cada nodo es una función asíncrona que depende de otras. El sistema debe:

Resolver la ejecución de las tareas en el orden correcto (respetando dependencias).

Ejecutar las tareas de forma paralela cuando no tengan dependencias entre sí.

Detectar ciclos y errores en la definición del DAG.

Retornar el resultado de todas las tareas al finalizar, ordenado por identificador.

Ser completamente funcional y no depender de clases ni estados mutables externos.

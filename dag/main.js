function drawGraph(tasks) {
  const nodes = Object.keys(tasks).map(id => ({ id, label: id }));
  const edges = [];
  for (const [id, task] of Object.entries(tasks)) {
    task.deps.forEach(dep => {
      edges.push({ from: dep, to: id });
    });
  }
  const container = document.getElementById('graph');
  const data = { nodes, edges };
  const options = { layout: { hierarchical: { enabled: true, sortMethod: 'directed' } } };
  new vis.Network(container, data, options);
}

async function runGraph() {
  const output = document.getElementById('output');
  try {
    const raw = JSON.parse(document.getElementById('taskInput').value);
    const tasks = {};
    for (const [key, val] of Object.entries(raw)) {
      tasks[key] = {
        deps: val.deps,
        fn: eval(val.fn) // ATENCIÓN: Esto es solo para demostración
      };
    }
    drawGraph(tasks);
    const result = await runTaskGraph(tasks);
    output.textContent = JSON.stringify(result, null, 2);
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
}

async function runTaskGraph(tasks) {
  const visited = new Set();
  const visiting = new Set();

  function detectCycle(node) {
    if (visiting.has(node)) throw new Error(`Ciclo detectado en ${node}`);
    if (visited.has(node)) return;

    visiting.add(node);
    for (const dep of tasks[node].deps) {
      if (!tasks[dep]) throw new Error(`Dependencia no encontrada: ${dep}`);
      detectCycle(dep);
    }
    visiting.delete(node);
    visited.add(node);
  }
  Object.keys(tasks).forEach(detectCycle);

  const results = {};
  const cache = {};

  async function resolveNode(id) {
    if (id in cache) return cache[id];

    const { deps, fn } = tasks[id];
    const depResults = await Promise.all(deps.map(resolveNode));
    const depObj = deps.reduce((acc, key, i) => (acc[key] = depResults[i], acc), {});

    const result = fn(depObj);
    cache[id] = result;
    const resolved = await result;
    results[id] = resolved;
    return resolved;
  }

  await Promise.all(Object.keys(tasks).map(resolveNode));
  return results;
}

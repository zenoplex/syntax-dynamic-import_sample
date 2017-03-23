import Sync from 'Sync';

Sync();

// $FlowFixMe
const modulePromise = import('Async');
modulePromise.then(module => module.default());

// async await
const loadModule = async () => {
  const module = await import('Async');
  return module.default;
};

loadModule().then(res => res());

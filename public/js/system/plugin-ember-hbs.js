import EmTC from 'ember-template-compiler';

export var translate = function(load) {
  console.log(`Compiling template: ${load.metadata.pluginArgument}`);
  var template = EmTC.precompile(load.source, false);
  return `import Em from 'ember';\nexport default Em.HTMLBars.template(${template});`;
};

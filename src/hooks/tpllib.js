import lodash from 'lodash';

function getStrIfIsNotEmpty(obj, path, defaultVal) {
  const v = lodash.get(obj, path);
  if (!v) {
    return defaultVal;
  }
  return v;
}

/**
 *
 * @param p
 * @param k
 */
function buildCls(p, k = 'ui.class') {
  const cls = lodash.get(p, k);
  let str = '';
  if (Array.isArray(cls)) {
    str = cls.join(' ');
  }
  return str;
}

/**
 * attrTOStr
 * @param attrs
 * @param context
 * @return {string}
 */
function attrTOStr(attrs = [], context = {}) {
  const c = Object.assign({
    $: lodash,
  }, context);
  let str = '';
  if (Array.isArray(attrs)) {
    attrs.forEach(attr => {
      if (Array.isArray(attr)) {
        str = str + ` ${attr[0]}='${attr[1]}'`;
      } else if (typeof attr === 'string') {
        str = str + ` ${attr}`;
      } else if (lodash.isObject(attr) && Array.isArray(attr.handler)) {
        // eslint-disable-next-line no-new-func
        const fun = new Function(attr.handler[0], attr.handler[1]);
        const ret = fun(c);
        if (Array.isArray(ret)) {
          str = str + ` ${ret[0]}='${attr.prefixValue ? attr.prefixValue : ''}${ret[1]}${attr.suffixValue ? attr.suffixValue : ''}'`;
        }
      }
    });
    // console.log('attrs', attrs, str);
  }
  return str;
}

/**
 * attr2Str
 * @param attrs {Array}
 * @param context
 * @return {string}
 */
function attr2Str(attrs = [], context = {}) {
  const c = Object.assign({
    $: lodash,
  }, context);
  let str = '';
  if (Array.isArray(attrs)) {
    attrs.forEach(attr => {
      if (Array.isArray(attr)) {
        str = str + ` ${attr[0]}='${attr[1]}'`;
      } else if (typeof attr === 'string') {
        str = str + ` ${attr}`;
      } else if (lodash.isObject(attr) && Array.isArray(attr.handler)) {
        // eslint-disable-next-line no-new-func
        const fun = new Function(attr.handler[0], attr.handler[1]);
        const ret = fun(c);
        if (Array.isArray(ret)) {
          str = str + ` ${ret[0]}='${attr.prefixValue ? attr.prefixValue : ''}${ret[1]}${attr.suffixValue ? attr.suffixValue : ''}'`;
        }
      }
    });
    // console.log('attrs', attrs, str);
  }
  return str.trim();
}

/**
 * attrStr
 * @param p {{}}  config
 * @param k {string} key
 * @param context
 * @return {string}
 */
function attrStr(p, k = 'ui.attrs', context = {}) {
  const attrs = lodash.get(p, k);
  return attr2Str(attrs, context)
}


function getSelfPath(basePath, BASE_PATH) {
  let fromPath = basePath.replace(BASE_PATH, '');
  if (fromPath.startsWith('.')) {
    fromPath = fromPath.slice(1, fromPath.length);
  }
  return fromPath;
}

/**
 * attrStyles
 * @param p {{}}  config
 * @param k {string} key
 * @param context
 * @return {string}
 */
function attrStyles(p, k = 'ui.styles') {

  let str = '';
  const attrs = lodash.get(p, k);
  // console.log(attrs);
  if (Array.isArray(attrs)) {
    attrs.forEach(attr => {
      if (Array.isArray(attr)) {
        str = str + ` ${attr[0]}:${attr[1]};`;
      } else if (typeof attr === 'string') {
        // str = str + ` ${attr}`;
      } else if (lodash.isObject(attr) && Array.isArray(attr.handler)) {
        // eslint-disable-next-line no-new-func
        // const fun = new Function(attr.handler[0], attr.handler[1]);
        // const ret = fun(c);
        // if (Array.isArray(ret)) {
        //   str = str + ` ${ret[0]}='${attr.prefixValue ? attr.prefixValue : ''}${ret[1]}${attr.suffixValue ? attr.suffixValue : ''}'`;
        // }
      }
    });
    // console.log('attrs', attrs, str);
  }
  return str;
}

function getLabel(CONFIG, configPath, key) {
  const def = lodash.get({
    config: CONFIG,
  }, configPath);
  // console.log(def, configPath);
  if (def) {
    const ret = lodash.get(def, 'ui.label', key);
    // console.log(ret);
    return ret;
  }
  return key;
}

export function renderForm(p, basePath, configPath, append = {}) {
  const context = {
    tpl: '',
  };
  function render(p, key, context, level, basePath, configPath, pathArrStr, ext) {
    if (p.type === 'object') {
      const obj_tag = p.tag ? p.tag : 'div';
      const wrap_tag = p.wrap ? p.wrap : '';
      const wrap_start = p.wrap_start ? p.wrap_start : '';
      const wrap_end = p.wrap_end ? p.wrap_end : '';
      const fromPath = getSelfPath(basePath, append.BASE_PATH);

      if (wrap_tag) {
        context.tpl = context.tpl + `<${wrap_tag} :binds="{ pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}',   config: getUI_CONFIG('${configPath}'),  }" ${attrStr(p, 'wrapAttrs')}>`;
      }


      if (wrap_start) {
        context.tpl = context.tpl + wrap_start;
      }

      context.tpl = context.tpl + `
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', config: getUI_CONFIG('${configPath}'), pathArr: [${pathArrStr.slice(1)}], configPath: '${configPath}', label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}',  process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="object_beforebegin"></slot-com>            
<${obj_tag} class="level_${level} z-form__object ${buildCls(p)}" ${attrStr(p)} :binds="{ pathArr: [${pathArrStr.slice(1)}] }"
v-if="${basePath}"
>
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', config: getUI_CONFIG('${configPath}'), pathArr: [${pathArrStr.slice(1)}], configPath: '${configPath}', label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}',  process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="object_afterbegin"></slot-com>    
`;
      for (const [ key, value ] of Object.entries(p.properties)) {
        ext.parentModel = `${basePath}`;
        render(value, key, context, level + 1,
          `${basePath}.${key}`, `${configPath}.properties.${key}`, `${pathArrStr},'${key}'`, ext);
      }
      context.tpl = context.tpl + `
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}', selfpath: '${fromPath}',  pathArr: [${pathArrStr.slice(1)}], process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="object_beforeend"></slot-com>
</${obj_tag}>
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}', selfpath: '${fromPath}',  pathArr: [${pathArrStr.slice(1)}], process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="object_afterend"></slot-com>`;

      if (wrap_end) {
        context.tpl = context.tpl + wrap_end;
      }


      if (wrap_tag) {
        context.tpl = context.tpl + `</${wrap_tag}>`;
      }

    } else if (p.type === 'array') {
      const itemKey = 'item' + level;
      const indexKey = 'index' + level;
      const fromPath = getSelfPath(basePath, append.BASE_PATH);
      const array_tag = p.tag ? p.tag : 'div';
      const wrap_tag = p.wrap ? p.wrap : '';
      const wrap_start = p.wrap_start ? p.wrap_start : '';
      const wrap_end = p.wrap_end ? p.wrap_end : '';
      const array_con_tag = p.con_tag ? p.con_tag : 'div';
      const con_attr = attrStr(p, 'ui.conAttrs', {
        itemKey,
        indexKey,
      });
      const con_cls = buildCls(p, 'ui.conClass');
      // console.dir(append.CONFIG)
      if (wrap_tag) {
        context.tpl = context.tpl + `<${wrap_tag} 
:binds="{ key: '${key}',  label: '${getLabel(append.CONFIG, configPath, key)}',   config: getUI_CONFIG('${configPath}'),  selfpath: '${fromPath}',  partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}] }" 
${attrStr(p, 'wrapAttrs')}>`;
      }

      context.tpl = context.tpl + `
 <slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}',   pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}',  CONFIG: '${append.CONFIG}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="array_beforebegin"></slot-com>                   
<${array_tag} class="level_${level} z-form__array ${buildCls(p)}" :binds="{ pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}',   config: getUI_CONFIG('${configPath}'),  }" ${attrStr(p)}>
 <slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}', pathArr: [${pathArrStr.slice(1)}],   label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}',  CONFIG: '${append.CONFIG}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="array_afterbegin"></slot-com>              
<${array_con_tag} v-for="(${itemKey}, ${indexKey}) in ${basePath}" class="z-form__array-con ${con_cls}"  ${con_attr} 
:binds="{ itemKey:${itemKey}, indexKey:${indexKey}, pathArr: [${pathArrStr.slice(1)}, ${indexKey}] }">
<slot-com :defs="slotContent" :attrs="{parts}"
         :binds="{key: '${key}', partName: '${append.part.name}', indexKey:${indexKey}, fromPath: '${fromPath}',  pathArr: [${pathArrStr.slice(1)}],  label: '${getLabel(append.CONFIG, configPath, key)}',  CONFIG: '${append.CONFIG}', selfpath: '${fromPath}['+ ${indexKey} +']', level:'${level}', parentlevel:'${level - 1}', basePath: '${basePath}', configPath: '${configPath}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="array_con_afterbegin"></slot-com>           
`;
      if (p.items.type === 'object') {
        for (const [ key, value ] of Object.entries(p.items.properties)) {
          ext.parentModel = `${basePath}[${indexKey}]`;
          render(value, key, context, level + 1,
            `${basePath}[${indexKey}].${key}`, `${configPath}.items.properties.${key}`, `${pathArrStr}, ${indexKey}, '${key}'`, ext);
        }
      }

      context.tpl = context.tpl + `
<slot-com :defs="slotContent" :attrs="{parts}"
         :binds="{key: '${key}', partName: '${append.part.name}', indexKey:${indexKey}, fromPath: '${fromPath}', pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}['+ ${indexKey} +']', level:'${level}', parentlevel:'${level - 1}', basePath: '${basePath}', configPath: '${configPath}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="array_con_beforeend"></slot-com>            
</${array_con_tag}>
<slot-com :defs="slotContent" :attrs="{parts}"
         :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}', pathArr: [${pathArrStr.slice(1)}],  label: '${getLabel(append.CONFIG, configPath, key)}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="array_beforeend"></slot-com>            
</${array_tag}>
<slot-com :defs="slotContent" :attrs="{parts}"
         :binds="{key: '${key}', partName: '${append.part.name}', configPath: '${configPath}',   pathArr: [${pathArrStr.slice(1)}],  label: '${getLabel(append.CONFIG, configPath, key)}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="array_aftereend"></slot-com> 
`;

      if (wrap_end) {
        context.tpl = context.tpl + wrap_end;
      }

      if (wrap_tag) {
        context.tpl = context.tpl + `</${wrap_tag}>`;
      }

    } else {
      // console.log(p, key);
      if (!p.hidden) {
        const col_tag = p.tag ? p.tag : 'div';
        const field_tag = p.field_tag ? p.field_tag : 'cm-field';
        const wrap_tag = p.wrap ? p.wrap : '';
        const wrap_start = p.wrap_start ? p.wrap_start : '';
        const wrap_end = p.wrap_end ? p.wrap_end : '';
        const fromPath = getSelfPath(basePath, append.BASE_PATH);
        const col_style = attrStyles(p).trim();
        // console.log(col_style)
        // const attrs2 = styleAddToAttr(p.ui.attrs, col_style);

        const attrs = lodash.get(p, 'ui.attrs', []);
        const attrs2Str = attr2Str(attrs);
        // console.log(attrs);

        if (wrap_tag) {
          context.tpl = context.tpl + `<${wrap_tag}
:binds="{ key: '${key}',  label: '${getLabel(append.CONFIG, configPath, key)}',   config: getUI_CONFIG('${configPath}'),  selfpath: '${fromPath}',  partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}] }" 
>`;
        }

        if (wrap_start) {
          context.tpl = context.tpl + wrap_start;
        }


        context.tpl = context.tpl + `
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', configPath: '${configPath}', selfpath: '${fromPath}',  process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="prop_beforebegin"></slot-com>
<${col_tag} class="level_${level} z-form__prop ${buildCls(p)}" ${attrs2Str}

style="${col_style}"
><slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', config: getUI_CONFIG('${configPath}'), configPath: '${configPath}', selfpath: '${fromPath}',  process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="prop_afterbegin"></slot-com>`;

        context.tpl = context.tpl +
          `<${field_tag}
v-model="${basePath}"
label="${key}" prop="${key}" 
selfpath="${fromPath}"
form-path="${basePath}"
:parent-model="${ext.parentModel}"
type="${p.type}"
:path-arr="[${pathArrStr.slice(1)}]"
:ui="${configPath}.ui"
:rules="${configPath}.rules"
:context="${append.partKey}"
part_key="${append.partKey}"
:prop_config  =" getUI_CONFIG('${configPath}')"
:slot-content="slotContent"
>
<template v-slot:cmfield_label_beforeend="">
<slot-com :defs="slotContent" :attrs="{parts}" 
         :binds="{key: '${key}', partName: '${append.part.name}', config: getUI_CONFIG('${configPath}'), pathArr: [${pathArrStr.slice(1)}],  configPath: '${configPath}', selfpath: '${fromPath}',  process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
            name="prop_label_beforeend"></slot-com>
</template>
</${field_tag}>`;


        context.tpl = context.tpl + `
 <slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', type: '${p.type}', partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}',  level:'${level}', parentlevel:'${level - 1}', basePath: '${basePath}', configPath: '${configPath}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="prop_beforeend"></slot-com>              
</${col_tag}>
<slot-com :defs="slotContent" :attrs="{parts}"
           :binds="{key: '${key}', type: '${p.type}', partName: '${append.part.name}', pathArr: [${pathArrStr.slice(1)}], label: '${getLabel(append.CONFIG, configPath, key)}', selfpath: '${fromPath}', level:'${level}', parentlevel:'${level - 1}', basePath: '${basePath}', configPath: '${configPath}', process: '${append.CONFIG.process}', parts: parts, BASE_PATH:'${append.BASE_PATH}' }"
              name="prop_afterend"></slot-com>`;

        if (wrap_end) {
          context.tpl = context.tpl + wrap_end;
        }

        if (wrap_tag) {
          context.tpl = context.tpl + `</${wrap_tag}>`;
        }

      } else {
        //
      }
    }
  }

  render(p, '', context, 1, basePath, configPath, '', { arrIndexes: {} });
  return context.tpl;
}

export default {
  attr2Str,
  getStrIfIsNotEmpty,
  getSelfPath,
  buildCls,
  attrTOStr,
};


/**
 *
 * @param model
 * @param name
 * @param args
 * @returns {string}
 */
export let buildFormDep = function (model = {parts: []}, name = model.name, args = {}) {
  let JSON5 = ZY.JSON5;
  let parsedParts = []
  let defaultVals = {}
  let parts = model.parts
  // console.log(model)
  parts.forEach(part => {
    if (part.name && part.type) {
      try {

        let metas = {}
        try {
          metas = JSON5.parse(part.metas)
        } catch (e) {
        //
        }
        let ui = JSON5.parse(part.ui)
        let partProps = JSON5.parse(part.properties)
        // let computed = JSON5.parse(part.computed)
        let computed = {}
        if (part.computed) {
         try {
           computed = JSON5.parse(part.computed)
         } catch (e) {
         //
         }
        }
        let computed2 = {}
        if (part.computed2) {
          try {
            computed2 = JSON5.parse(part.computed2)
            // console.log(computed2)
            let ret = {}
            if (Array.isArray(computed2.parts)) {
              computed2.parts.forEach(part => {
                let value = part.value
                try {
                  let valueObj = JSON5.parse(value)
                  if (valueObj.textContent) {
                    ret[part.name] = valueObj.textContent
                  }
                } catch (e) {
                  console.log(e)
                }
              })
            }
            computed = Object.assign(computed, ret)
          } catch (e) {
            console.log(e)
          }
        }
        // console.log('computed', computed)
        let properties = partProps.properties
        // console.log(partProps)

        let obj = {
          type: part.type,
          name: part.name,
          serviceTpl: {
            def: {},
            args: {
              src: 'bservice.twig',
            },
          },
          def: {
            type: 'object',
            ui,
            properties,
            metas,
          },
          computed: computed,
        }
        defaultVals[obj.name] = JSON5.parse(part.defaultVal)
        parsedParts.push(obj)
      } catch (e) {
        console.log(e)
      }
    }
  })
  // console.log(parsedParts)
  let obj = {
    name: name ?? 'process-step1',
    defaultVal: defaultVals,
    init: {
      def: {
        constants: {},
        parts: parsedParts,
      },
      args
    }
  }
  // console.log(obj)
  return obj
}

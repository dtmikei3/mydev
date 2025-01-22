// @ts-nocheck
/*globals UibRouter, uibuilder */

uibuilder.logLevel = 4

const routerConfig = {
  // Router templates created inside the routeContainer, specify an CSS selector
  // If not provided, default div with ID uibroutecontainer is added as the last element of the body
  routeContainer: '#routecontainer',

  // Optionally, chose a default route id to be displayed on load
  // If not given, the first defined route is used.
  // defaultRoute: 'route03',

  hide: true,
  // unload: true,

  // Define the possible routes type=url for externals
  // Can be an object or an array but each entry must be an object containing {id,src,type}
  //   type can be anything but only `url` will be treated as an external template file.
  //   src is either a CSS selector for a <template> or a URL of an HTML file.
  //   id must match the href="#routeid" in any menu/link. and `<template id="routeid">` on any loaded template
  //      must be unique on the page
  routes: [
    {
      id: 'route01', src: 'part/home.html', type: 'url',
      title: 'Route 1 home', description: 'home'
    }, {
      id: 'route02', src: 'part/floorplan.html', type: 'url',
      title: 'Route 2 svg1', description: 'svg1'
    }, {
      id: 'route03', src: 'part/route03.html', type: 'url',
      title: 'Route 3 svg2', description: 'svg2'
    },
    // Doesn't exist. Tests load error
    { id: 'route04', src: './fe-routes/dummy.html', type: 'url' },
  ],
}
const router = new UibRouter(routerConfig)

// Example of dynamically adding additional routes -> must be external or have existing templates
const extraRoutes = [
  { id: 'route03', src: 'partial/route03.html', type: 'url', title: 'Route 5' },
  { id: 'route06', src: '#route06' /* NB: No title specified */ },
]
router.addRoutes(extraRoutes)

// Currently no way to dynamically add new routes from Node-RED
// So we need to do it here
uibuilder.onTopic('addRoute', (msg) => {
  router.addRoutes(msg.payload)
  console.log('Route added from Node-RED', msg.payload.id)
})

// - Optionally send a msg back to Node-RED when the route changes
// uibuilder.watchUrlHash()

// Example of changing route from code (after 5 seconds):
// setTimeout(() => {
//     router.doRoute('route01')
// }, 5000)

/** If you need to be certain that all external route templates
 *  have loaded before doing something, this is how. */
// uibuilder.onChange('uibrouter', uibrouter => {
//     if (uibrouter === 'loaded') {
//         // Do stuff
//     }
// })
/** Monitor route changes in code */
// uibuilder.onChange('uibrouter_CurrentRoute', (routeId) => {
//     console.log(`ROUTE CHANGED. New Route: ${routeId}`)
//     // To get the previous route, use: router.previousRouteId
//     // To get the current route's config, use: router.currentRoute()
// })
/** Monitor route changes in code and get the new route config */
// uibuilder.onChange('uibrouter_CurrentDetails', (routeConfig) => {
//     console.log(`ROUTE CHANGED. New Route Details: ${routeConfig}`)
// })


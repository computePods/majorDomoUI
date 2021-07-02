// The MajorDomo ServerSentEvents (SSE) client interface provides a simple
// wrapper around the browser's standard EventSource interface.
//
// see: https://developer.mozilla.org/en-US/docs/Web/API/EventSource

import m from 'mithril'

import log from 'loglevel'

import { buildUrl, sseMountPoints } from './interfaces/AllHttpRouteUtils.mjs'

export function EventSourceOn(entityUrlParts, newOnMessage) {

  if (!entityUrlParts.hasOwnProperty('mountPoint')) return null
  if (!sseMountPoints.hasOwnProperty(entityUrlParts['mountPoint'])) return null

  var fullPath = buildUrl(entityUrlParts)
  var mountPoint = entityUrlParts['mountPoint']

  function onOpen(evt) {
	  log.info("EventSource ["+ mountPoint +"] opened")
  }

  function onClose(evt) {
	  log.info("EventSource ["+ mountPoint + "] closed")
	  esObj.stop()
  }

  function onError(evt) {
	  log.error("EventSource [" + mountPoint + "] ERROR: ")
	  log.error(evt)
	  log.error("EventSource error ignored")
  }

  function onMessage(evt) {
	  //log.debug("EventSource ["+ mountPoint + "] MSG:")
	  //log.debug(evt.data)
	  //log.debug("EventSource MSG ----------------------")
	  newOnMessage(evt)
	  m.redraw()
  }

  var esObj = {
    entityUrlParts : entityUrlParts,
    fullPath : fullPath,
    mountPoint : mountPoint,
  	es : null,
  	start: function() {
  	  log.info("Starting eventSource ["+mountPoint+"]")
  	  if (esObj.es) { esObj.stop() }
      var newEs = new EventSource(fullPath)
      if (newEs) {
        log.debug("Adding eventSource callbacks for ["+ mountPoint +"]")
        newEs.onopen = onOpen
        newEs.onerror = onError
        newEs.addEventListener('close',   onClose)
        newEs.addEventListener('message', onMessage)
    		esObj.es = newEs
      } else {
      	esObj.es = null
      }
  	},
  	stop: function() {
  	  log.info("Stopping eventSource ["+mountPoint+"]")
      if (esObj.es) {
      	esObj.es.close()
      }
      esObj.es = null
  	}
  }

  // Ensure that the EventSource is closed *before* we unload this page
  // (or reload it)
  //
  window.addEventListener("beforeunload", function(event) {
  	esObj.stop()
  })

  return esObj
}

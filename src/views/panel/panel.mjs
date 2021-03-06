import m from 'mithril';

import log from 'loglevel'

import { Header } from '../header/header.mjs'
import { createLinkFromItem } from '../utils.mjs'

// viewers
import { MountPoint2Viewers } from '../../mappingsViewers.mjs'

// models
import { Panels       } from '../../models/panels/panels.mjs'
import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

function getContentsFor(entityName) {
  var entityType = OpenEntities.getEntityType(entityName)
  if (entityName == 'artefactBrowser') entityType = 'listFiles'
  log.debug(MountPoint2Viewers)
  log.debug(entityName)
  log.debug(entityType)
  if (!MountPoint2Viewers.hasOwnProperty(entityType)) entityType = "unknown"

  var entityViewerFactory = MountPoint2Viewers[entityType]
  log.debug(entityType)
  log.debug(entityViewerFactory)
  return entityViewerFactory(entityName)
}

function getTitleFor(entityName) {
  if (entityName == 'artefactBrowser') return 'Artefact Browser'
  return entityName
}

export const Panel = {
  view: function(vnode) {
    let panelID     = vnode.attrs.panelID || 'unknown-split'
    let panelNum    = vnode.attrs.panelNum || 0
    let panelHidden = vnode.attrs.panelHidden || false

    function openArtefactBrowser() {
  	  Panels.setPanelEntityName(panelNum, 'artefactBrowser')
    }
    function clearPanel() {
	    Panels.setPanelEntityName(panelNum, 'none')
    }
    function closeThisPanel() {
    	Panels.closePanel(panelNum)
    }
    let initialMenu = [
 	    { link: clearPanel,          text: 'Clear'   },
  	  { link: false,               text: ''        },
  	  { link: closeThisPanel,      text: 'Close'   },
  	  { link: false,               text: ''        },
    	{ link: openArtefactBrowser, text: 'Browser' }
    ]
    let theMenu = OpenEntities.compileMenu(initialMenu, function(entityName) {
      Panels.setPanelEntityName(panelNum, entityName)
    })
    return m(
      'div',
      { class: 'panel', id: panelID, hidden: panelHidden },
      m(Header, {
        theLink: {
        	link: '',
        	text: getTitleFor(Panels.getPanelEntityName(panelNum))
        },
        theMenu: theMenu
      }),
      m(
        'div',
        { class: 'panel-contents'},
        getContentsFor(Panels.getPanelEntityName(panelNum))
      )
    )
  }
};

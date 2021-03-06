import m from 'mithril';

import { InstallMithrilExamples } from '../../../mcv/mithrilExamples.mjs'

import { SplitPanels } from './splitPanels';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { Panels } from '../../models/panels/panels.mjs'

import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';

import { Notifications } from '../../models/notifications/notifications.mjs'

export default {
  oninit: function(vnode) {
  	OpenEntities.closeAllEntities()
  	InstallArtefactsExample()
  	InstallMithrilExamples()
  	Panels.reCreatePanels(5, 2)
  	Notifications.start()
  },
  view: function(vnode) {
  	return m(SplitPanels)
  }
}

// Footer.stories.js

import m from 'mithril';

import { Panel } from './panel';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'
import { Panels       } from '../../models/panels/panels.mjs'

import { InstallFileEditorExample } from '../../models/openEntities/openEntities.example.fileEditor.mjs'
import { InstallLogViewerExample } from '../../models/openEntities/openEntities.example.logViewer.mjs'

import { InstallArtefactsExample } from '../../models/artefacts/artefacts.example.a.mjs';

export default {
  oninit: function(vnode) {
  	OpenEntities.closeAllEntities()
  	InstallFileEditorExample()
  	InstallLogViewerExample()
  	InstallArtefactsExample()
  	Panels.reCreatePanels(5, 2)
  },
  view: function(vnode) {
  	return m(Panel, { panelID: 'split-1', panelNum: 1	})
  }
};

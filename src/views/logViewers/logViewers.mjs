import m from 'mithril';
import Prism from 'eStatic/prism';

import { OpenEntities } from '../../models/openEntities/openEntities.mjs'

export const LogViewers = {
  view: function(vnode) {
    var entityName = vnode.attrs.entity
    var origHtml = entityName+' is not viewable with a Log Viewer'
    if (OpenEntities.getEntityType(entityName) == 'logViewer') {
      origHtml = OpenEntities.getEntityValue(entityName)
    }
    var prismHtml = Prism.highlight(
      origHtml,
      Prism.languages.log,
      'log'
    )
    var lines = prismHtml.trim().split(/\r\n|\n\r|\n|\r/);
    var lineEven = false;
    var lineClass = [ 'log-even', 'log-odd' ];
    var html = lines.map(aLine => {
    	lineEven = (lineEven + 1) % 2;
      return '<span class="'+lineClass[lineEven]+'">'+aLine+'</span>'
    }).join("\n")
    return m('pre',
      { class: 'log-viewer' },
      m('code',
        { class: 'log-viewer-code'},
        m.trust(html)
      )
    )
  }
}

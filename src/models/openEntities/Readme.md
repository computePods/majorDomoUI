# MajorDomo Open Entities model

The openEntities model provides a dictionary-like interface into the
collection of entities open in the MajorDomo UI.

Each open entity consists of a [Mithril
Component](https://mithril.js.org/components.html) based upon [Mithril
Connectors](https://github.com/computePods/interfaceGenerator/blob/main/cpig/templates/mithrilConnectors.md)
generated by the [ComputePods
InterfaceGenerator](https://github.com/computePods/interfaceGenerator) for
that particular entity.

Each Mithril Connector embeds the artefact URL. This means that each
Mithril Connector is able to update itself from its associated pod server.

The openEntities dictionary indexes the Mithril Connectors by the
associated artefact path (URL).


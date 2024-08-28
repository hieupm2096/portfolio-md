---
id: f94ea026-27b0-4eab-891b-31d17ad1961e
title: Flutter Widget Lifecycle
created_time: 2024-06-18T15:47:00.000Z
last_edited_time: 2024-08-28T20:00:00.000Z
icon_emoji: 🐦
draft: false
featured: false
sync: ready
slug: flutter-widget-lifecycle
tags:
  - flutter

---

## Seven Cycles of Stateful Widget

### createState()

*   Required to be overridden when extending from *StatefulWidget.*

*   *State* object holds all the mutable state of widget.

### initState()

*   Executed automatically when widget added to the tree.

*   Executed only once when the state object is created.

*   Use for initializing variables and subscribing to data sources.

### **didChangeDependencies**()

*   Executed immediately after *initState().*

*   Executed when state object depends on an *InheritedWidget* that has changed.

*   Could be executed multiple times.

### build(BuildContext context)

*   Executed multiple times whenever the widget needs to be rebuilt.

*   Return the UI of the widget in this method.

### didUpdateWidget(WidgetClass oldWidget)

*   Executed when the parent widget changes its configuration and requires widget to rebuild.

*   Use for handling changes in the widget’s configuration.

### setState()

*   Notify the framework that the internal state of the widget has changed.

*   Use for triggering a rebuild of widget when modifying state.

### deactivate()

*   Executed when the widget removed from the widget tree but could be reinserted in another part of the tree.

### dispose()

*   Executed when the widget is removed from the widget tree completely.

*   The *deactivate()* will be called for widgets that are removed from the tree, **temporarily** or **permanently**, whereas *dispose()* will only be called for widgets that are removed permanently.
